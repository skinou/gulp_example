$(function(){
    var h = $(window).height();
    var w = $(window).width();
    console.log(h,w);

    $('.container').css({"height":h,"width":w})

    $('.model').click(function(){
        $(this).fadeOut();
    })

     $('.home-btn').click(function(){
        $(".model").fadeToggle("slow");
    })


})



