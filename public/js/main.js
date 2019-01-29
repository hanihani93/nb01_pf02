horzShow();
function horzShow() {
	//맨 앞의 li를 복사해서 $(".ban")맨 뒤에 붙여라
	$(".banner_wrap").append($(".banner_wrap > li").eq(0).clone());	
	var $wrap = $(".banner_wrap");
	var $slide = $(".banner_wrap > li");
	var now = 1;
	var speed = 500;
	var timeout = 3000;
	var end = $slide.length - 1;
	var interval;
	var hei = 0;
	//초기화
	$(window).resize(function(){
        $(".wrap").css({"margin-top":$("header").height()+"px"});
		hei = 0;
		$slide.each(function(i){
			//$(".ban > li")중 가장 큰 height 구함
			if(hei < $(this).height()) hei = $(this).height();	
		});
		$wrap.height(hei);		// $(".ban")의 높이를 넣어준다.
	}).trigger("resize");
	$slide.each(function(i){
		$(this).css({"left":(i*100)+"%", "position":"absolute"});
		if(i<end) $(".cycle-pager").append("<span>●</span>");
	});
	$(".cycle-pager span").click(function(){
		now = $(this).index();
		horzAni();
		clearInterval(interval);
		interval = setInterval(horzAni, timeout);
	});
	interval = setInterval(horzAni, timeout);
	function horzAni() {
		if(now == end) pnow = 0;
		else pnow = now;
		$(".cycle-pager span").removeClass("cycle-pager-active");
		$(".cycle-pager span").eq(pnow).addClass("cycle-pager-active");
		$wrap.stop().animate({"left":(-now*100)+"%"}, speed, function(){
			$(window).trigger("resize");
			if(now == end) {
				$wrap.css({"left":0});
				now = 1;
			}
			else now++;
		});
	}	
}