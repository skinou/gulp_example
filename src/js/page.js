$(function(){

    $('.home-box').click(function(){
        $(".page1").fadeIn("slow");
    })

    $('.page1').click(function(){
        $(this).fadeOut("slow");
        $(".page2").fadeIn("slow");
    })

    $('.page2').click(function(){
        $(this).fadeOut("slow");
        $(".page3").fadeIn("slow");
    })

    $('.page3').click(function(){
        $(this).fadeOut("slow");
        $(".page4").fadeIn("slow");
    })

    $('.page4').click(function(){
        $(this).fadeOut("slow");
    })


})