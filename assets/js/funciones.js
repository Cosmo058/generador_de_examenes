function centrar_tarjetas(){
  var a = $("#ae_container").css('width').replace("px","");
  var b = (a-40)%218;
  var c = (b/2)+20;
  $("#ae_container").css("padding-left",c+"px");
}

function igualar_altura_logos(){
  var altura_logo_castillo = $("#logo_castillo_container").css('height');
  $('#materia_section').css('height',altura_logo_castillo);
  
  //var altura_title = $("#texto").css('height');
  //$('#contador_a_preview').css('height',altura_title);
}

function mostrar_ancho(){
  var ancho_contenedor = $(".container").css('width');
  $('#title.col-md-10').html('<h3>Generador de ex&aacute;menes</h3><p>Aprendizajes esperados '+ancho_contenedor+'</p>');
}


function seleccionados_a_preview(){
  $("#lista_final").empty();
  
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

function init(){
  $.getJSON("assets/data/data.json", function(data){
    $.each(data,function(key,val){
      $.each(val,function(k,v){
        if(k==="nombreAE"){
          $("#ae_container").append("<div class='card' idAE="+key+"><div class='franja_tarjeta'></div><div class='card_content'><span>"+v+"</span></div></div>");
        }

        var reactivos = [];

        if(typeof v === 'object' && k=== "reactivos"){ //∂
          reactivos = getValuesOf(v,"reactivo"); //Obtener la lista de reactivos del AE en cuestion[key,val]

          var tmp_html = "";
          for(var reactivo in v){
            tmp_html = "<div idAE="+key+" idReactivo="+reactivo+">";
            //Agregando preguntas al DOM...
            tmp_html += "<span class='collapsed' idAE="+key+" idReactivo="+reactivo+">"+reactivos[reactivo]+"<br/><br/></span>";

            //Agregando respuestas al DOM...
            for(var respuesta in v[reactivo]["respuestas"]){
              //alert("AE"+key+"_"+reactivo+"_"+respuesta+": "+v[reactivo]["respuestas"][respuesta]); //Obtener el listado de respuestas del AE
              tmp_html+=" <span class='collapsed' idAE="+key+" idReactivo="+reactivo+" idRespuesta="+respuesta+">"+
                                                respuesta+": "+v[reactivo]["respuestas"][respuesta]+
                                              "<br\></span>";
            }
            tmp_html += "</div>";
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
    
    if(opt!=="no_toggle"){
      $("#reactivos").toggleClass("col-md-12 col-md-8");
      $("#preview_reactivo").toggleClass("collapsed col-md-4");
    }

    var idAE = $(this).parent().parent().attr("idAE");
    var idReactivo = $(this).parent().parent().attr("idReactivo");

    $("#preview_reactivo span").each(function(){
      if( $(this).attr("idAE") === idAE && $(this).attr("idReactivo") === idReactivo ){
        $(this).removeClass("collapsed");
      }else{
        $(this).addClass("collapsed");
      }
    });
  });
}