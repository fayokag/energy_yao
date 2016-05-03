$(function(){

    //兑换好礼事件
    $(".info_change").click(function(){
        checkform(this);
    });

    //选择性别
    $(".info_sex em").click(function(){
       if($(this).hasClass("choice")){
           $(this).removeClass("choice");
       }
        else{
           $(this).addClass("choice");
           $(this).parent().siblings().find("em").removeClass("choice");
       }
    });

    //点击输入框改变value
    $("input").bind({
        click: function(){
            var attr = $(this).attr("name");
            if(attr=="name"){
                if($(this).val()=="姓 名"){
                    $(this).val("");
                }
            }
            else{
                if($(this).val()=="电 话+86"){
                    $(this).val("");
                }
            }
        },
        blur: function(){
            var attr = $(this).attr("name");
            if(attr=="name"){
                if($(this).val()==""){
                    $(this).val("姓 名");
                }
            }
            else{
                if($(this).val()==""){
                    $(this).val("电 话+86");
                }
            }
        }
    });

    //个人信息,e=this
    function checkform(e){
        var par = $(e).closest(".all");

        //中英文名的正则
        var reg_name = /^[\u0391-\uFFE5A-Za-z]+$/;
        var par_name = $.trim(par.find("input[name='name']").val());

        //姓名验证
        if(par_name=="" || par_name=="姓 名"){
            $(".info_con").show();
            $(".info_con").text("姓名不得为空");
            setInterval(function(){
                $(".info_con").hide();
            },3000);
            return;
        };

        if(!reg_name.test(par_name)){
            $(".info_con").show();
            $(".info_con").text("请输入中文或英文名");
            setInterval(function(){
                $(".info_con").hide();
            },3000);
        }

        var par_tel = $.trim(par.find("input[name='tel']").val());

        //电话号码正则
        var reg_tel = /^0?1[3|4|5|7|8][0-9]\d{8}$/;

        //手机验证
        if(!reg_tel.test(par_tel)){
            $(".info_con").show();
            $(".info_con").text("请输入正确的手机号码");
            setInterval(function(){
                $(".info_con").hide();
            },3000);
            return;
        };

        //性别验证
        if(!$(".sex_left em").hasClass("choice") && !$(".sex_right em").hasClass("choice")){
            $(".info_con").show();
            $(".info_con").text("请选择性别");
            setInterval(function(){
                $(".info_con").hide();
            },3000);
            return;
        }

        window.location.href = "/app/view/score/market.html";
    }
})
