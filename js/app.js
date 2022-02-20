/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
var weaList=[];


/*PUT YOUR OWN KEY HERE - THIS MIGHT NOT WORK

SUBSCRIBE HERE: https://home.openweathermap.org/users/sign_up*/
const apiKey = "4d8fb5b93d4af21d66a2948710284366";
const ajs = document.querySelector(".ajax-section");
form.addEventListener("submit", e => {
  e.preventDefault();

 let inputVal = input.value;
  const listItems = list.querySelectorAll(".ajax-section .city");
// const selectval = document.querySelector("#state").value;

const listItemsArray = Array.from(listItems);
 console.log(typeof listItems , typeof listItemsArray);
if (listItemsArray.length > 0) {
  //2
  const filteredArray = listItemsArray.filter(el => {
    let content = "";
    //athens,gr
    if (inputVal.includes(",")) {
      //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
      if (inputVal.split(",")[1].length > 2) {
        inputVal = inputVal.split(",")[0];
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      } else {
        content = el.querySelector(".city-name").dataset.name.toLowerCase();
      }
    } else {
      //athens
      content = el.querySelector(".city-name span").textContent.toLowerCase();
    }
    return content == inputVal.toLowerCase();
  });
if (filteredArray.length > 0) {
    alert( `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent} ...otherwise be more specific by providing the country code as well `);
inputVal="";  
  form.reset();
    input.focus();
    return;
  }
}


  //ajax here 


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, coord ,name, sys, weather } = data;
console.log(data);	
if(name==undefined){
  alert("Unknown Location");
  return
}
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
            <div class="city-temp">${Math.round(main.temp-273)}<sup>&deg;C</sup></div>
            <figure>
              <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
              <figcaption id="d">${weather[0]["description"]}</figcaption>
              </figure>
<button onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-black">More</button>
  <button id="push" onclick="addTList()";><a target="_blank" href=" https://www.google.com/search?q=${name} Weather">Analyze</a></button> 
`;
li.style.backgroundColor=giveColor(main.temp-273);
          li.innerHTML = markup;
          list.appendChild(li);
          weaList.push(li);
          
console.log(weaList);
localStorage.setItem("wlist",weaList);
display(data);

document.getElementById("push").addEventListener("click",addTList);
        })
        .catch(() => {
          alert("Please search for a valid city 😩");
        });
    
   //   msg.textContent = "";
      form.reset();

    });


//const listItems = list.querySelectorAll(".ajax-section .city");




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


function display(data){
  //  let htmldata =""


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
         <td>${Math.round(main.temp-273)}<sup>�C</sup></td>
         
         </tr>
<tr>
         <td>Maximum Temperature</td>
         <td>${Math.round(main.temp_max-273)}<sup>�C</sup></td>
         
         </tr>
<tr>
         <td>Minimum Temperature</td>
         <td>${Math.round(main.temp_min-273)}<sup>�C</sup></td>
         
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

function addTList(){
  for (let i = 0; i < weaList.length-1; i++) {
    console.log(+i+" : "+weaList[i].textContent.toLocaleString());
  }
}




/*
function addTList(db){
	 listItems = list.querySelectorAll(".ajax-section .city");
 
db = Array.from(listItems);
let markup1=[],markup2="";




if(db.length>0){


for (let i=0;i<db.length;i++)
	markup1[i]= db[i].innerHTML.replace(/(\r\n|\n|\r)/gm, "");


}
for (let i=0;i<db.length;i++)
{markup2 += markup1[i].replace('<button id="push" onclick="addTList()" ;=""><i class="fa fa-plus"></i></button>','<button id="push" class="delete w3-button" onclick="RTList(i)" ;><i class="fa fa-trash-o"></i></button>');
}
document.querySelector("#tasks").innerHTML=markup2;


	//localStorage.setItem("myValue", JSON.stringify(markup)); 
//();
document.querySelector('#span').innerHTML=db.length;
	
}
function RTList(r) { 

    var ul = document.getElementById('tasks');
    var li = ul.children;
    for (var i=0; i < li.length; i++) {
 if(i===r){
            ul.removeChild(li[i]);
        
    }
}

    }*/