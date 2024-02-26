"use strict"
let cardWrapper = document.querySelector(".intro--card-wrapper");
let search = document.querySelector("#search");

let regions =[];

let select = document.querySelector("#select");
let countrisWrapper = document.querySelector('.countri--card-wrapper');

let darcModbtn = document.querySelector('#darcmod-btn');
let darcmodAll = document.querySelectorAll('.darcmod');
let input = document.querySelector('input');

let link2 = document.querySelector('.link2');

let iconTitil = document.querySelector('#icon-titl');
let titlDocument = document.querySelector('title')

let URL =  "https://restcountries.com/v2";






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
        link2.style.color="#FFF";

    }else{
        darcModbtn.innerHTML=`<i class="bi bi-moon"></i> Dark Mode`;
        darcModbtn.style.color= "#111517";
        document.body.style.transition = "ail 0.1s lener";
        document.body.style.backgroundColor = "#FAFAFA";
        document.body.style.color = "#111517";
        darcmodAll.forEach((el)=> el.style.backgroundColor = "#FFF")
        darcmodAll.forEach((el)=> el.style.color = "#111517")
        link2.style.color="#111517";
    
        
    }
    isDarkMode = !isDarkMode;
}
//------DARC MODE END--------\






let countri = JSON.parse(localStorage.getItem("countri"))

// countri *= 1;

// console.log(countri);



//-----filter chenge contrise------
async function newCountri(url) {
    try{
        const response = await fetch(`${url}/all`);
        const result = await response.json()
        const filtercountri = await result.filter((el )=> el.name == countri);
        renderCardCountris(filtercountri)
    }catch (error){
       cardWrapper.innerHTML= `<h1 class = "error-messege">${error.message} </h1>`;
    }
}
newCountri(URL)






//eander countris-------------
function renderCardCountris(data) {
    countrisWrapper.innerHTML=''
    data.forEach((el)=>{
        titlDocument.textContent=`${el.name}`;
        iconTitil.setAttribute('href' , `${el.flag}`);

        let card = document.createElement('div');
        card.classList.add('countri--card');
        card.innerHTML=`
        <div class="countri--card--img">
            <img src="${el.flag}"
                alt="${el.name}">
        </div>
        <div class="countri-card--titil">
            <h2>${el.name}</h2>
            <div class="countri-card--titil--list">
                <ul>
                    <li><strong>Native Name:</strong>${el.demonym}</li>
                    <li><strong>Population:</strong>${el.population}</li>
                    <li><strong>Region:</strong>${el.region}</li>
                    <li><strong>Sub Region:</strong>${el.subregion}</li>
                    <li><strong>Capital:</strong>${el.capital}</li>
                </ul>
                <ul>
                    <li><strong>Top Level Domain:</strong>${el.topLevelDomain}</li>
                    <li><strong>Currencies:</strong>${el.currencies[0].symbol}</li>
                    <li><strong>Languages:</strong>monopol</li>
                </ul>
            </div>
            <div class="countri-card--titil--botton">
                <strong>Border Countries: </strong>
                <p class="countri-card--titil--botton--pi">
                      <span>France</span><span>Germany</span><span>Netherlands</span>
                </p>
            </div>
        </div>
        `
        countrisWrapper.append(card);
    })
}




