/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */
import { stays } from "./stays";

const contenedorEstancias = document.querySelector("#contenedorEstancias")


//FUNCION QUE CREA LA TARJETA DE ESTANCIA y la inserta en el DOM
function insertarEstancia(elementoActual) {
    let estancia = elementoActual

    const { type, beds, rating, title } = estancia;

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

//FUNCION QUE CREA MUESTRA TODAS LAS ESTANCIAS POR DEFECTO  AL CARGAR LA PAGINA
//ESTA LLAMA A LA FUNCION:  insertarEstancia() QUE USA COMO PARAMETRO EL OBJETO ACTUAL DEL ARRAY stay[]

export function insertarTodasLasEstancias() {
    contenedorEstancias.innerHTML = ""

    stays.forEach((elementoActual) => {
        insertarEstancia(elementoActual)

    })
}

//insertarTodasLasEstancias()




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// creo un array que contenga las ciudades para poder filtrar Y CREO LA FUNCION QUE LOS INSERTE EN EL DOM, en el MODAL CIUDADES DINAMICO

// const cities = stays.map ((estancia) =>{

//     return {
//         "city":estancia.city,
//         "country":estancia.country
//     }

// })

// console.log(cities)
const ciudadesUnicas = stays.filter((valorActual, indiceActual, arregloCompleto) => {  //crea un nuevo array de objetos donde no se repite la ciudad, para mostrar como menu dinámico

    const primeraAparicion = arregloCompleto.findIndex(item => item.city === valorActual.city);

    // Si la posición es la misma que la primera aparición, es único
    return indiceActual === primeraAparicion;
});

//console.log(ciudadesUnicas)


export const ciudadesDinamico = document.querySelector("#ciudadesDinamico") //contenedor donde se muestra lista de ciudades para que el usuario escoja
function mostrarCiudades() {  //esta funcion muestra en menú o lalista de ciudades con estancias en Finlandia, sin repetir ciudad, itera el array ciudadesUnicas
    ciudadesDinamico.innerHTML = ""
    ciudadesUnicas.forEach((ciudadActual) => {

        ciudadesDinamico.innerHTML += `
        <div id="${ciudadActual.city}" class=" h-[40px] flex items-center gap-2 border-0 hover:bg-[#f4f4f4] hover:border-1 hover:border-gray-700 cursor-pointer">
          <img class="w-[25px] h-[25px] block" src="/imagenes/icon-location.svg" alt="icono posición">
          <span>${ciudadActual.city}, ${ciudadActual.country}</span>
        </div>
        
        `
    })

}
mostrarCiudades()

const contenedorBotonesActivaModal = document.querySelector("#contenedorBotonesActivaModal") //contenedor que al dar click muestra el modal de busqueda con id=modalFiltro
const botonXCierraModalFiltro = document.querySelector("#botonXCierraModalFiltro") //este boton muestra una X, al dar click cierra el modal de busqueda con id=modalFiltro
const modalFiltro = document.querySelector("#modalFiltro") //contenedor que contiene todo el modal de busqueda
const searchModal2 = document.querySelector("#searchModal2") // boton que esta en la parte inferior del modal, cierra el modal id=modalFiltro
const searchModal = document.querySelector("#searchModal") // boton que esta en la parte superior del modal, cierra el modal id=modalFiltro, no es visible en movil

contenedorBotonesActivaModal.addEventListener("click", function () { //muestra el modal para filtrar
    modalFiltro.classList.toggle("hidden")
})

botonXCierraModalFiltro.addEventListener("click", function () { // cierra el modal para filtrar
    modalFiltro.classList.toggle("hidden")
})

searchModal.addEventListener("click", function () { // cierra el modal para filtrar es el boton SEARCH
    modalFiltro.classList.toggle("hidden")
})

export const filtroCiudades = document.querySelector("#filtroCiudades") //input que recibe la ciudad y muestra con click el modal con id=ciudadesDinamico
export const filtroInvitados = document.querySelector("#filtroInvitados") //input que recibe el numero total de invitados y muestra con click el modal con id=modalInvitadosDinamico
const modalInvitadosDinamico = document.querySelector("#modalInvitadosDinamico")

filtroCiudades.addEventListener("focus", function () {
    ciudadesDinamico.classList.toggle("hidden")

})
// filtroCiudades.addEventListener("blur", function(){
//     ciudadesDinamico.classList.toggle("hidden")
// })

filtroInvitados.addEventListener("focus", function () {
    modalInvitadosDinamico.classList.toggle("hidden")
})

// filtroInvitados.addEventListener("blur", function(){
//     modalInvitadosDinamico.classList.("hidden")
// })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCION PARA FILTRAR POR CIUDAD Y MOSTRAR LAS ESTANCIAS EN EL DOM DENTRO DEL CONTENEDOR CON id=ciudadesDinamico
export function filtrarEstaciasPorCiudad(valorFiltroCiudad) {
    contenedorEstancias.innerHTML = ""

    stays.forEach((elementoActual) => {
        if (elementoActual.city === valorFiltroCiudad) {
            insertarEstancia(elementoActual)
        }
    })
}


//filtrarEstaciasPorCiudad()

// filtroCiudades.addEventListener("input", () =>{
//     let valor= filtroCiudades.value
//     filtrarEstaciasPorCiudad(valor)

// })

const menosAdults = document.querySelector("#menosAdults")
const masAdults = document.querySelector("#masAdults")
const menosChildren = document.querySelector("#menosChildren")
const masChildren = document.querySelector("#masChildren")
const numTotalAdultos = document.querySelector("#numTotalAdultos") //span: numero de adultos
const numTotalChildren = document.querySelector("#numTotalChildren") // span: numero de children
const btnAddGuests = document.querySelector("#btnAddGuests") // span de boton que muestra el modal de busqueda


// CAMBIA EL VALOR O CANTIDAD DE INVITADOS ADULTOS Y NIÑOS MEDIANTE LOS 4 BOTONES ////////////////////////////////////////////////////////////////////////////////////
menosAdults.addEventListener("click", () => { //DISMINUYE LA CANTIDAD DE ADULTOS SI SE DA CLICK EN EL BOTON -
    let numeroAdultos = 0
    let numCapturado = Number(numTotalAdultos.innerHTML) //captura el valor que hay en span
    numeroAdultos = numCapturado
    if (numCapturado > 0) {
        numeroAdultos--
    }
    numTotalAdultos.innerHTML = numeroAdultos

    let total = Number(numTotalAdultos.innerHTML) + Number(numTotalChildren.innerHTML)
    filtroInvitados.value = total

    console.log(`Número de invitados ${total}`)
    btnAddGuests.innerHTML = `${total} Guests`
    
    if(filtroCiudades.value!="" && total>0){
        filtrarEstanciasCityGuests(filtroCiudades.value, total)
    }else if(total>0){
        filtrarEstanciasPorInvitados(total)
    }   

})

masAdults.addEventListener("click", () => { //AUMENTA LA CANTIDAD DE ADULTOS SI SE DA CLICK EN EL BOTON +
    let numeroAdultos = 0
    let numCapturado = Number(numTotalAdultos.innerHTML) //captura el valor que hay en span
    numeroAdultos = numCapturado
    if (numCapturado <= 9) {
        numeroAdultos++
    }
    numTotalAdultos.innerHTML = numeroAdultos

    let total = Number(numTotalAdultos.innerHTML) + Number(numTotalChildren.innerHTML)
    filtroInvitados.value = total
    console.log(`Número de invitados ${total}`)
    btnAddGuests.innerHTML = `${total} Guests`

    if(filtroCiudades.value!="" && total>0){
        filtrarEstanciasCityGuests(filtroCiudades.value, total)
    }else if(total>0){
        filtrarEstanciasPorInvitados(total)
    }   

})

menosChildren.addEventListener("click", () => { //DISMINUYE LA CANTIDAD DE CHILDREN SI SE DA CLICK EN EL BOTON -
    let numeroChildren = 0
    let numCapturado = Number(numTotalChildren.innerHTML) //captura el valor que hay en span
    numeroChildren = numCapturado
    if (numCapturado > 0) {
        numeroChildren--
    }
    numTotalChildren.innerHTML = numeroChildren

    let total = Number(numTotalAdultos.innerHTML) + Number(numTotalChildren.innerHTML)
    filtroInvitados.value = total
    console.log(`Número de invitados ${total}`)
    btnAddGuests.innerHTML = `${total} Guests`

    if(filtroCiudades.value!="" && total>0){
        filtrarEstanciasCityGuests(filtroCiudades.value, total)
    }else if(total>0){
        filtrarEstanciasPorInvitados(total)
    }   

})

masChildren.addEventListener("click", () => { //AUMENTA LA CANTIDAD DE CHILDREN SI SE DA CLICK EN EL BOTON +
    let numeroChildren = 0
    let numCapturado = Number(numTotalChildren.innerHTML) //captura el valor que hay en span
    numeroChildren = numCapturado
    if (numCapturado <= 9) {
        numeroChildren++
    }
    numTotalChildren.innerHTML = numeroChildren

    let total = Number(numTotalAdultos.innerHTML) + Number(numTotalChildren.innerHTML)
    filtroInvitados.value = total
    console.log(`Número de invitados ${total}`)
    btnAddGuests.innerHTML = `${total} Guests`

    if(filtroCiudades.value!="" && total>0){
        filtrarEstanciasCityGuests(filtroCiudades.value, total)
    }else if(total>0){
        filtrarEstanciasPorInvitados(total)
    }    

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const btnAddLocation = document.querySelector("#btnAddLocation") //uno delos botones que muestra el modal de busqueda

ciudadesDinamico.addEventListener("click", (event) => {
    const divSeleccionado = event.target.closest("div[id]"); //guarda el div donde se dio click, la etiqueta completa

    if (divSeleccionado) {
        const nombreCiudad = divSeleccionado.id; //extrae el id, que es la ciudad unica y la guarda
        console.log("Ciudad seleccionada:", nombreCiudad);

        filtroCiudades.value = nombreCiudad

        ciudadesDinamico.classList.toggle("hidden")

        btnAddLocation.innerHTML = nombreCiudad

    }
})


export function filtrarEstanciasPorInvitados(valorFiltroInvitados) {
    contenedorEstancias.innerHTML = ""

    console.log(valorFiltroInvitados)
    console.log(typeof valorFiltroInvitados)

    stays.forEach((elementoActual) => {
        console.log(elementoActual.maxGuests)
        console.log(typeof elementoActual.maxGuests)
        if (elementoActual.maxGuests >= valorFiltroInvitados) {
            insertarEstancia(elementoActual)
        }
    })
}

//filtrarEstanciasPorInvitados()

export function filtrarEstanciasCityGuests(valorFiltroCiudad, valorFiltroInvitados) {

    console.log("ciudad:" + valorFiltroCiudad)
    console.log("invitados:" + valorFiltroInvitados)
    contenedorEstancias.innerHTML = ""

    stays.forEach((elementoActual) => {
        if (elementoActual.city === valorFiltroCiudad && (elementoActual.maxGuests >= valorFiltroInvitados && valorFiltroInvitados>0)) {
            insertarEstancia(elementoActual)
        }
    })

}

// window.addEventListener("DOMContentLoaded",() =>{
//     filtrarEstanciasCityGuests("Vaasa", 5)

// })


searchModal2.addEventListener("click", () => {
    modalFiltro.classList.toggle("hidden")
})








