
const hostName = "api.appworks-school.tw";
const apiVersion="1.0";
const section = document.querySelector("section");
const women = document.querySelector(".women");
const men = document.querySelector(".men");
const accessories = document.querySelector(".accessories");
const womenMobile = document.querySelector(".women-mobile");
const menMobile = document.querySelector(".men-mobile");
const accessoriesMobile = document.querySelector(".accessories-mobile");
const windowWidth = window.innerWidth;

const input=document.querySelector("input")
const searchBar=document.querySelector(".search-bar")
const buttonDesktop=document.querySelector(".button") //電腦版放大鏡按鈕
const buttonMobile=document.querySelector(".button-mobile") //手機放大鏡按鈕
const mobileHeader=document.querySelector(".mobile-header") //點開要打開的東西
const searchMobile=document.querySelector(".search-mobile") //放大鏡圖片
const logo=document.querySelector(".logo")//logo
const block=document.querySelector(".block")//白色方塊
const headerWhite=document.querySelector(".header-white")
const header=document.getElementsByTagName("header")
//手機版：點圖片>隱藏logo放大鏡>叫出 mobileHeader
let page = 0;
let product = [];
let nextPage;

const carouselIMG={};

const indexRotationMap = document.querySelector(".index-rotation-map");
const indexText =document.querySelector(".index-text");
const imgOption =document.querySelector(".img-option");
// const imgOptionAll =document.querySelectorAll(".img-option");
// for (let i = 0; i < imgOptionAll.length; i++) {
//   const dot = imgOptionAll[1];
//   dot.style.background="red"
// }

//https://api.appworks-school.tw/api/1.0/marketing/campaigns





// function getCampaigns(){
//   let url=`https://${hostName}/api/${apiVersion}/marketing/campaigns`
//   fetch(url)
//     .then(res=>res.json())
//     .then(source => {
//       let indexTexthtml="";
//       let campaigns=source.data
//       //console.log(campaigns); //輸出三個array
//        campaigns.forEach(campaigns=>{
//         // console.log("id",campaigns.id)
//         // console.log("story",campaigns.story)
//         indexTexthtml +=`<img class="index-img" id="${campaigns.id}" src="${campaigns.picture}">`
//         indexTexthtml += `<div class="index-text">
//         <p class="title" id="${campaigns.id}">${campaigns.story.split("\r\n",3).join("<br />")}</p>
//         <p class="author-name" id="${campaigns.id}">${campaigns.story.split("\r\n",4)[3]}</p>
//         </div>`
//         // indexTexthtml+= `<div class="dot" id="${campaigns.id}"></div>`
//         // indexTexthtml+= `</div>`
//         // indexRotationMap.innerHTML= indexTexthtml;
//         //console.log(indexTexthtml)
//       })
//       indexTexthtml+=`<div class="img-option">`
//       campaigns.forEach(campaigns=>{
//         indexTexthtml+= `<div class="dot" id="${campaigns.id}"></div>`
//       })
//       indexTexthtml+= `</div>`
//       indexRotationMap.innerHTML= indexTexthtml;
//       console.log(indexTexthtml)
//     })
// }
// getCampaigns();

//抓input
function getINput(type){
  var str="";
  let somethingInput;
  if(type==="desktop"){
     somethingInput = searchBar.value;
  }else{
     somethingInput = input.value;
  }
  str += somethingInput;
  //alert(str);
  if(str==="" || str=== undefined){
    cantFindMessage();
  }else{
    searching(str);
    const keywordValue =str;
    history.pushState({ keyword: keywordValue },"",`?keyword=${keywordValue}`);
  }
}


//抓搜尋api
function searching(str,paging=0){
  let url=`https://${hostName}/api/${apiVersion}/products/search?keyword=${str}&paging=${paging}`
  fetch(url)
    .then(res =>res.json())
    .then(source => {
      console.log(source.data)
      console.log(keywordUrl)
      if(source.data.length===0){
        cantFindMessage();
      }
      else{
        render(source.data)
        //sLoading=true;
        nextPage = source.next_paging;
        searchMobile.style.display="";
      }
    })
}


//點按圖片消失 手機版
searchMobile.addEventListener("click",function(){
  mobileHeader.style.display="flex";
  searchMobile.style.display="none";
  logo.style.display="none";
  block.style.display="none";
  headerWhite.style.display="none";
})
//電腦版
buttonDesktop.addEventListener("click",()=> {
  getINput("desktop");
  console.log("?")
  section.style.justifyContent = "";
  women.style.color="#313538";men.style.color="#313538";accessories.style.color="#313538";
});

buttonMobile.addEventListener("click",()=>{
  getINput("mobile");
  mobileHeader.style.display="none";
  searchMobile.style.display="block";
  section.style.justifyContent = "";
  logo.style.display="block";
  block.style.display="block";
  headerWhite.style.display="flex";
  womenMobile.style.color="#828282";menMobile.style.color="#828282";accessoriesMobile.style.color="#828282";
});




