
import { insertarTodasLasEstancias } from "./utils";
import { filtrarEstaciasPorCiudad } from "./utils";
import { filtrarEstanciasPorInvitados } from "./utils";
import { filtroCiudades } from "./utils"; // input ciudad
import { filtroInvitados } from "./utils"; // input invitados
import { ciudadesDinamico } from "./utils";

insertarTodasLasEstancias() //inserta todas las estancias en el contenedor en el DOM

ciudadesDinamico.addEventListener ("click",() =>{ //filtra las estancias por ciudad
    filtrarEstaciasPorCiudad(filtroCiudades.value)
})


    


