/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */
import { stays } from "./stays";

const contenedorEstancias=document.querySelector ("#contenedorEstancias")

function insertarEstancia (elementoActual){
    let estancia =elementoActual

    const {type, beds, rating, title} = estancia;

    contenedorEstancias.innerHTML += `

    <div class="flex flex-col gap-2" >  
    <div><img class="rounded-3xl w-[345px] h-[235px]" src="${estancia.photo}" alt="foto estancia"></div>
        <div class="flex justify-between px-2">
            <div class="text-xs">${type} . ${beds} beds</div>
            <div class="flex text-xs gap-2"><img class="w-[16px] h-[16px]" src="/imagenes/star.svg" alt="estrella"> ${rating}</div>
        </div>
    <p class="text-[13px] font-medium">${title}</p> 
    </div>  
    
    `  
}



function insertarTodasLasEstancias(){
    contenedorEstancias.innerHTML= ""

    stays.forEach((elementoActual) =>{
        insertarEstancia(elementoActual)

    })
}
insertarTodasLasEstancias()


function filtrarEstaciasPorCiudad(){
    contenedorEstancias.innerHTML= ""

    stays.forEach((elementoActual) =>{
        if(elementoActual.city=== "Turku"){
            insertarEstancia(elementoActual)
        }
    })
}
filtrarEstaciasPorCiudad()

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// creo un array que contenga las ciudades para poder filtrar Y CREO LA FUNCION QUE LOS INSERTE EN EL DOM, en el MODAL CIUDADES DINAMICO

const cities = stays.map ((estancia) =>{
   
    return {
        "city":estancia.city,
        "country":estancia.country
    }

})

//console.log(cities)

const ciudadesDinamico = document.querySelector ("#ciudadesDinamico")
function mostrarCiudades (){
    ciudadesDinamico.innerHTML=""
    cities.forEach((ciudadActual) =>{

        ciudadesDinamico.innerHTML += `
        <div class=" h-[40px] flex items-center gap-2 border-0 hover:bg-[#f4f4f4] hover:border-1 hover:border-gray-700 cursor-pointer">
          <img class="w-[25px] h-[25px] block" src="/imagenes/icon-location.svg" alt="icono posición">
          <span>${ciudadActual.city}, ${ciudadActual.country}</span>
        </div>
        
        `
    })

}
mostrarCiudades()