//抓網址
// ./?category=men&paging=0
const urlParams= new URLSearchParams(window.location.search) //抓到網址
let categoryUrl = urlParams.get('category')|| "all";   //個別取出網址
let keywordUrl = urlParams.get('keyword') 

//判斷網址
if(keywordUrl){
  searching(keywordUrl)
}else if(categoryUrl){
  getData(categoryUrl)
}else{
  window.location.href="/";
}

//加入網址參數
function getData( categories , paging=0) {
  let url = `https://${hostName}/api/1.0/products/${categories}?paging=${paging}`;
    fetch(url)
    .then((res) => res.json())
    .then((source) => {
        product = source.data;
        render(product);
        //console.log("yes")
        nextPage = source.next_paging;
        section.style.justifyContent = "";
          if(categoryUrl == "women"){ women.style.color="#8b572a";
            womenMobile.style.color="#ffffff"}
          else if(categoryUrl == "men"){ men.style.color="#8b572a";
            menMobile.style.color="#ffffff"}
          else if(categoryUrl == "accessories"){ accessories.style.color="#8b572a";
            accessoriesMobile.style.color="#ffffff"}
     })
    .catch(() => errorMessage())
  }

// function loading() {
//   const loading = document.querySelector("section");
//   let loadImg = `<div class="loading"><img style="width:8xw; height:8vw; max-width:100px;max-height:100px;" src="./images/loading.gif"><h5>loading</h5></div>`;
//   loading.style.justifyContent = "center";
//   loading.innerHTML = loadImg;
// }

//錯誤訊息
//error提示
function errorMessage() {
  const err = document.querySelector("section");
  let errMes = `<div class="error"><h1>:(</h1><h5>Oops,Sonething went wrong!</h5></div>`;
  section.style.justifyContent = "center";
  err.innerHTML = errMes;
}
//找不到商品
function cantFindMessage() {
  const cantFind = document.querySelector("section");
  let errMes = `<div class="error"><h1>:(</h1><h5>您的商品不存在，請更換關鍵字搜尋</h5></div>`;
  section.style.justifyContent = "center";
  cantFind.innerHTML = errMes;
}
//向下滑
let isLoading = false;
window.addEventListener("scroll", function scrolling() {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight && isLoading === false && nextPage !== undefined) {
        isLoading=true;
        let url = `https://${hostName}/api/1.0/products/${categoryUrl}?paging=${nextPage}`;
        fetch(url)
          .then((res) => res.json())
          .then((source) => {
          nextPage = source.next_paging;
          //console.log(nextPage)
          product = [...product, ...source.data];
          render(product);
    })
  }})

function render(product) {
  let HTML = "";
  //console.log(product);
  product.forEach((element) => {
    HTML += ` <div id="products"><div id="img-wrap"><img id="product" src="${element.main_image}" />
        </div><div class="color-wrap">`;
    element.colors.forEach(
      (obj) =>
        (HTML += `<div class="goods-color" style="background-color:#${obj.code}"></div>`)
    );
    HTML += `</div> 
           <p class="goods">${element.title.toString()}</p>
           <p class="price">TWD.${element.price}</p>
         </div></div>`;

    //console.log(HTML);
    section.innerHTML = HTML;
    isLoading = false;
    //section.insertAdjacentHTML('beforeend',HTML);
  });
}

//getData(categoryUrl);

// Fetch


function carousel(){
  fetch("https://api.appworks-school.tw/api/1.0/marketing/campaigns")
  .then(res=> res.json())
  .then(res=> {
    res.data.map(info=>{
      let newIMG = document.createElement("img");
      newIMG.setAttribute("class", "index-img");
      newIMG.setAttribute("src", info.picture);
      indexRotationMap.appendChild(newIMG);
    })
    // intervalManager(res);
    // let num=-1
    // setInterval(()=>{
    //   num+=1
    //   if(num>=3){
    //     num=0
    //   }
    //   console.log(num);
    // },1000);

    setInterval(()=>intervalManager(res),1000);
  //   res.data.map(info=>{
  //     let newIMG=document.createElement("img");
  //     newIMG.innerHTML=`<img class="index-img" src=${info.picture}>`;
  //     indexRotationMap.appendChild(newIMG);
  // })
  })
}
let counter=-1;

function intervalManager(res){
  // console.log(res);
  let translateScale=-1794;
  // let translateScale=1794;
  // let translateRatio=1794;
  counter++;
 if(counter>=res.data.length){
  counter=0
 }
 console.log(counter);
  // for(let x=0; x<res.data.length; x++){

    indexRotationMap.style.transform= `translateX(${translateScale*counter}px)`
    // i+=1
    // console.log(i);
  // }
}



carousel();
