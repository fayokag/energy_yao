$(function(){

   // swipe_load();

    //swipe初始化滑动

    var mySwiper = new Swiper('.swiper-container',{
        effect : 'coverflow',
        slidesPerView: 3,
        centeredSlides: true,
        coverflow: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 1,
            slideShadows : true
        }
    });

    init_back();

    function init_back(){
        var img_height = $(".a").height();
        var img_width = $(".a").width();
        $("#swiper-container").css("height",img_height);
        $(".swiper-slide").css("width",img_width);
    }

    //swipe加载
    function swipe_load(){
        var html_swipe = "";
        var html_li = "";

        $.each(json,function(num){
            html_swipe += "<figure>";
            html_swipe +=     "<div class='wrap'>";
            html_swipe +=         "<div class='image'>";
            html_swipe +=             "<img src='/app/images/product/p"+num+".png' class='img-responsive'>";
            html_swipe +=         "</div>";
            html_swipe +=     "</div>";
            html_swipe += "</figure>";
        });
        $(".swipe-wrap").append(html_swipe);

        //图片数量
        var image_len = $("#slider img").length;

        //根据图片数量增加li的数量
        for(var n=0;n<image_len;n++){
            html_li += "<li class=''></li>";
        }

        $("#position").append(html_li);
        $("#position").find("li:first").addClass("on");

    }
})