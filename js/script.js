// Declaring the variables


  var listItems ={};
 
let oi=false;
var listItemsArray=[] ;
let lon;
let lat;
let temperature = document.querySelector(".city-temp");
let summary = document.querySelector("#d");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;
 
//  r.removeEventListener("click",noWeather());

function noWeather(){
  alert('ok no worry')
}

function getWeather(){
if(!oi) giveWeather() 
else alert("you have already given your location");
}
  function giveWeather(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
    


 
console.log( listItemsArray);
      // API ID
      const api = "4d8fb5b93d4af21d66a2948710284366";
    
      // API URL
      const base =
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
    `lon=${lon}&appid=4d8fb5b93d4af21d66a2948710284366`;
    
      // Calling the API
      
      fetch(base)
        .then(response => response.json())
        .then(data => {
          const { main,coord, name, sys, weather } = data;
console.log(data);
          const icon = `https://openweathermap.org/img/wn/${
            weather[0]["icon"]
          }@2x.png`;
    
          const li = document.createElement("li");
          li.classList.add("city");
          const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
              <span>${name}</span>
              <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp-kelvin)}<sup>°C</sup></div>
            <figure>
              <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
              <figcaption id="d">${weather[0]["description"]}</figcaption>
              </figure>
<button onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-black">More</button>
<button id="push" onclick="addTList()";><a target="_blank" href=" https://www.google.com/search?q=${name} Weather">Analyze</a></button> 



`;
              li.innerHTML = markup;
li.style.backgroundColor=giveColor(main.temp-kelvin);
              list.appendChild(li);
oi=true;
display(data);

            })
      });
    }
	    } 

    let is1 = document.getElementById('dis1');
let is2 = document.getElementById('dis2');
let is3 = document.getElementById('dis3');
    let a,b,c;
    a=document.getElementById('i1').checked;
    b=document.getElementById('i2').checked;
    c=document.getElementById('i3').checked;
   console.log(a,b,c)
    console.log(is1,is2,is3);
    function giveOption(x){

      if(x==0)
      {
        is1.style.display="block";

   is2.style.display="none";
   is3.style.display="none";
console.log(a,b,c)
      }
      
      else if(x==1)
      {
        is1.style.display="none";

   is2.style.display="block";
   is3.style.display="none";
      }
      else if(x==2)
      {
        is1.style.display="none";

   is2.style.display="none";
   is3.style.display="block";
console.log(a,b,c)
      }
    }




function giveColor(temp){
if(temp>=38) return "darkred" ;
else if (temp<38 && temp >=32) return "red";

else if (temp<32 && temp >=24) return "orange";

else if (temp<24 && temp >=15) return "yellow";

else if (temp<15 && temp >=0) return "green";
else if (temp<0 && temp >=-18) return "blue";

else if (temp<-18 && temp >=-29) return "purple";

else if (temp<-29 && temp >=-39) return "red";
else if (temp>=-40) return "grey";	
}

 function checkDuplicate(arr1,arr2,lat,lon){
   
     
      // iterate over the array
      for(let i = 0,j=0; i < arr1.length,j<arr2.length;i++,j++) {
         // compare the first and last index of an element
         if((parseFloat(arr1[i].textContent)==lat)&&(parseFloat(arr2[j].textContent)==lon)){
            return -1;
         }
      }
   
   }

function display(data){
  //  let htmldata =""
let kelvin=273;

    const { dt,wind,timezone,visibility,main,coord, name, sys, weather } = data;
 const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
       
var myDate = new Date(dt*1000);
 let currentdata=`
<tr>
         <td>Date</td>
         <td>${myDate.toLocaleString()}</td>
         
         </tr><tr>
         <td>City</td>
         <td>${name}</td>
         
         </tr>
<tr>
         <td>Country</td>
         <td>${sys.country}</td>
         
         </tr>
<tr>
         <td>Timezone</td>
         <td>${chms(timezone)}</td>
         
         </tr>
<tr>
         <td>Lattitude</td>
         <td>${coord.lat}</td>
         
         </tr>
<tr>
         <td>Longitude</td>
         <td>${coord.lon}</td>
         
         </tr>
<tr>
         <td>Sunrise</td>
         <td>${cS(sys.sunrise)}AM</td>
         
         </tr><tr>
         <td>Sunset</td>
         <td>${cS(sys.sunset)}PM</td>
         
         </tr>
<tr>
         <td>Visibility</td>
         <td>${visibility}</td>
         
         </tr>
<tr>
         <td>Temperature</td>
         <td>${Math.round(main.temp-kelvin)}<sup>°C</sup></td>
         
         </tr>
<tr>
         <td>Maximum Temperature</td>
         <td>${Math.round(main.temp_max-kelvin)}<sup>°C</sup></td>
         
         </tr>
<tr>
         <td>Minimum Temperature</td>
         <td>${Math.round(main.temp_min-kelvin)}<sup>°C</sup></td>
         
         </tr>
<tr>
         <td>Pressure</td>
         <td>${main.pressure} Pa</td>
         
         </tr>
<tr>
         <td>Humidity</td>
         <td>${main.humidity} g/m3</td>
         
         </tr>
<tr>
         <td>Weather</td>
         <td>           <div class="w3-center" style="width:50%;"><img  src=${icon}   style="width:100%; "  alt=${weather[0]["main"]}>
<p style="text-align:center;text-transform:capitalize;">${weather[0]["description"]}</p></div>
</td>
         
         </tr> 
<tr>
         <td>Wind Degrees</td>
         <td>${wind.deg}<sup>°</sup></td>
         
         </tr>
<tr>
         <td>Wind Speed</td>
         <td>${wind.speed}</td>
         
         </tr>
`
        // htmldata += currentdata;

    document.getElementById('tbody').innerHTML = currentdata
}
function chms(sec) {
    //const sec = parseInt(value, 10); // convert value to number if it's string
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
}

function cS(sec) {

// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(sec * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
return  hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

}
/*
function addToList(){
	 listItems = list.querySelectorAll(".ajax-section .city");
 
data = Array.from(listItems);
let markup;

if(data.length>0){
	data.forEach(get);


}
	//localStorage.setItem("myValue", JSON.stringify(markup)); 
//();
document.querySelector('#span').innerHTML=data.length;
	
}

function get(item){
 document.getElementById('tasks').innerHTML+=item.textContent; 
}*/