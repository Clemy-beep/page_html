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
            document.getElementById("container").innerHTML =
                "Une erreur s'est produite";
        },
    });
}

//setup before functions
var timer; //timer identifier
var doneTypingInterval = 500; //time in ms, 5 second for example
var $input = $(document, "#country");

//on keyup, start the countdown
$input.on("keyup", function() {
    clearTimeout(timer);
    timer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown
$input.on("keydown", function() {
    clearTimeout(timer);
});

//user is "finished typing," do something
function doneTyping() {
    let $current_input = $("#country").val();
    if ($current_input.length > 3) {
        getCities($current_input);
    }
}

function showWeather() {
    let city = document.getElementById("cities").value;
    let token = "25559ba9549cdf970b482a35d3313cac";
    let url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        token;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(response) {
            showDatas(response, city);
        },
        error: function(err) {
            //   console.log("error", err);
        },
    });
}

function getCities() {
    $("option").each((el, value) => {
        $(value).remove();
    });

    let url = "https://countriesnow.space/api/v0.1/countries/cities";
    let country = document.getElementById("country").value;

    if (country === "") {
        return;
    }

    $.ajax({
        url: url,
        type: "POST",
        data: { country: country },
        dataType: "json",
        success: function(response) {
            response.data.forEach((element, key) => {
                let tag_option = document.createElement("option");
                tag_option.setAttribute("value", element);
                tag_option.innerHTML = element;
                document.getElementById("cities").appendChild(tag_option);
            });
        },
        error: function(err) {
            //   console.log("error", err);
        },
    });
}

function showDatas(datas, city) {
    let object_to_array = Object.entries(datas.weather[0]);

    //Element dans lequel j'affiche les resultats
    let target = document.getElementById("container");

    let key_selected = [
        "clearsky",
        "brokenclouds",
        "fewclouds",
        "overcastclouds",
    ];
    let assoc_array = {
        brokenclouds: "<i class='fas fa-cloud-sun fa-10x'></i>",
        fewclouds: "<i class='fas fa-cloud-rain fa-10x'></i>",
        clearsky: "<i class='fas fa-sun fa-10x'></i>",
        overcastclouds: "<i class='fas fa-cloud-showers-heavy fa-10x'></i>",
    };

    for (let [key, value] of object_to_array) {
        value = String(value).toLowerCase().replace(" ", "");

        if (key_selected.includes(value)) {
            let new_div = document.createElement("div");
            new_div.setAttribute(
                "style",
                "display:flex;justify-content:center;align-items:center;flex:wrap;padding:20px;"
            );
            new_div.setAttribute("class", "main-weather");
            new_div.innerHTML =
                "<span>" + city.toUpperCase() + " " + assoc_array[value] + "</span>";
            target.appendChild(new_div);
        }
    }
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
                case "fog":
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