function showApi() {
    $.ajax({
        url: "../vues/api.html",
        type: "GET",
        dataType: "html",
        success: function(response) {
            document.getElementById("container").innerHTML = response;
            getCities();
        },
        error: function() {
            document.getElementById("container").innerHTML = "Une erreur s'est produite";
        }
    });
}


function getCities() {
    let url = "https://countriesnow.space/api/v0.1/countries/cities";
    let country = "France";
    $.ajax({
        url: url,
        type: "POST",
        data: { "country": country },
        dataType: "json",
        success: function(response) {
            response.data.forEach((element, key) => {
                let tag_option = document.createElement("option");
                tag_option.setAttribute("value", element);
                tag_option.innerHTML = element;
                document.getElementById("cities").appendChild(tag_option);
            })
        },
        error: function(err) {
            console.log("error", err)
        }
    });
}

function getWeather() {
    const apiKey = "91e21e1299291a6b6f8d752fca598814";
    let cityName = document.getElementById("cities").value;
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey,
        data: "json",
        success: function(response) {
            let weather = response["weather"][0]["description"];
            let weatherTranslation = "";
            switch (weather) {
                case "clear sky":
                    weatherTranslation = "ensoleillé";
                    document.getElementById("weather-icon").className = "fas fa-sun";
                    break;
                case "few clouds":
                    weatherTranslation = "peu nuageux";
                    document.getElementById("weather-icon").className = "fas fa-cloud-sun";
                    break;
                case "scattered clouds":
                    weatherTranslation = "nuageux";
                    document.getElementById("weather-icon").className = "fas fa-cloud";
                    break;
                case "broken clouds":
                    weatherTranslation = "fortement nuageux";
                    document.getElementById("weather-icon").className = "fas fa-cloud";
                    break;
                case "shower rain":
                    weatherTranslation = "bruineux";
                    document.getElementById("weather-icon").className = "fas fa-cloud-rain";
                    break;
                case "rain":
                    weatherTranslation = "pluvieux";
                    document.getElementById("weather-icon").className = "fas fa-cloud-showers-heavy";
                    break;
                case "thunderstorm":
                    weatherTranslation = "orageux";
                    document.getElementById("weather-icon").className = "fas fa-bolt";
                    break;
                case "snow":
                    weatherTranslation = "neige";
                    document.getElementById("weather-icon").className = "fas fa-snowflake";
                    break;
                case "mist":
                    weatherTranslation = "brouillard";
                    document.getElementById("weather-icon").className = "fas fa-smog";
                    break;
                default:
                    weatherTranslation = "indéfini";
                    document.getElementById("weather-icon").className = "";
                    break;
            }
            document.getElementById("weather").innerHTML = "Le temps à " + cityName + "  est : " + weatherTranslation;
        },
        error: function(err) {
            console.log("error", err)
        }
    });
}