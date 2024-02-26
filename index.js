"use strict"
let cardWrapper = document.querySelector(".intro--card-wrapper");
let search = document.querySelector("#search");

let regions =[];

let select = document.querySelector("#select");
let countrisWrapper = document.querySelector('.countri--card-wrapper');

let darcModbtn = document.querySelector('#darcmod-btn');
let darcmodAll = document.querySelectorAll('.darcmod');
let input = document.querySelector('input');

let URL =  "https://restcountries.com/v2";

//-------------------------------DATA BAZA ----

async function getPost(reqURL) {
    cardWrapper.innerHTML= `<span class="loader"></span>`;
    try{
       const response = await fetch(`${reqURL}/all`);
       if(response.status===200){
         const result = await response.json();
         cardWrapper.innerHTML= ``;
         randerState(result)
       }
    }catch (error){
       cardWrapper.innerHTML= `<h1 class = "error-messege">${error.message} </h1>`;
    }
}
getPost(URL)





//----------SEARCH COUNTRIES START------

async function searchCountries(searchText) {
    cardWrapper.innerHTML= `<span class="loader"></span>`;
    try{
        const response = await fetch(`${URL}/name/${searchText}`);
        const result = await response.json()
        randerState(result)
    }catch (error){
       cardWrapper.innerHTML= `<h1 class = "error-messege">${error.message} </h1>`;
    }
}


search.addEventListener('keyup',(e)=>{
    if(e.keyCode == 13 && e.target.value.trim().length){
        const searchText = e.target.value.trim() ;
        searchCountries(searchText);
    }
})
//----------SEARCH COUNTRIES END------



//----------------REGION COUNTRISE START----------
async function regionCountrise(reqURL) {
    cardWrapper.innerHTML= `<span class="loader"></span>`;
    try{
       const response = await fetch(`${reqURL}/all`);
       if(response.status===200){
         const result = await response.json();
         result.forEach((el)=>{
            if(!regions.includes(el.region)){
                regions.push(el.region)
                  
            }
        })
        regions.forEach((el)=>{
          let option = document.createElement("option");
          option.value = `${el}`
          option.innerHTML= el
          select.appendChild(option);
        })
         
       }
    }catch (error){
       cardWrapper.innerHTML= `<h1 class = "error-messege">${error.message} </h1>`;
    }
}
regionCountrise(URL)
//----------------REGION COUNTRISE END----------
 






// ---------SELECT RECGION START-----------
async function filterCountrise(regionText) {
    cardWrapper.innerHTML= `<span class="loader"></span>`;
    try{
       const response = await fetch(`${URL}/all`);
       const result = await response.json();
       const regionCountris = await result.filter((el)=> el.region == regionText);
       randerState(regionCountris);
    }catch (error){
       cardWrapper.innerHTML= `<h1 class = "error-messege">${error.message} </h1>`;
    }
}

select.addEventListener('change' ,(e)=>{
    let changeRegion = e.target.value;
    filterCountrise(changeRegion);
})
// ---------SELECT RECGION END-----------








//-----------------------------------RENDER DATA CARDS START---------
function randerState(data) {
    cardWrapper.innerHTML=""
    if (data.length) {
        data.forEach((el )=>{
            let card = document.createElement("div")
            card.classList.add("card");
            // card.setAttribute("data-id" , `${el.numericCode}`);
            card.innerHTML=`
            <div class="card-img">
               <img src="${el.flag}" alt="${el.name}">
            </div>
            <div class="card-titil card">
               <h2>${el.name.length > 28 ? el.name.slice(0,25)+'...': el.name}</h2>
               <ul>
                  <li><strong>Population:</strong>${el.population}</li>
                  <li><strong>Region:</strong>${el.region}</li>
                  <li><strong>Capital:</strong>${el.capital}</li>
               </ul>
               <a href="./countri.html" class="link" data-id='${el.name}'>to see</a>
            </div>
            `
        
            cardWrapper.appendChild(card)
        })
    }else{
       cardWrapper.innerHTML= `<h1 class = "error-messege"> NOT FOUND </h1>`;
    }
}
//-----------------------------------RENDER DATA CARDS START---------
//./countri.html





//------DARC MODE START--------\
let isDarkMode = false;
darcModbtn.onclick = function () {
    if (isDarkMode==false){
        darcModbtn.innerHTML=`<i class="bi bi-brightness-high"></i> Day Mode`;
        darcModbtn.style.color= "#FFF";
        document.body.style.transition = "ail 0.1s lener";
        document.body.style.backgroundColor = "#202C36";
        document.body.style.color = "#FFF";
        darcmodAll.forEach((el)=> el.style.backgroundColor = "#2B3844")
        darcmodAll.forEach((el)=> el.style.color = "#FFF")
        input.style.color = "#FFF"

    }else{
        darcModbtn.innerHTML=`<i class="bi bi-moon"></i> Dark Mode`;
        darcModbtn.style.color= "#111517";
        document.body.style.transition = "ail 0.1s lener";
        document.body.style.backgroundColor = "#FAFAFA";
        document.body.style.color = "#111517";
        darcmodAll.forEach((el)=> el.style.backgroundColor = "#FFF")
        darcmodAll.forEach((el)=> el.style.color = "#111517")
        input.style.color = "#111517"
        
    }
    isDarkMode = !isDarkMode;
}
//------DARC MODE END--------\




//----------------------------------------TEST-----



cardWrapper.addEventListener('click' , (e)=>{
    if(e.target.classList.contains('link')){
        let clinCod = e.target.getAttribute('data-id');
        localStorage.setItem("countri" , JSON.stringify(clinCod))
    }
})



// let countri = JSON.parse(localStorage.getItem("countri"))
// countri = countri * 1;

// async function newCountri(url) {
//     try{
//         const response = await fetch(`${url}/all`);
//         const result = await response.json()
//         const filtercountri = await result.filter((el ,id)=> id== countri);
//         renderCardCountris(filtercountri)
//     }catch (error){
//        cardWrapper.innerHTML= `<h1 class = "error-messege">${error.message} </h1>`;
//     }
// }
// newCountri(URL)


// function renderCardCountris(data) {
//     data.forEach((el)=>{
//         let card = document.createElement('div');
//         card.classList.add('countri--card');
//         card.innerHTML=`
//         <div class="countri--card--img">
//             <img src="${el.flag}"
//                 alt="${el.name}">
//         </div>
//         <div class="countri-card--titil">
//             <h2>${el.name}</h2>
//             <div class="countri-card--titil--list">
//                 <ul>
//                     <li><strong>Native Name:</strong>${el.demonym}</li>
//                     <li><strong>Population:</strong>${el.population}</li>
//                     <li><strong>Region:</strong>${el.region}</li>
//                     <li><strong>Sub Region:</strong>${el.subregion}</li>
//                     <li><strong>Capital:</strong>${el.capital}</li>
//                 </ul>
//                 <ul>
//                     <li><strong>Top Level Domain:</strong>${el.topLevelDomain}</li>
//                     <li><strong>Currencies:</strong>${el.currencies[0].symbol}</li>
//                     <li><strong>Languages:</strong>monopol</li>
//                 </ul>
//             </div>
//             <div class="countri-card--titil--botton">
//                 <strong>Border Countries: </strong>
//                 <p class="countri-card--titil--botton--pi">
//                       <span>France</span><span>Germany</span><span>Netherlands</span>
//                 </p>
//             </div>
//         </div>
//         `
//         countrisWrapper.appendChild(card);
//     })
// }




