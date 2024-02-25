"use strict"
let cardWrapper = document.querySelector(".intro--card-wrapper");
let search = document.querySelector("#search");

let regions =[];

let select = document.querySelector("#select");


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
         console.log(result);
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








//-----------------------------------RENDER DATA CARDS---------
function randerState(data) {
    cardWrapper.innerHTML=""
    if (data.length) {
        data.forEach((el)=>{
            let card = document.createElement("div")
            card.classList.add("card");
            // card.setAttribute("data-id" , `${el.numericCode}`);
            card.innerHTML=`
            <div class="card-img">
               <img src="${el.flag}" alt="${el.name}">
            </div>
            <div class="card-titil card">
               <h2>${el.name}</h2>
               <ul>
                  <li><strong>Population:</strong>${el.population}</li>
                  <li><strong>Region:</strong>${el.region}</li>
                  <li><strong>Capital:</strong>${el.capital}</li>
               </ul>
            </div>
            `
        
            cardWrapper.appendChild(card)
        })
    }else{
       cardWrapper.innerHTML= `<h1 class = "error-messege"> NOT FOUND </h1>`;
    }
}

//------DARC MODE--------\

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
        // card.forEach((el)=> el.classList.toggle("darcmod-card"));
        input.style.color = "#FFF"

    }else{
        darcModbtn.innerHTML=`<i class="bi bi-moon"></i> Dark Mode`;
        darcModbtn.style.color= "#111517";
        document.body.style.transition = "ail 0.1s lener";
        document.body.style.backgroundColor = "#FAFAFA";
        document.body.style.color = "#111517";
        darcmodAll.forEach((el)=> el.style.backgroundColor = "#FFF")
        darcmodAll.forEach((el)=> el.style.color = "#111517")
        // card.forEach((el)=> el.classList.toggle("darcmod-card"));
        input.style.color = "#111517"
        
    }
    isDarkMode = !isDarkMode;
}
//----------------------------------------TEST





