
function primerMayusculas(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}


function retornarFecha(tipo){
  if(tipo === 1){
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var fecha = new Date().toLocaleDateString("es-VE",options);  
  return fecha;
  }
  else{
    var fecha = new Date().toLocaleTimeString("es-VE",{ hour12: true });  
  return fecha;
  }
  
  
}
function fecha(date){
  
  var options = { weekday: 'long', day: 'numeric' };
  var fecha = new Date(date).toLocaleDateString("es-VE",options);  
  return fecha;
  
  
  
}
function RetornarIcono(id){
   var prefix = 'wi wi-';
  var code = id;//resp.weather[0].id;
  var icon = icons[code].icon;

  
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }

 
  icon = prefix + icon;
  return icon;

}
function BuscarCiudad(text){
  var tipo = localStorage.getItem('tipo');

  var unit = "metric";
  if(tipo === "f")
    unit = "imperial";
  else
    unit = "metric";

  var param={
    q:text,
    lang:'es',
    units:unit,
    appid:'a11d6820ad8792dd1a807cc68e76bfe7'
  }
  $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      jsonp: 'callback',
      dataType: 'jsonp',
      cache: false,
      data:param,
      success: function (result) {
        var id = result.weather[0].id;
        var temp = Math.trunc(result.main.temp) + '°';
        var descripcion = primerMayusculas(result.weather[0].description);
        var humedad = result.main.humidity;
        var viento = result.wind.speed;
        var localizacion = result.name + ", " + result.sys.country;
        $('#descripcion').text(descripcion);
        $('#temperatura').text(temp);
        $('#viento').text(viento);
        $('#humedad').text(humedad);
        $('#localizacion').text(localizacion);
        if(tipo === 'f')
          $('#tipo').text("Fahrenheit");
        else
          $('#tipo').text("Celsius");
        var icon = RetornarIcono(id);
        $('#icon').addClass(icon);
        $('#bg').attr("src", icons[id].image);  
        localStorage.setItem('idCiudad',result.id);
        LeerDias(tipo,result.id);
      },
      error:function(e){
        alert('e1 '+ e.statusText);
      }
    });

}
function LeerDatos(tipo,idcity){
  
  localStorage.setItem('tipo',tipo);
  var unit = "metric";
  if(tipo === "f")
    unit = "imperial";
  else
    unit = "metric";
  $('#fecha').text(retornarFecha(1));
  $('#hora').text(retornarFecha(2));
  
  var param={
    id:idcity,
    lang:'es',
    units:unit,
    appid:'a11d6820ad8792dd1a807cc68e76bfe7'
  }

  $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      //url: "data:///data/data.js",
      jsonp: 'callback',
      dataType: 'jsonp',
      cache: false,
      data:param,
      success: function (result) {
        var id = result.weather[0].id;
        var temp = Math.trunc(result.main.temp) + '°';
        var descripcion = primerMayusculas(result.weather[0].description);
        var humedad = result.main.humidity;
        var viento = result.wind.speed;
        var localizacion = result.name + ", " + result.sys.country;
        $('#descripcion').text(descripcion);
        $('#temperatura').text(temp);
        $('#temp_max').text(temp);
        $('#temp_min').text(temp);
        $('#viento').text(viento);
        $('#humedad').text(humedad);
        $('#presion').text(result.main.pressure);
        $('#localizacion').text(localizacion);
        if(tipo === 'f'){
          $('#tipo').text("Fahrenheit");
          $('#temp_max').text(Math.trunc(result.main.temp_max) + '°F');
          $('#temp_min').text(Math.trunc(result.main.temp_min) + '°F');
        }
        else{
          $('#tipo').text("Celsius");
          $('#temp_max').text(Math.trunc(result.main.temp_max) + '°C');
          $('#temp_min').text(Math.trunc(result.main.temp_min) + '°C');
        }
        var icon = RetornarIcono(id);
        $('#icon').addClass(icon);
        $('#bg').attr("src", icons[id].image);  

        LeerDias(tipo,idcity);
      },
      error:function(e){
        alert('e1 '+ e.statusText);
      }
    });

}


