
//广告效果
var atg = document.querySelector(".advertising-inner");
var at = document.querySelector(".advertising span");
if(sessionStorage.atg=="1"){
    atg.style.display="none";
}else{
    atg.style.display="block";
}
at.onclick=function(){
    atg.style.display="none";
    sessionStorage.atg="1";
    console
}
  
//轮播效果

 var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
    });



new Vue({
    el:"#gun1",
    data:{
        arrs1:[
            {img:"img/index/201805141119126.jpg",name:"高跟单鞋"},
            {img:"img/index/201805141119316.gif",name:"平底单鞋"},
            {img:"img/index/201805141119506.jpg",name:"高跟凉鞋"},
            {img:"img/index/201805141120116.jpg",name:"平底凉鞋"},
            {img:"img/index/49.jpg",name:"女士休闲鞋"},
            {img:"img/index/50.jpg",name:"男士休闲鞋"},
            {img:"img/index/51.jpg",name:"正装鞋"},
            {img:"img/index/52.jpg",name:"帆布鞋"}
            ],
        arrs2:[
            {img:"img/index/1.jpg",name:"休闲鞋"},
            {img:"img/index/2.jpg",name:"跑步鞋"},
            {img:"img/index/3.jpg",name:"运动T恤"},
            {img:"img/index/4.jpg",name:"运动长裤"},
            {img:"img/index/5.jpg",name:"运动短裤"},
            {img:"img/index/6.jpg",name:"综合训练鞋"},
            {img:"img/index/7.jpg",name:"夹克/外套"},
            {img:"img/index/8.jpg",name:"泳衣"},
            ],
        arrs3:[
             {img:"img/index/9.jpg",name:"连衣裙"},
            {img:"img/index/10.jpg",name:"长裤"},
            {img:"img/index/11.jpg",name:"外套"},
            {img:"img/index/12.jpg",name:"T恤"},
            {img:"img/index/13.jpg",name:"衬衫"},
            {img:"img/index/14.jpg",name:"旗袍"},
            {img:"img/index/15.jpg",name:"女式短裤"},
            {img:"img/index/16.jpg",name:"半身裙"},
            ],
        arrs4:[
            {img:"img/index/17.jpg",name:"T恤"},
            {img:"img/index/18.jpg",name:"衬衫"},
            {img:"img/index/19.jpg",name:"polo衫"},
            {img:"img/index/20.jpg",name:"休闲裤"},
            {img:"img/index/21.jpg",name:"长裤"},
            {img:"img/index/22.jpg",name:"夹克"},
            {img:"img/index/23.jpg",name:"西裤"},
            {img:"img/index/24.jpg",name:"短裤"},
            ],
        arrs5:[
            {img:"img/index/25.jpg",name:"T恤"},
            {img:"img/index/26.jpg",name:"皮肤衣"},
            {img:"img/index/27.jpg",name:"徒步鞋"},
            {img:"img/index/28.jpg",name:"户外夹克"},
            {img:"img/index/29.jpg",name:"速干裤"},
            {img:"img/index/30.jpg",name:"休闲裤"},
            {img:"img/index/31.jpg",name:"户外风衣"},
            {img:"img/index/32.jpg",name:"凉鞋"},
            ],
        arrs6:[
            {img:"img/index/33.jpg",name:"运动鞋"},
            {img:"img/index/34.jpg",name:"儿童玩具"},
            {img:"img/index/35.jpg",name:"T恤"},
            {img:"img/index/36.jpg",name:"短裤"},
            {img:"img/index/37.jpg",name:"凉鞋"},
            {img:"img/index/38.jpg",name:"皮鞋"},
            {img:"img/index/39.jpg",name:"休闲裤"},
            {img:"img/index/40.jpg",name:"儿童连衣裙"},
            ],
        arrs7:[
            {img:"img/index/41.jpg",name:"文胸"},
            {img:"img/index/42.jpg",name:"家具服"},
            {img:"img/index/43.jpg",name:"内裤"},
            {img:"img/index/44.jpg",name:"旅行箱"},
            {img:"img/index/45.jpg",name:"单肩包"},
            {img:"img/index/46.jpg",name:"双肩包"},
            {img:"img/index/47.jpg",name:"钱包"},
            {img:"img/index/48.jpg",name:"腰带"},
            ]
        }
    
})

new Vue({
    el:"#renqi",
    data:{
        renqis:[
            {img:"img/1.jpg",name:"YORHE约赫 女装  春夏 连衣裙 YC2083L2",qian:"￥359"},
            {img:"img/2.jpg",name:"皮尔卡丹pierre cardin 女装  春夏 连衣裙 5284D5145440",qian:"￥238"},
            {img:"img/3.jpg",name:"LINNIE.Z 连衣裙  春夏 连衣裙 LXF7ST1943",qian:"￥260"},
            {img:"img/4.jpg",name:"科诺修思KROCEUS 短裤 2018 春夏 短裤 28634",qian:"￥343"},
            {img:"img/5.jpg",name:"探路者 速干裤 2018 不分季节 速干裤 KAMG82466",qian:"￥279"},
            {img:"img/6.jpg",name:"体会 内衣  不分季节 精品文胸 BQ1052",qian:"￥80"},
            {img:"img/7.jpg",name:"欧迪芬 内衣  春夏 蕾丝文胸 OA23503",qian:"￥100"},
            {img:"img/8.jpg",name:"莫菲鱼moFee FisH T恤 2018 春夏 短袖T恤 F331S8B3",qian:"￥61"},
            {img:"img/9.jpg",name:"皮尔卡丹pierre cardin 腰带/皮带/腰链  不分季节 腰带 P6D822104-BYB",qian:"￥222"},
   
            ]
        }
    
})

//回到顶部
var top1 = document.querySelector(".zhiding");
top1.addEventListener("click",function(){
    var t = setInterval(function(){
    document.body.scrollTop=document.body.scrollTop-50;
//    document.documentElement.scrollTop=document.documentElement.scrollTop-20;
        if(document.body.scrollTop===0){
        clearInterval(t);
    };
},10)
    
    });


var lis = document.querySelectorAll(".index .gundong .top ul li");
var divs = document.querySelector(".index .gundong .bottom");

for(let n=0;n<lis.length;n++){
    lis[n].aa=n;
    lis[n].onclick=function(){
        divs.style.marginLeft=-this.aa*100+"%";
        console.log(1)
    }
    
}

//公告效果
var spans= document.querySelector(".gonggao .txt span");
var spanr = document.querySelector(".gonggao .txt p");
console.log(spanr)
var num = Number(spans.innerHTML);
var gonggao= document.querySelector(".gonggao");
      var as = setInterval(function(){
          num--;
          spans.innerHTML=num;
          if(num===0){
              gonggao.style.display="none";
              clearInterval(as);
          }
          
      },1000);
spanr.onclick=function(){
    gonggao.style.display="none";
}


