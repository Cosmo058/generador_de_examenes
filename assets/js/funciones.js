function centrar_tarjetas(){
  var a = $("#preguntas_container").css('width').replace("px","");
  var b = (a-40)%218;
  var c = (b/2)+20;
  $("#preguntas_container").css("padding-left",c+"px");
}


function igualar_altura_logos(){
  var altura_logo_castillo = $("#logo_castillo_container").css('height');
  $('#materia_section').css('height',altura_logo_castillo);
}