function LeerDias(tipo,idcity){
  var unit = "metric";
  if(tipo === "f")
    unit = "imperial";
  else
    unit = "metric";
  //http://api.openweathermap.org/data/2.5/forecast/city?id=3645213&APPID=a11d6820ad8792dd1a807cc68e76bfe7
  var param={
    id:idcity,
    lang:'es',
    units:unit,
    appid:'a11d6820ad8792dd1a807cc68e76bfe7'
  }

  $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast/city',
      //url: 'data/data2.js',
      jsonp: 'callback',
      dataType: 'jsonp',
      cache: false,
      data:param,
      success: function (result) {
         
         if(tipo === 'f'){
          $('#temperatura1').text(Math.trunc(result.list[0].main.temp)+' °F');
          $('#tempmax1').text(Math.trunc(result.list[0].main.temp_max)+' °F');
          $('#tempmin1').text(Math.trunc(result.list[0].main.temp_min)+' °F');

          $('#temperatura2').text(Math.trunc(result.list[4].main.temp)+' °F');
          $('#tempmax2').text(Math.trunc(result.list[4].main.temp_max)+' °F');
          $('#tempmin2').text(Math.trunc(result.list[4].main.temp_min)+' °F');

          $('#temperatura3').text(Math.trunc(result.list[11].main.temp)+' °F');
          $('#tempmax3').text(Math.trunc(result.list[11].main.temp_max)+' °F');
          $('#tempmin3').text(Math.trunc(result.list[11].main.temp_min)+' °F');

          $('#temperatura4').text(Math.trunc(result.list[19].main.temp)+' °F');
          $('#tempmax4').text(Math.trunc(result.list[19].main.temp_max)+' °F');
          $('#tempmin4').text(Math.trunc(result.list[19].main.temp_min)+' °F');
         }
          
        else{

          $('#temperatura1').text(Math.trunc(result.list[0].main.temp)+' °C');
          $('#tempmax1').text(Math.trunc(result.list[0].main.temp_max)+' °C');
          $('#tempmin1').text(Math.trunc(result.list[0].main.temp_min)+' °C');

          $('#temperatura2').text(Math.trunc(result.list[4].main.temp)+' °C');
          $('#tempmax2').text(Math.trunc(result.list[4].main.temp_max)+' °C');
          $('#tempmin2').text(Math.trunc(result.list[4].main.temp_min)+' °C');

          $('#temperatura3').text(Math.trunc(result.list[11].main.temp)+' °C');
          $('#tempmax3').text(Math.trunc(result.list[11].main.temp_max)+' °C');
          $('#tempmin3').text(Math.trunc(result.list[11].main.temp_min)+' °C');

          $('#temperatura4').text(Math.trunc(result.list[19].main.temp)+' °C');
          $('#tempmax4').text(Math.trunc(result.list[19].main.temp_max)+' °C');
          $('#tempmin4').text(Math.trunc(result.list[19].main.temp_min)+' °C');

        }
        $('#fecha1').text(fecha(new Date(result.list[0].dt_txt)));     
        $('#desc1').text(result.list[0].weather[0].description);
        $('#viento1').text(result.list[0].wind.speed);
        $('#humedad1').text(result.list[0].main.humidity);
        
        var icon = RetornarIcono(result.list[0].weather[0].id);
        $('#icon1').addClass(icon);


        $('#fecha2').text(fecha(new Date(result.list[4].dt_txt)));     
        $('#desc2').text(result.list[4].weather[0].description);
        $('#viento2').text(result.list[4].wind.speed);
        $('#humedad2').text(result.list[4].main.humidity);
        $('#icon2').addClass(RetornarIcono(result.list[4].weather[0].id));

         $('#fecha3').text(fecha(new Date(result.list[11].dt_txt)));     
        $('#desc3').text(result.list[11].weather[0].description);
        $('#viento3').text(result.list[11].wind.speed);
        $('#humedad3').text(result.list[11].main.humidity);
        $('#icon3').addClass(RetornarIcono(result.list[11].weather[0].id));
        

         $('#fecha4').text(fecha(new Date(result.list[19].dt_txt)));     
        $('#desc4').text(result.list[19].weather[0].description);
        $('#viento4').text(result.list[19].wind.speed);
        $('#humedad4').text(result.list[19].main.humidity);
        $('#icon4').addClass(RetornarIcono(result.list[19].weather[0].id));
        
      },
      error:function(e){
        alert(e.statusText);
      }
    });

}

function Reloj(){
  $('#fecha').text(retornarFecha(1));
  $('#hora').text(retornarFecha(2));
  $("#fechaN2").text(retornarFecha(1) + ' ' +retornarFecha(2));
  setTimeout("Reloj()",1000) 
}


$(document).ready(function() {
  localStorage.setItem('idCiudad',3645213);
  LeerDatos('c',localStorage.getItem('idCiudad'));
  Reloj();
  
});

