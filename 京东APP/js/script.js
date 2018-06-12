setInterval(function(){
   x();
},2000);
setInterval(function(){
    e();
    h();
},3000)
 

function x(){
   $(".kaibao .container .center .txt").css({"transform":"translateY(-16px)","transition":"1s"});
}

function e(){
   $(".kaibao .container .center .txt").css({"transform":"translateY(0)","transition":"0s"});
}
function h(){
    $(".kaibao .container .center .txt").eq(0).appendTo($(".kaibao .container .center"));
    
}

//京东秒杀-倒计时

//首页京东秒杀部分的效果（倒计时）
function countTime() {
    //获取当前时间
    var date = new Date();
    var now = date.getTime();
    //设置截止时间
    var str = "2018/7/1 11:30:00";
    var endDate = new Date(str);
    var end = endDate.getTime();

    //时间差
    var leftTime = end - now;
    //定义变量 d,h,m,s保存倒计时的时间
    var d, h, m, s;
    if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
    }
    //将倒计时赋值到div中
    //document.getElementById("_d").innerHTML = d + "天";
    document.getElementById("_h").innerHTML = h;
    document.getElementById("_m").innerHTML = m;
    document.getElementById("_s").innerHTML = s;
    //递归每秒调用countTime方法，显示动态时间效果
    setTimeout(countTime, 1000);
                
   
}

countTime();




//首页顶部搜索条背景变色效果


window.onscroll = function(){
    if(document.body.scrollTop>115){
        document.querySelector(".search").style.backgroundColor="red";
    }else{
         document.querySelector(".search").style.backgroundColor="transparent";
    }
}

//轮播
var mySwiper = new Swiper ('.banner .swiper-container', {
    loop: true,
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
  })    

//京东直播
 var swiper = new Swiper('.jingdongzhibo .swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });

//为你推荐

    new Vue({
        el:"#tuijian",
        data:{
            arrs:[
{name:"【京东超市】e洁 自动收口垃圾袋加厚提手式 45c",link:"https://www.jd.com/",img:"img/pic/1.jpg",jia:"￥21.80",plus:"￥19.80",kan:"看相似"},
{name:"安昕良选男士船袜5双装中间棉袜商务男袜子吸汗透气短袜船",img:"img/pic/2.jpg",jia:"￥21.80",kan:"看相似"},
{name:"苹果原装数据线iPhone7Plus//6P/5SE/iPadpro手机USB线",img:"img/pic/3.jpg",jia:"￥155.00",kan:"看相似"},
{name:"真皮多卡拉位零钱包女式卡夹信用卡包头层牛皮驾驶证皮套风琴",img:"img/pic/4.jpg",jia:"￥50.00",kan:"看相似"},
{name:"QANLIIY千里鹰便携双筒望远镜高倍高清微光夜视非红外军演",img:"img/pic/5.jpg",jia:"￥138.00",kan:"看相似"},
{name:"【京东超市】蒙牛（MENGNIU）成人奶粉 全脂",img:"img/pic/6.jpg",jia:"￥27.80",kan:"看相似"},
{name:"【京东超市】清风 （APP）卷纸 原木纯品 3层270段卫生",img:"img/pic/7.jpg",jia:"￥18.90",kan:"看相似"},
{name:"【京东超市】绿之源  360°室内装修安全卫士活碳汽车",img:"img/pic/8.jpg",jia:"￥99.00",kan:"看相似"},
{name:"澳洲进口 卢卡斯Lucas番木瓜膏滋润保湿万用膏 驱蚊",img:"img/pic/9.jpg",jia:"￥49.00",kan:"看相似"},
{name:"海尔（Haier) BCD-201STPA 201升 三门冰",img:"img/pic/10.jpg",jia:"￥1199.00",kan:"看相似"}
            ]
        }
    })
    
//    置顶
    var top1 = document.querySelector(".top1");
//    function smoothscroll(){
//        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
//        if (currentScroll > 0) {
//             window.requestAnimationFrame(smoothscroll);
//             window.scrollTo (0,currentScroll - (currentScroll/5));
//        }
//    };
//top1.onclick = function(){
//    smoothscroll();
//}
//    回到顶部按钮小于400隐藏，大于400显示

//        回到顶部效果
top1.addEventListener("click",function(){
    var t = setInterval(function(){
    document.body.scrollTop=document.body.scrollTop-20;
//    document.documentElement.scrollTop=document.documentElement.scrollTop-20;
        if(document.body.scrollTop===0){
        clearInterval(t);
    };
},10)
    
    });




var ad = document.querySelector(".ad");
var dianji = document.querySelector(".ad .span");

if(sessionStorage.ad=="1"){
    ad.style.display="none";
}else{
    ad.style.display="block";
}
dianji.onclick=function(){
    ad.style.display="none";
    sessionStorage.ad="1";
}
  