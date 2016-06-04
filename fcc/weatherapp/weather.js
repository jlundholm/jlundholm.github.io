$(document).ready(function () {
  var units = "F";
  $("#units").click(function() {
    var temp = $("#temperature").html();
    if (units === "F") {
      units = "C";
      $(this).html("C");
      $("#temperature").html(((temp - 32) * (5/9)).toFixed(0));
    }
    else if (units === "C") {
      units = "F";
      $(this).html("F");
      $("#temperature").html((temp*(9/5) + 32).toFixed(0));
    }
    
  });
  
  // conditions for using forcast.io api
  var conditionIcons = {
    "clear-day": "wi-day-sunny",
    "clear-night": "wi-night-clear",
    "rain": "wi-rain",
    "snow": "wi-snow",
    "sleet": "wi-sleet",
    "wind": "wi-strong-wind",
    "fog": "wi-fog",
    "cloudy": "wi-cloudy",
    "partly-cloudy-day": "wi-day-cloudy",
    "partly-cloudy-night": "wi-night-cloudy",
    "hail": "wi-hail",
    "thunderstorm": "wi-thunderstorm",
    "tornado": "wi-tornado"
  }
  
  var latitude;
  var longitude;
  var url = 'http://api.openweathermap.org/data/2.5/weather'
  var spec;
 
  $.getJSON('http://ip-api.com/json', function(data) {
    console.log(data);
    latitude = data.lat;
    longitude = data.lon;
    $("#location").html(data.city);
    $.getJSON('https://api.forecast.io/forecast/7f4d3958ca9609c205406f2496f6e1cc/'+latitude+','+longitude+'?&callback=?', function(data) {
      console.log(data);
      var temperature = Math.round(data.currently.temperature);
      $("#temperature").html(temperature);
        
      var conditions = data.currently.summary;
      $("#conditions").html(conditions);
        
      var icon = data.currently.icon;
      for (var property in conditionIcons) {
        if (conditionIcons.hasOwnProperty(icon)) {
          $("#icon").addClass(conditionIcons[icon]);
        }
      }
      })
  })
  
  /*if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
      var url = 'http://api.openweathermap.org/data/2.5/weather'
      var spec = {
        lon: position.coords.longitude,
        lat: position.coords.latitude,
        APPID: '640994faef053611436c5dd77cb0b52a',
        units: 'imperial'
      }
      $.getJSON(url, spec, function(data) {
        var sunrise = data.sys.sunrise;
        var sunset = data.sys.sunset;
        var currentTime = data.dt;
        var dayNight = "day";
        
        if (currentTime < sunrise) {
          dayNight = "night";
        }
        else if (currentTime > sunrise && currentTime < sunset) {
          dayNight = "day";
        }
        else if (currentTime > sunset) {
          dayNight = "night";
        }
        
        var temperature = Math.round(data.main.temp);
        $("#temperature").html(temperature);
        
        var conditions = data.weather[0].main;
        $("#conditions").html(conditions);
        
        var location = data.name;
        $("#location").html(location);
        
        var icon = data.weather[0].id;
        $("#icon").addClass('wi-owm-'+dayNight+'-'+icon);
        
        console.log(data);

      });      
      
      /*
      // conditions for using forcast.io api
      var conditionIcons = {
        "clear-day": "wi-day-sunny",
        "clear-night": "wi-night-clear",
        "rain": "wi-rain",
        "snow": "wi-snow",
        "sleet": "wi-sleet",
        "wind": "wi-strong-wind",
        "fog": "wi-fog",
        "cloudy": "wi-cloudy",
        "partly-cloudy-day": "wi-day-cloudy",
        "partly-cloudy-night": "wi-night-cloudy",
        "hail": "wi-hail",
        "thunderstorm": "wi-thunderstorm",
        "tornado": "wi-tornado"
      }*/
      
      // get weather info from forcast.io
      /*$.getJSON('https://api.forecast.io/forecast/7f4d3958ca9609c205406f2496f6e1cc/' + position.coords.latitude + ',' + position.coords.longitude + '?&callback=?', function(data) {
      var temperature = Math.round(data.currently.temperature);
      $("#temperature").html(temperature + "&deg;F");
        
      var conditions = data.currently.summary;
      $("#conditions").html(conditions);
        
      var icon = data.currently.icon;
      for (var property in conditionIcons) {
        if (conditionIcons.hasOwnProperty(icon)) {
          $("#icon").addClass(conditionIcons[icon]);
        }
      }
      });
      
    });*/
      
  
  
    
});
