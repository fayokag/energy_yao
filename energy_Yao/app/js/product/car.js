$(function(){

    init();

    //初始化
    function init(){
        var data = storage.get("list");

        var html = "";
        var one_price = 0;
        var one_score = 0;
        $("nav").empty();

        if(typeof(data)!="undefined"){
            $.each(data,function(i,item){
                $.each(json,function(num,item_sub){
                    if(item==item_sub.type){
                        html += "<div class='car_show ovh' name="+item+">";
                        html +=     "<img src='/app/images/product/p"+num+".png' class='car_img fl db' width='98' height='98'>";
                        html +=     "<div class='car_right fl'>";
                        html +=         "<div class='car_top ovh mt10'>";
                        html +=             "<span class='fl db'>"+json[item].name+"</span>";
                        html +=             "<i class='fr db'>删除</i>";
                        html +=         "</div>";
                        html +=         "<div class='car_mid ovh mt10'>";
                        html +=             "<span class='fl db'>可获积分</span>";
                        html +=             "<i class='fl db'>"+json[item].score+"</i>";
                        html +=             "<em class='fl db'>积分/罐</em>";
                        html +=         "</div>";
                        html +=         "<div class='car_bot ovh mt10'>";
                        html +=             "<div class='car_price ovh fl'>";
                        html +=                 "<span class='fl db'>¥</span>";
                        html +=                 "<i class='fl db'>"+json[item].price+"</i>";
                        html +=                 "<em class='fl db'>元</em>";
                        html +=             "</div>";
                        html +=             "<div class='car_len ovh fr'>";
                        html +=                 "<span class='fl db mr20'>-</span>";
                        html +=                 "<i class='fl db mr20'>"+json[item].len+"</i>";
                        html +=                 "<em class='fl db mr20'>+</em>";
                        html +=             "</div>";
                        html +=         "</div>";
                        html +=     "</div>";
                        html += "</div>";
                        one_price += json[item].price * json[item].len;
                        one_score += json[item].score * json[item].len;
                    }
                });
            });
        }

        $("nav").append(html);
        $(".car_total em").text(one_price);
        $(".car_score i").text(one_score);
    }

    //e=this,num=单个商品数量,father=body,price=商品单价,total=商品总价
    function price_plus(e,num,father,price,total){

        //商品数量值
        var total_len = $(e).siblings(num).text();

        //商品数量值＋＋
        $(e).siblings(num).text(parseInt(++total_len));

        //商品价格
        var price_text = $(e).parent().siblings().find(price).text();

        //商品总价
        $(e).closest(father).find(total).text(parseInt($(total).text()) + parseInt(price_text));
    }

    //商品减事件
    function price_minus(e,num,father,price,total){

        //商品数量值
        var total_len = $(e).siblings(num).text();

        //商品数量值－－
        $(e).siblings(num).text(parseInt(--total_len));

        //商品价格
        var price_text = $(e).parent().siblings().find(price).text();

        //商品总价
        $(e).closest(father).find(total).text(parseInt($(total).text()) - parseInt(price_text));
    }

    $(".car_len em").unbind().click(function(){
        var num = $(this).siblings("i").text();
        if(num>99){
            return;
        }
        price_plus(this,"i","body","i",".car_total em");
    });

    $(".car_len span").unbind().click(function(){
        var num = $(this).siblings("i").text();
        if(num<2){
            return;
        }
        price_minus(this,"i","body","i",".car_total em");
    });

    //删除事件
    $(".car_top i").click(function(){

        var data = storage.get("list");
        //分数值
        var score = $(this).closest(".car_right").find(".car_mid i").text();
        //单价值
        var price = $(this).closest(".car_right").find(".car_price i").text();
        //数量
        var len = $(this).closest(".car_right").find(".car_len i").text();

        var all_price = price * len;
        var all_score = score * len;

        var total_price = $(".car_total em").text();
        var total_score = $(".car_score i").text();

        $(".car_total em").text(total_price - all_price);
        $(".car_score i").text(total_score - all_score);
        
        var mark = $(this).closest(".car_show").index();

        data.splice(mark,1);

        storage.set({
            list: data
        });

        $(this).closest(".car_show").remove();
        
    });

    //结算跳转购买成功页面
    $(".car_over").click(function(){
        var score = $(".car_score i").text();
        storage.set({
            num: score
        });
        window.location.href = "/app/view/product/suc.html";
    });
})








