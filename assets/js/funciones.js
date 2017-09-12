function centrar_tarjetas(){
  var a = $("#preguntas_container").css('width').replace("px","");
  var b = (a-40)%211;
  var c = (b/2)+20;
  $("#preguntas_container").css("padding-left",c+"px");
}
