$(function(){
    var h = $(window).height();
    var w = $(window).width();
    console.log(h,w);

    $('.home').css({"height":h,"width":w})

    $('.model').click(function(){
        $(this).fadeOut();
    })

    
    $('.home-box').click(function(){
        // $('.model').show();
        $(".model").fadeToggle("slow");
    })





})



