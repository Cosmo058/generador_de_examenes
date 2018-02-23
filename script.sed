cat script.sed
/init(/ {
  r archivo_generador.cfg
  d
}
