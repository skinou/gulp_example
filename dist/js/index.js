!function(e,t){var i=t.documentElement,n=e.devicePixelRatio||1;function d(){var e=i.clientWidth/10;i.style.fontSize=e+"px"}if(function e(){t.body?t.body.style.fontSize=12*n+"px":t.addEventListener("DOMContentLoaded",e)}(),d(),e.addEventListener("resize",d),e.addEventListener("pageshow",function(e){e.persisted&&d()}),2<=n){var o=t.createElement("body"),l=t.createElement("div");l.style.border=".5px solid transparent",o.appendChild(l),i.appendChild(o),1===l.offsetHeight&&i.classList.add("hairlines"),i.removeChild(o)}}(window,document),$(function(){var e=$(window).height(),t=$(window).width();console.log(e,t),$(".home").css({height:e,width:t}),$(".model").click(function(){$(this).fadeOut()}),$(".home-box").click(function(){$(".model").fadeToggle("slow")})});