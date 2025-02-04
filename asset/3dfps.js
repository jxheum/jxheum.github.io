

// Three.js 초기화
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 텍스처 로더
const textureLoader = new THREE.TextureLoader();

// 바닥 추가 (초록색)
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// 조명 추가
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// 키보드 입력 처리
const keys = { w: false, a: false, s: false, d: false, space: false };
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        keys.space = true;
    } else {
        keys[event.key] = true;
    }
});
document.addEventListener('keyup', (event) => {
    if (event.key === ' ') {
        keys.space = false;
    } else {
        keys[event.key] = false;
    }
});

// 마우스 이동 처리
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
    if (document.pointerLockElement) {
        mouseX += event.movementX;
        mouseY += event.movementY;
    }
});

// Pointer Lock API 초기화
document.body.addEventListener('click', () => {
    document.body.requestPointerLock();
});

// 충돌 감지 함수
function detectCollision(object) {
    const objectBox = new THREE.Box3().setFromObject(object);
    const playerBox = new THREE.Box3(
        new THREE.Vector3(camera.position.x - 0.25, camera.position.y - 0.5, camera.position.z - 0.25),
        new THREE.Vector3(camera.position.x + 0.25, camera.position.y + 0.5, camera.position.z + 0.25)
    );
    return objectBox.intersectsBox(playerBox);
}

// 집 구조물 추가 (문 포함)
function createHouse() {
    const woodTexture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/wood-wall.jpg');
    const wallMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
    const wallGeometry = new THREE.BoxGeometry(4, 2.5, 0.1);

    const walls = [];

    const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
    frontWall.position.set(0, 1.25, -2);
    frontWall.castShadow = true;
    scene.add(frontWall);
    walls.push(frontWall);

    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.set(0, 1.25, 2);
    backWall.castShadow = true;
    scene.add(backWall);
    walls.push(backWall);

    const sideWall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    sideWall1.rotation.y = Math.PI / 2;
    sideWall1.position.set(2, 1.25, 0);
    sideWall1.castShadow = true;
    scene.add(sideWall1);
    walls.push(sideWall1);

    const sideWall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    sideWall2.rotation.y = Math.PI / 2;
    sideWall2.position.set(-2, 1.25, 0);
    sideWall2.castShadow = true;
    scene.add(sideWall2);
    walls.push(sideWall2);

    // 문 추가 (흰색)
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1, -2.05); // 앞벽 중앙
    door.castShadow = true;
    scene.add(door);

    // 지붕
    const roofGeometry = new THREE.ConeGeometry(2.5, 1, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 3, 0);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    scene.add(roof);

    return { walls, door, frontWall };
}

const house = createHouse();

// 카메라 초기 설정
camera.position.y = 2;
camera.position.z = 5;

// 중력 및 점프 변수
const gravity = 0.05;
let velocityY = 0;
const jumpStrength = 0.75; // 점프 높이 줄임

// 문 열기/닫기 상태
let doorOpen = false;
const door = house.door;
const frontWall = house.frontWall;

// 문 클릭 여부 체크
document.body.addEventListener('click', (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(door);

    // 문 클릭 시, 열기/닫기 처리
    if (intersects.length > 0) {
        doorOpen = !doorOpen;
    }
});

// 문 열기/닫기 애니메이션
function updateDoor() {
    if (doorOpen) {
        if (door.rotation.y < Math.PI / 2) {
            door.rotation.y += 0.05; // 문을 열 때
        }
        // 문을 열었을 때 앞벽의 충돌 비활성화
        frontWall.isCollidable = false; // 충돌 처리 비활성화
    } else {
        if (door.rotation.y > 0) {
            door.rotation.y -= 0.05; // 문을 닫을 때
        }
        // 문을 닫았을 때 앞벽의 충돌 활성화
        frontWall.isCollidable = true; // 충돌 처리 활성화
    }
}

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);

    // 이동 처리
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const right = new THREE.Vector3().crossVectors(camera.up, direction).normalize();

    const prevPosition = camera.position.clone(); // 이동 전 위치 저장
    if (keys.w) camera.position.addScaledVector(direction, 0.1);
    if (keys.s) camera.position.addScaledVector(direction, -0.1);
    if (keys.a) camera.position.addScaledVector(right, 0.1);
    if (keys.d) camera.position.addScaledVector(right, -0.1);

    // 충돌 감지 (앞벽이 충돌하지 않도록 처리)
    let collision = false;
    for (const wall of house.walls) {
        if (wall.isCollidable && detectCollision(wall)) {
            collision = true;
            break;
        }
    }
    if (collision) {
        camera.position.copy(prevPosition); // 충돌 시 이동 무효화
    }

    // 점프 처리
    if (keys.space && camera.position.y <= 2) {
        velocityY = jumpStrength;
    }
    velocityY -= gravity; // 중력 적용
    camera.position.y += velocityY;

    if (camera.position.y < 2) { // 지면에 도달하면 중지
        camera.position.y = 2;
        velocityY = 0;
    }

    // 마우스 회전
    camera.rotation.y = -mouseX * 0.002;
    camera.rotation.x = THREE.MathUtils.clamp(-mouseY * 0.002, -Math.PI / 2, Math.PI / 2);

    // 문 열기/닫기 업데이트
    updateDoor();

    renderer.render(scene, camera);
}

animate();
