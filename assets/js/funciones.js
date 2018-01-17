function centrar_tarjetas(){
  var margen_izq = 56;
  var ae_container_width = $("#ae_container").css('width').replace("px","");
  var b = (ae_container_width-(margen_izq*2))%218;
  var c = (b/2)+margen_izq;
  $("#ae_container").css("padding-left",c+"px");
  //console.log(c);
}

function igualar_altura_logos(){
  var altura_logo_castillo = $(".logo_castillo_container").css('height');
  $('.materia_section').css('height',altura_logo_castillo);

  //var altura_title = $("#texto").css('height');
  //$('#contador_a_preview').css('height',altura_title);
}

function mostrar_ancho(){
  var ancho_contenedor = $(".container").css('width');
  $('#title.col-md-10').html('<h3>Generador de ex&aacute;menes</h3><p>Aprendizajes esperados '+ancho_contenedor+'</p>');
}


function seleccionados_a_preview(){
  $("#lista_final").empty();

  $("#lista_final").html("<span id='instruccion_lista_final' class='instruccion' style='background-color:#EEE;border-radius:5px;'>Arrastrar cada pregunta para ordenarlas como desee.</span><br/><br/>");

  var idsReactivos = [];
  $("input:checked").each(function(){
    idsReactivos.push($(this).attr("id"));
  });

  for(var selected in idsReactivos){
    $("#reactivos .card2").each(function(){
      var $card_tmp = $(this).clone();

      if( $(this).attr("idAE")=== idsReactivos[selected].split("_")[0] && $(this).attr("idReactivo")=== idsReactivos[selected].split("_")[1] ){
        $("#lista_final").append($card_tmp.removeClass("collapsed"));
      }
    });
  }
}

function seleccionados_a_print(){
  $("#examen_html").empty();
  $("#examen_html").append("<a class='closebtn'>&times;</a>");
  $("#examen_html").append("<a class='printbtn'><img style='width:1em;' src='assets/img/icon/printer.svg'></a>");

  $(".closebtn").click(function(){
    $("#examen_html").css("padding","0px");
    $("#examen_html").css("height","0%");
  });

  $(".printbtn").click(function(){
    window.print();
  });


  $("#examen_html").append('<p id=\'preview_header\'>Nombre:________________________________________ Grupo:_______ Fecha:__________</p><br/>');

  var idsReactivos = [];
  var contador = 1;

  $("#lista_final input:checked").each(function(){
    idsReactivos.push($(this).attr("id"));
  });

  for(var selected in idsReactivos){
    $("#preview_reactivo div").each(function(){
      var $card_tmp = $(this).clone();

      if( $(this).attr("idAE")=== idsReactivos[selected].split("_")[0] && $(this).attr("idReactivo")=== idsReactivos[selected].split("_")[1] ){
        $card_tmp.removeClass("collapsed");

        $card_tmp.find(".respuesta_print").html( contador.toString()+". "+ $card_tmp.find(".respuesta_print").html() );
        contador++;
        $("#examen_html").append($card_tmp);
        $("#examen_html").append("<br/><br/>");
      }
    });
  }

  $("#examen_html").append("<br/><p>&copy; Todos los derechos reservados, Ediciones Castillo S.A. de C.V.</p>");

  //window.print();
}

function init(course_name,file_name){
  $(".nombre_asignatura").html(course_name);
  $.getJSON("assets/data/"+file_name, function(data){
    $.each(data,function(key,val){
      $.each(val,function(k,v){
        if(k==="nombreAE"){
          var texto_caratula = getValuesOf(val,"caratula")[0];
          var unidades_asociadas = getValuesOfArray(val,"unidadesAsociadas");
          //alert("Unidades asociadas: "+unidades_asociadas);

          if(v.toString().indexOf('@')!==-1){
            var max_largo = v.toString().indexOf('@');
            $("#ae_container").append("<div class='card' unidades_asociadas='"+unidades_asociadas+"' idAE="+key+"><div class='franja_tarjeta'></div><div class='card_content'><span>"+texto_caratula+"</span><br/><br/><span class='ocultar_texto'>Aprendizaje esperado: "+v.toString().substring(0,max_largo)+"...<desbordado class='collapsed'> "+v.toString().substring(max_largo)+"</desbordado>"+"</span></div></div>");
          }else{
            $("#ae_container").append("<div class='card' unidades_asociadas='"+unidades_asociadas+"' idAE="+key+"><div class='franja_tarjeta'></div><div class='card_content'><span>"+texto_caratula+"</span><br/><br/><span class='ocultar_texto'>Aprendizaje esperado: "+v+"</span></div></div>");
          }
        }

        var reactivos = [];

        if(typeof v === 'object' && k=== "reactivos"){ //∂
          reactivos = getValuesOf(v,"reactivo"); //Obtener la lista de reactivos del AE en cuestion[key,val]

          var tmp_html = "";
          for(var reactivo in v){
            tmp_html = "<div idAE="+key+" idReactivo="+reactivo+">";
            //Agregando preguntas al DOM...
            tmp_html += "<span class='respuesta_print collapsed' idAE="+key+" idReactivo="+reactivo+">"+reactivos[reactivo]+"<br/><br/></span>";

            if(v[reactivo]["img_asociada"]!=="" && v[reactivo]["img_asociada"]!==undefined){
              if(v[reactivo]["size"]!=="" && v[reactivo]["size"]!==undefined){
                tmp_html += "<span idAE="+key+" idReactivo="+reactivo+" class='collapsed'><img style='width:"+v[reactivo]["size"]+";' class='img_asociada' src='assets/"+v[reactivo]["img_asociada"]+"'><br/><br/></span>";
              }else{
                tmp_html += "<span idAE="+key+" idReactivo="+reactivo+" class='collapsed'><img class='img_asociada' src='assets/"+v[reactivo]["img_asociada"]+"'><br/><br/></span>";
              }
            }

            tmp_html+="<ol class='collapsed' idAE="+key+" idReactivo="+reactivo+">";
            //Agregando respuestas al DOM...
            for(var respuesta in v[reactivo]["respuestas"]){
              if( v[reactivo]["respuestas"][respuesta].toString().indexOf("@") !== -1 ){
              tmp_html+=" <li class='correct' idAE="+key+" idReactivo="+reactivo+" idRespuesta="+respuesta+">"+
                                              v[reactivo]["respuestas"][respuesta].toString().replace("@","")+
                                              "</li>";
              }else{
                tmp_html+=" <li idAE="+key+" idReactivo="+reactivo+" idRespuesta="+respuesta+">"+
                                              v[reactivo]["respuestas"][respuesta]+
                                              "</li>";
              }
            }
            tmp_html += "</ol></div>";
            $("#preview_reactivo").append(tmp_html);
          }

        }

        if(reactivos !== "")
          for(var i in reactivos){
            $("#reactivos").append("<div class='card2 collapsed' idAE="+key+" idReactivo="+i+">\
                                      <div class='franja_tarjeta'></div>\
                                      <div class='card_content'>\
                                        <div class='checkbox_div'>\
                                          <input type='checkbox' id='"+key+"_"+i+"'/>\
                                          <label for='"+key+"_"+i+"'></label>\
                                        </div>\
                                        <div class='pregunta_div'>\
                                          <span>"+reactivos[i]+"</span>\
                                        </div>\
                                      </div>\
                                    </div>");
          }
      });
    });
  });
}

