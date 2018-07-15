
function searchLocation() {
    var query = document.getElementById("citySearch").value;
    let locationUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=' + query;

    ajax(locationUrl, function(response){
        console.log(response);
        let woeidNum = response[0].woeid
        getForecast(woeidNum);
    });
      
}

function getForecast(woeidNum){
    let forecastUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/' + woeidNum;

    ajax(forecastUrl, function(response){
        console.log(response);
        displayResults(response);        
    });
      
}

function ajax(url, callback){
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET',url);

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){ 
            let response = JSON.parse(xhr.responseText);
            callback(response);
        }
    }
    
    xhr.send();
}

function displayResults(forecastAnsmwer){
    let todayF = forecastAnsmwer.consolidated_weather; 
    let name =  todayF[0].weather_state_name;
    console.log(name);
    
    var d = new Date();
    var day1 = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"];

    let days =[day1[d.getDay()],day1[d.getDay()+1], day1[d.getDay()+2], day1[d.getDay()+3],day1[d.getDay()+4],day1[d.getDay()+5]];
    
    eachDayForecast(days);

    function eachDayForecast(arr){

        let divEl = document.querySelector(".forecast");
        divEl.innerHTML = "";
    
        for (let [index, value] of days.entries()){
            let forecastDivDaily = document.createElement("div"); 
            let dayDiv = document.createElement("div");
            let stateDiv = document.createElement("div");
            let highTemp = document.createElement("div");
            let lowTemp = document.createElement("div");  
            let iconImage = document.createElement("img"); 
            
            let todayRes = forecastAnsmwer.consolidated_weather[index];
            let abbr = forecastAnsmwer.consolidated_weather[index].weather_state_abbr;
    
            forecastDivDaily.className = "forecastDivDaily";
            iconImage.className = "abbr_icon";
            dayDiv.className = "day";
            stateDiv.className = "state";
            highTemp.className = "temp";
            lowTemp.className = "temp";

            divEl.appendChild(forecastDivDaily);
            forecastDivDaily.appendChild(iconImage); 
            forecastDivDaily.appendChild(dayDiv);       
            forecastDivDaily.appendChild(stateDiv);
            forecastDivDaily.appendChild(highTemp);
            forecastDivDaily.appendChild(lowTemp);  

            let colors = ["#2999b7","#48d0ff","#32bebc","#e5c851","#ed4caf"];
            let tempColor = Math.round(todayRes.max_temp);
          
            if (tempColor <= 0) {
                    forecastDivDaily.style.backgroundColor = colors[0];
                } else if (tempColor > 0 && tempColor <= 10){
                    forecastDivDaily.style.backgroundColor = colors[1];
                } else if (tempColor > 10 && tempColor <= 15){
                    forecastDivDaily.style.backgroundColor = colors[2];
                } else if (tempColor > 15 && tempColor <= 25){
                    forecastDivDaily.style.backgroundColor = colors[3];
                } else if (tempColor > 25){
                    forecastDivDaily.style.backgroundColor = colors[4];
            }
                       
            dayDiv.innerHTML = value;
            stateDiv.innerHTML = todayRes.weather_state_name;
            highTemp.innerHTML = Math.round(todayRes.max_temp) + " &#8451";
            lowTemp.innerHTML = Math.round(todayRes.min_temp) + " &#8451";
            iconImage.setAttribute("src","https://www.metaweather.com/static/img/weather/" + abbr + ".svg")
        }
    }
    
}
