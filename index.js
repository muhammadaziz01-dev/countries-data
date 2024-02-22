let cardWrapper = document.querySelector(".intro--card-wrapper");
let search = document.querySelector("#search");

let arr =[];

let select = document.querySelector("#select");


let darcModbtn = document.querySelector('#darcmod-btn');
let darcmodAll = document.querySelectorAll('.darcmod');
// let card = document.querySelectorAll('.card');
let input = document.querySelector('input');


let state = JSON.parse(localStorage.getItem("movies")) || [];

//-------------------------------DATA BAZA----

(function getData(){
    fetch("https://restcountries.com/v2/all").then((res)=>res.json()).then((data)=>{
        randerState(data)

        //-------seorch input---

        search.addEventListener("input",(e)=>{
            let searchData = e.target.value 
            console.log(searchData);
            let searchStste = data.filter((el)=> el.name.toLowerCase().includes(searchData.toLowerCase()) );
            if(searchStste.length){
                randerState(searchStste);
            }else{
                cardWrapper.innerHTML=`<h1 class="tatiil--not-data">No such state found</h1>`
            }

        })


      //-----------------Render States region-----------------
        data.filter((el)=>{
                if(!arr.includes(el.region)){
                    arr.push(el.region)
                }
        })
            
        arr.forEach((el)=>{
                let option = document.createElement("option");
                option.value = `${el}`
                option.innerHTML= el
                select.appendChild(option);
        })
            
        select.addEventListener("change" , (el)=>{
                let selectedRegion = el.target.value;
                let randerRegion = data.filter((el)=> el.region == selectedRegion);
                randerState(randerRegion);
        })

       //------------------------test-------
        
    //    cardWrapper.addEventListener("click" ,(e)=>{
           
    //     if(e.target.classList.contains('card')){
    //         console.log("hiiiii");
          
    //            let id = e.target.getAttribute('data-id');
    //            console.log(id);
    //            let chengState= data.filter((el)=>el.numericCode === id)[0];
    //            console.log(chengState);
    //            if(!state.includes(chengState.id)){
    //               state.push(titilFilm.id);
    //               localStorage.setItem("state" , JSON.stringify(state))
    //            }else{
    //             alert("Avval qo'shilgan")
    //            }

    //     } 

    //    });
        
    });
})();





//-----------------------------------RENDER DATA CARDS---------
function randerState(data) {
    cardWrapper.innerHTML=""
    data.forEach((el)=>{
        let card = document.createElement("div")
        card.classList.add("card");
        card.setAttribute("data-id" , `${el.numericCode}`);
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






// let tanlanganFillimlar = JSON.parse(localStorage.getItem("movies")) || [];

// moviesWrapper.addEventListener("click", (e)=>{
    
//    if(e.target.classList.contains('liked')){
      
//      let id = e.target.getAttribute('data-like');
//      let titilFilm = allMovies.filter((el)=>el.id === id)[0];
//      if(!tanlanganFillimlar.includes(titilFilm.id)){
//         tanlanganFillimlar.push(titilFilm.id);
//         toast('success', `${titilFilm.title.slice(0,21)+'...'} film added`, 1500 );
//         localStorage.setItem("movies" , JSON.stringify(tanlanganFillimlar))
      
//      }else{
//         toast('arrov', `${titilFilm.title.slice(0,21)+'...'} film  delet`, 1500 )
        
//      }
     
//    }
// })