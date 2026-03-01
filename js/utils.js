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