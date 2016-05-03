$(function(){

    swipe_load();

    car_join();

    car_html();

    //swipe初始化滑动
    var bullets = document.getElementById('position').getElementsByTagName('li');
    Swipe(document.getElementById('slider'), {
        auto: 3000,
        callback: function(pos) {
            var swipe_len = bullets.length;
            while(swipe_len--){
                bullets[swipe_len].className = ' ';
            }
            bullets[pos].className = 'on';

            product_html();

            car_join();

            car_html();
        }
    });

    //弹出框展示
    $(".pro_new").click(function(){
        $(".over_lay").show();
        setInterval(function(){
            $(".over_lay").hide();
        },2000)
    });

    //存储商品
    function car_join(){
        $(".car_join").unbind().click(function(){

            //当前滑动商品添加标记
            var index = $(".on").index();

            //存储用户添加了哪些商品
            var data = storage.get("list");  

            //第一次进来data为空时创建数组         
            if(typeof(data)=="undefined"){
                data = [];
            }

            if(data.indexOf(index)!=-1)
            {
                return;
            }

            //商品插入数组
            data.push(index);
            
            //存储标记
            storage.set({
                list: data
            });

        });
    }

    //跳转购物车页面
    function car_html(){
        $(".car_watch").unbind().click(function(){
            var data = storage.get("list");
            window.location.href = "/app/view/product/car.html?"+data+"";
        });
    }

    //swipe加载
    function swipe_load(){
        var html_swipe = "";
        var html_li = "";
        var html = "";

        $.each(json,function(num,item){
            html_swipe += "<figure>";
            html_swipe +=     "<p class='tc'>"+item.name+"</p>";
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

        html += "<div class='pro_all'>";
        html +=     "<p>产品配料：</p>";
        html +=     "<p class='pro_description'>"+json[0].description+"</p>";
        html +=     "<p>";
        html +=         "<span>净含量：</span>";
        html +=         "<em class='pro_content'>"+json[0].content+"</em>";
        html +=     "</p>";
        html +=     "<p>";
        html +=         "<span>保质期：</span>";
        html +=         "<em class='pro_quality'>"+json[0].quality+"</em>";
        html +=     "</p>";
        html +=     "<p>";
        html +=         "<span class='pro_price'>"+json[0].price+"</span>";
        html +=         "<em>元/罐</em>";
        html +=     "</p>";
        html +=     "<p>";
        html +=         "<span>可获积分：</span>";
        html +=         "<i class='pro_score'>"+json[0].score+"</i>"
        html +=         "<em>分</em>";
        html +=     "</p>";
        html +=     "<div class='car_join tc fz14 mt20'>加入购物车</div>";
        html +=     "<div class='car_watch tc fz14 mt20'>查看购物车</div>";
        html += "</div>";
        $(".pro_top").append(html);
    }

    function product_html(){
        var html = "";
        var index = $(".on").index();

        //每次加载产品样式前先清空
        $(".pro_top").empty();
        html += "<div class='pro_all'>";
        html +=     "<p>产品配料：</p>";
        html +=     "<p class='pro_description'>"+json[index].description+"</p>";
        html +=     "<p>";
        html +=         "<span>净含量：</span>";
        html +=         "<em class='pro_content'>"+json[index].content+"</em>";
        html +=     "</p>";
        html +=     "<p>";
        html +=         "<span>保质期：</span>";
        html +=         "<em class='pro_quality'>"+json[index].quality+"</em>";
        html +=     "</p>";
        html +=     "<p>";
        html +=         "<span class='pro_price'>"+json[index].price+"</span>";
        html +=         "<em>元/罐</em>";
        html +=     "</p>";
        html +=     "<p>";
        html +=         "<span>可获积分：</span>";
        html +=         "<i class='pro_score'>"+json[index].score+"</i>"
        html +=         "<em>分</em>";
        html +=     "</p>";
        html +=     "<div class='car_join tc fz14 mt20'>加入购物车</div>";
        html +=     "<div class='car_watch tc fz14 mt20'>查看购物车</div>";
        html += "</div>";
        $(".pro_top").append(html);
    }
})








