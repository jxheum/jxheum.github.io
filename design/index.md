---
layout: post
title: "jxheum.site 디자인 가이드"
excerpt: ""
tag: ["Design"]
comments: false
githublink: "https://github.com/jxheum/jxheum.github.io/blob/main/design/index.md"
toc: true
---

<script>
    ismoved = 0;
</script>

# 컬러

## 라이트모드
<div style="background:#fff;padding:20px;color:#000;">
<input style="background: #b0d5ff;padding: 0px;vertical-align: 2px;height: 16px;width: 16px;border:none;" disabled> <b>#b0d5ff</b><br>
<input style="background: #1e1e1e;padding: 0px;vertical-align: 2px;height: 16px;width: 16px;border:none;" disabled> <i>#1e1e1e</i><br>
<input style="background: #0000001a;padding: 0px;vertical-align: 2px;height: 16px;width: 16px;border:none;" disabled> <u>#0000001a</u><br>
<input style="background: #007aff;padding: 0px;vertical-align: 2px;height: 16px;width: 16px;border:none;" disabled> #007aff<br>
<input style="background: #00000a;padding: 0px;vertical-align: 2px;height: 16px;width: 16px;border:none;" disabled> #00000a<br>
</div>

## 다크모드
<div style="background:#000;padding:20px;color:#fff;">
<input style="background: #1e1e1e;padding: 0px;vertical-align: 2px;height: 16px;width: 16px;border:none;" disabled> <b>#1e1e1e</b><br>
<input style="background: #d9d9d9;padding: 0px;vertical-align: 2px;height: 16px;width: 16px;border:none;" disabled> <i>#d9d9d9</i><br>
<input style="background: #ffffff1a;padding: 0px;vertical-align: 2px;height: 16px;width: 16px;border:none;" disabled> <u>#ffffff1a</u><br>
<input style="background: #b0d5ff;padding: 0px;vertical-align: 2px;height: 16px;width: 16px;border:none;" disabled> #b0d5ff<br>
<input style="background: #00000a;padding: 0px;vertical-align: 2px;height: 16px;width: 16px;border:none;" disabled> #00000a<br>
</div>

# 트랜지션

<img src="/asset/transition_ease.png" style="background:white;border-radius:30px;transition: translate 0.6s cubic-bezier(.34,1.56,.68,1.06), transform 0.6s cubic-bezier(.34,1.56,.68,1.06), box-shadow 0.6s cubic-bezier(.34,1.56,.68,1.06);" onclick="if (ismoved != 1) {document.querySelector('#transimg').style.translate = 'calc(100vw / 3)', ismoved = 1} else {document.querySelector('#transimg').style.translate = '', ismoved = 0}" id="transimg" class="clickevent">

0.6s <a href="https://cubic-bezier.com/#.34,1.56,.68,1.06" target="_blank" aria-label="자세히 보기">**cubic-bezier(.34,1.56,.68,1.06)**</a>

# 폰트

## <span style="font-weight: 100;">N</span><span style="font-weight: 200;">o</span><span style="font-weight: 300;">t</span><span style="font-weight: 400;">o</span> <span style="font-weight: 500;">S</span><span style="font-weight: 600;">a</span><span style="font-weight: 700;">n</span><span style="font-weight: 800;">s</span> <span style="font-weight: 900;">KR</span>
<a href="https://fonts.google.com/noto/specimen/Noto+Sans+KR" target="_blank" aria-label="구글 폰트에서 보기">Google Fonts</a>

## <i class="fa-solid fa-font-awesome" style="vertical-align: 1px;"></i><i class="fa-solid fa-f" style="margin-left:5px;"></i><i class="fa-solid fa-o"></i><i class="fa-solid fa-n"></i><i class="fa-solid fa-t"></i><i class="fa-solid fa-a"></i><i class="fa-solid fa-w"></i><i class="fa-solid fa-e"></i><i class="fa-solid fa-s"></i><i class="fa-solid fa-o"></i><i class="fa-solid fa-m"></i><i class="fa-solid fa-e"></i>
<a href="https://fontawesome.com/" target="_blank" aria-label="홈페이지로 이동">Font Awesome</a>

# 모양

<div style="float:left;">
<div style="width:150px;height:50px;border-radius: 200px;" class="bg clickevent"></div>
<div style="width:150px;height:260px;border-radius: 30px;margin-top:10px;" class="bg clickevent"></div>
</div>
<div style="width:150px;height:320px;border-radius: 70px;margin-left: 160px;" class="bg clickevent"></div>


# 컴포넌트

## 버튼

<button aria-label="버튼">버튼</button>
<button aria-label="아이콘버튼"><i class="fa-solid fa-font-awesome"></i> 아이콘버튼</button>
<button aria-label="아이콘버튼2"><i class="fa-solid fa-font-awesome"></i></button> 아이콘버튼 2

## 링크

[링크](#링크)

<!-- ## 체크박스

<label class="checkboxc">Checked
  <input type="checkbox" checked="checked">
  <span class="checkmark"></span>
</label>
<label class="checkboxc">Not Checked
  <input type="checkbox">
  <span class="checkmark"></span>
</label> -->

## 태그

<div class="chip">태그</div>
<div class="chip activechip">클릭할 수 있는 태그</div>
<div class="chip"><i class="fa-solid fa-font-awesome"></i> 아이콘이 포함된 태그</div>

## 카드

<div class="postitm" style="width: calc(100% - 30px);">
<div class="posttitle">기본 카드</div>
<div class="postspt"><i class="fa-solid fa-font-awesome"></i> 아이콘이 포함된 태그
</div>
</div>

# 브라우저 상태

<div id="browser"></div>

<script>
  function getPWADisplayMode() {
  if (document.referrer.startsWith('android-app://'))
    return 'twa';
  if (window.matchMedia('(display-mode: browser)').matches)
    return 'browser';
  if (window.matchMedia('(display-mode: standalone)').matches)
    return 'standalone';
  if (window.matchMedia('(display-mode: minimal-ui)').matches)
    return 'minimal-ui';
  if (window.matchMedia('(display-mode: fullscreen)').matches)
    return 'fullscreen';
  if (window.matchMedia('(display-mode: window-controls-overlay)').matches)
    return 'window-controls-overlay';

  return 'unknown';
}

document.querySelector('#browser').innerHTML = getPWADisplayMode()
</script>