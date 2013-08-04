$(document).ready(function(){
	
	var weather = jQuery.ajax({
	    type: "GET",
	    url: "http://api.openweathermap.org/data/2.5/weather?q=Montevideo,uy",
	    dataType: "jsonp",
	    success: function(results){
	    	$(".weatherDetails").find("dl.coordenadas").find("dd.lon").text(results.coord.lon);
	    	$(".weatherDetails").find("dl.coordenadas").find("dd.lat").text(results.coord.lat);
	    	$(".weatherDetails").find("dl.sys").find("dd.country").text(results.sys.country);
	    	$(".weatherDetails").find("dl.sys").find("dd.sunrise").text(results.sys.sunrise);
	    	$(".weatherDetails").find("dl.sys").find("dd.sunset").text(results.sys.sunset);
	    	$(".weatherDetails").find("dl.weather").find("dd.id").text(results.weather[0].id);
	    	$(".weatherDetails").find("dl.weather").find("dd.main").text(results.weather[0].main);
	    	$(".weatherDetails").find("dl.weather").find("dd.description").text(results.weather[0].description);
	    	$(".weatherDetails").find("dl.weather").find("dd.icon").text(results.weather[0].icon);
	    	$(".weatherDetails").find("dl.base").find("dd.base").text(results.base);
	    	$(".weatherDetails").find("dl.main").find("dd.temp").text(results.main.temp - 273.15);
	    	$(".weatherDetails").find("dl.main").find("dd.pressure").text(results.main.pressure);
	    	$(".weatherDetails").find("dl.main").find("dd.temp_min").text(results.main.temp_min);
	    	$(".weatherDetails").find("dl.main").find("dd.temp_max").text(results.main.temp_max);
	    	$(".weatherDetails").find("dl.main").find("dd.humidity").text(results.main.humidity);
	    	$(".weatherDetails").find("dl.wind").find("dd.speed").text(results.wind.speed);
	    	$(".weatherDetails").find("dl.wind").find("dd.deg").text(results.wind.deg);
	    	$(".weatherDetails").find("dl.clouds").find("dd.all").text(results.clouds.all);
	    	$(".weatherDetails").find("dl.clouds").find("dd.all").text(results.clouds.all);
	    	$(".weatherDetails").find("dl.clouds").find("dd.all").text(results.clouds.all);
	    	$(".weatherDetails").find("dl.root").find("dd.dt").text(results.dt);
	    	$(".weatherDetails").find("dl.root").find("dd.id").text(results.id)
	    	$(".weatherDetails").find("dl.root").find("dd.name").text(results.name)
	    	$(".weatherDetails").find("dl.root").find("dd.cod").text(results.cod)
	        console.log("Success!");
	    },
	    error: function(XMLHttpRequest, textStatus, errorThrown){
	        console.log("XMLHttpRequest: " + XMLHttpRequest);
	        console.log("textStatus: " + textStatus);
	        console.log("errorThrown: " + errorThrown);
	    }
	});	
	
	/*
	  
	 cargarDetalles(clientes[0]);

	for (var i=0; i < clientes.length; i++) {

		var li = $("<li/>");
		li.addClass("cliente");
		var anchor = $("<a/>", {
			href: "#",
			text: clientes[i].nombre
		});
		anchor.data("id", clientes[i].id);
		anchor.appendTo(li);
		li.appendTo("ul#clientes");
		$("ul#clientes").listview("refresh");
	}

	$("li.cliente").on("click", "a", function(){
		var id = $(this).data("id");
		console.log("id: " + id);
		for (var j=0; j < clientes.length; j++) {
			if (clientes[j].id == id) {
				console.log("id del array: " + clientes[j].id);
				cargarDetalles(clientes[j]);
				break;
			}
		}
		$.mobile.changePage("#pag2");
	});
	
	*/
});


function cargarDetalles(cliente)
{
	var detalles = $(".detallescliente");
	detalles.empty();
	detalles.data("id", cliente.id);
	var nombre = $("<div/>", {
		text: "Nombre: " + cliente.nombre
	});
	var edad = $("<div/>", {
		text: "Edad: " + cliente.edad
	});
	var sexo = $("<div/>", {
		text: "Sexo: " + devolverSexo(cliente.sexo)
	});

	nombre.appendTo(detalles);
	edad.appendTo(detalles);
	sexo.appendTo(detalles);
}

