barba.init({
    transitions: [{
        name: 'default-transition',
        leave() {
            window.scrollTo(0,0);
            if (document.location.pathname.includes('post')) {
                document.getElementById('comments').innerHTML = `<script src="https://giscus.app/client.js"
        data-repo="jxheum/jxheum.github.io"
        data-repo-id="R_kgDOMzjxWg"
        data-category="Announcements"
        data-category-id="DIC_kwDOMzjxWs4CmxhK"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="1"
        data-input-position="top"
        data-theme="https://www.jiheum.me/asset/comment.css"
        data-lang="ko"
        crossorigin="anonymous"
        async>
</script>`
            }
        },
        enter() {
        }
    }],
    views: [{
        namespace: 'home',
        beforeEnter() {
        },
        afterEnter() {
            contentsec = document.querySelector('#blog')
			header = document.querySelector('#header')
			gotoblog = document.querySelector('#gotoblog')
			window.addEventListener('scroll', () => { 
				if (window.scrollY >= (window.scrollY + contentsec.getBoundingClientRect().top) / 2) {
					header.style.top = '0px';
					gotoblog.style.bottom = '68px'
				} else {
					header.style.top = '-100px';
					gotoblog.style.bottom = 'calc(10px + env(safe-area-inset-bottom))'
				}
			});
            VanillaTilt.init(document.querySelector(".mycard"), {
                glare: true,
                "max-glare": 0.5,
                scale: 1.025,
                gyroscope: true,
                easing: "cubic-bezier(.34,1.56,.68,1.06)"
            });
        }
    }]
});