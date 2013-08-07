$(document).ready(function(){

	init();
	
	function init()
	{
		$("#recalculando").html("").hide();
	}
	
	
	function weatherQuery(queryString, url)
	{
		return jQuery.ajax({
		    type: "POST",
		    data: queryString,
		    url: url,
		    dataType: "jsonp",
		    beforeSend: recalculando,
		    success: function(data){
		    	mostrarResultados(data);
		    	console.log("Success!");
		    }, 
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		        console.log("XMLHttpRequest: " + XMLHttpRequest);
		        console.log("textStatus: " + textStatus);
		        console.log("errorThrown: " + errorThrown);
		        $("#recalculando").html("Hubo problemas para procesar la información.").show();
		    }
		});
		
	}
	
	function recalculando()
	{
		$("#recalculando")
			.html("Estamos cargando los datos. Por favor, aguarde...")
			.css({
				"margin-bottom": "2em",
				"text-align": "center"
			})
			.show();
	}
	
	function mostrarResultados(data)
	{
		$(".weather").find("dl.details").find("dd.name").text(data.name);
		$(".weather").find("dl.details").find("dd.id").text(data.id);
		$(".weather").find("dl.details").find("dd.country").text(data.sys.country);
		$(".weather").find("dl.details").find("td.lon").text(data.coord.lon);
    	$(".weather").find("dl.details").find("td.lat").text(data.coord.lat);
    	$(".weather").find("dl.details").find("td.sunrise").text(data.sys.sunrise);
    	$(".weather").find("dl.details").find("td.sunset").text(data.sys.sunset);
    	$(".weather").find("dl.details").find("dd.description").text(data.weather[0].description);
    	$(".weather").find("dl.details").find("dd.icon").text(data.weather[0].icon);
    	$(".weather").find("dl.details").find("td.temp").text((data.main.temp - 273.15).toFixed(2));
    	$(".weather").find("dl.details").find("td.pressure").text(data.main.pressure);
    	$(".weather").find("dl.details").find("td.temp_min").text((data.main.temp_min - 273.15).toFixed(2));
    	$(".weather").find("dl.details").find("td.temp_max").text((data.main.temp_max - 273.15).toFixed(2));
    	$(".weather").find("dl.details").find("td.humidity").text(data.main.humidity + "%");
    	$(".weather").find("dl.details").find("td.speed").text(data.wind.speed);
    	$(".weather").find("dl.details").find("td.deg").text(data.wind.deg);
    	
    	$("#recalculando").html("Búsqueda finalizada con éxito.");
	}	
	
	/***************************** EVENTOS BEGIN ***********************************/
	
	$("#ciudad").on("change", function(){
		
		var id = $(this).find("option:selected").val();
		
		if (id > 0) {
			/*	PAISES */
			id--;
			
			 var ciudades = new Array("Montevideo,uy", "New York,us", "Madrid,es", "Paris,fr"); 	
			
			/* PARAMETROS
			 * lat: latitud
			 * lon: longitud
			 * cnt: cantidad de días
			 * mode: data format (json/xml)
			 * units: sistema de medida (metric)
			 * lang: lenguaje 
			 */
			var lat = "";
			var lon = "";
			var cityId = "";
			var queryString = "lang=sp&q=" + ciudades[id];
			
			console.log(id + "  " + queryString);
			
			/* Query de ciudad q=Montevideo,uy */
			var urlByCityQuery = "http://api.openweathermap.org/data/2.5/weather?";
			/* Latitud y longitud - últimos 5 días */
			var urlByCoords = "api.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=5&mode=json";
			/* Id de ciudad id=524901 */
			var urlByCityId = "api.openweathermap.org/data/2.5/forecast/daily?id=524901";
			
			weatherQuery(queryString, urlByCityQuery);
		}
	});
	
	/***************************** EVENTOS END ***********************************/
	
	
	// Espere a que PhoneGap se inicie
    //
    document.addEventListener("deviceready", onDeviceReady, false);
    
    // PhoneGap esta listo
    //
    function onDeviceReady() {
    	
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitud: ' + position.coords.latitude + '<br />' +
          'Longitud: '        + position.coords.longitude         + '\n' +
          'Altitud: '         + position.coords.altitude          + '\n' +
          'Precisión: '       + position.coords.accuracy          + '\n' +
          'Precisión altitud' + position.coords.altitudeAccuracy  + '\n' +
          'Dirección: '       + position.coords.heading           + '\n' +
          'Velocidad: '       + position.coords.speed             + '\n' +
          'Timestamp: '       + new Date(position.timestamp)      + '\n';
    }

    // La función 'callback' onError recibe un objeto `PositionError`.
    //
    function onError(error) {
        alert('código: '    + error.code    + '\n' +
              'mensaje: ' + error.message + '\n');
    }
});