function mostrar_preview_respuestas(opt){
  $(".pregunta_div").click(function(){
    var idAE = $(this).parent().parent().attr("idAE");
    var idReactivo = $(this).parent().parent().attr("idReactivo");0

    var idAE_previamente_seleccionado = $("#preview_reactivo span:not('.collapsed')").attr('idAE');
    var idReactivo_previamente_seleccionado = $("#preview_reactivo span:not('.collapsed')").attr('idReactivo');

    //alert("IDs previos: "+idAE_previamente_seleccionado+","+idReactivo_previamente_seleccionado);
    //alert("IDs clickeados: "+idAE+","+idReactivo);
    //alert(opt!=="no_toggle");

    if((opt!=="no_toggle" && idAE === idAE_previamente_seleccionado && idReactivo === idReactivo_previamente_seleccionado)||idAE_previamente_seleccionado == null){
      $("#reactivos").toggleClass("col-md-12 col-md-8");
      $("#preview_reactivo").toggleClass("collapsed col-md-4");

      if( $("#preview_reactivo").hasClass("collapsed") ){
        $("#preview_reactivo img").addClass("collapsed");
      }
    }

    $("#preview_reactivo span").each(function(){
      if( $(this).attr("idAE") === idAE && $(this).attr("idReactivo") === idReactivo ){
        $(this).removeClass("collapsed");
      }else{
        $(this).addClass("collapsed");
      }
    });

    $("#preview_reactivo ol").each(function(){
      if( $(this).attr("idAE") === idAE && $(this).attr("idReactivo") === idReactivo ){
        $(this).removeClass("collapsed");
      }else{
        $(this).addClass("collapsed");
      }
    });
  });
}

$.fn.toggleAttr = function(attr, attr1, attr2) {
  return this.each(function() {
    var self = $(this);
    if (self.attr(attr) == attr1)
      self.attr(attr, attr2);
    else
      self.attr(attr, attr1);
  });
};

function bind_filter_events(){
  $("#filtro_u1").click(function(){
    $("#ae_container .card").each(function(){
      if($(this).attr("unidades_asociadas").toString().indexOf("1")=="-1"){
        $(this).addClass("collapsed");
      }else{
        $(this).removeClass("collapsed");
      }
    });
    $(".filtro").css("color","#7C7C7C");
    $("#filtro_u1").css("color","#C83335");
  });

  $("#filtro_u2").click(function(){
    $("#ae_container .card").each(function(){
      if($(this).attr("unidades_asociadas").toString().indexOf("2")=="-1"){
        $(this).addClass("collapsed");
      }else{
        $(this).removeClass("collapsed");
      }
    });
    $(".filtro").css("color","#7C7C7C");
    $("#filtro_u2").css("color","#C83335");
  });

  $("#filtro_u3").click(function(){
    $("#ae_container .card").each(function(){
      if($(this).attr("unidades_asociadas").toString().indexOf("3")=="-1"){
        $(this).addClass("collapsed");
      }else{
        $(this).removeClass("collapsed");
      }
    });
    $(".filtro").css("color","#7C7C7C");
    $("#filtro_u3").css("color","#C83335");
  });

  $("#filtro_todos").click(function(){
    $("#ae_container .card").each(function(){
      $(this).removeClass("collapsed");
    });
    $(".filtro").css("color","#7C7C7C");
    $("#filtro_todos").css("color","#C83335");
  });
}
