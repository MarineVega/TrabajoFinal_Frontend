// elementos del HTML
let divPersonajes = document.getElementById('personajes');
    // botones del filtro
let botonFiltroTodo = document.getElementById('filtroTodo');
let botonFiltroMujer = document.getElementById('filtroMujer');
let botonFiltroHombre = document.getElementById('filtroHombre');
    // bptones de paginadp
let botonPrimeraPagina = document.getElementById('primeraPagina');
let botonAnterioPagina = document.getElementById('anteriorPagina');
let botonSiguientePagina = document.getElementById('siguientePagina');
let botonUltimaPagina = document.getElementById('ultimaPagina');

let totalPersonajes;
let paginaActual = 1;

// Función para mostrar los personajes en el html
function mostraEnHtml (arrPersonajes) { 
    // limpio lo que tenía el div de personajes
    divPersonajes.innerHTML = '';   
    arrPersonajes.forEach((itemPersonaje) => {
        divPersonajes.innerHTML +=  `<div class="personaje">
                                        <h3>Nombre: ${itemPersonaje.name}</h3>
                                        <p>Género: ${itemPersonaje.gender}</p>
                                        <img src=${itemPersonaje.image}>
                                    </div>`
    })
}

function pedidoFetch (pagina) {
    // pedido de info con fetch
    fetch('https://rickandmortyapi.com/api/character/?page='+pagina)
    .then((data)=>{
        return data.json();
    }).then((data)=>{
        //let personajes = data.results;
        totalPersonajes = data.results;
        // personajes es un array de objetos
        mostraEnHtml(totalPersonajes);
    })
};

// Para que se cargue por primera vez la página
pedidoFetch(paginaActual);
controlPaginado(paginaActual);

// Eventos
// 1- Nos traemos el elemento HTML que queremos agregarle el evento
// 2- Crear una función que se ejecute cuando se realice el evento
// 3- Creamos el evento, conectando todo

// Funciones para el filtro
//('Female', 'Male', 'Genderless' or 'unknown')
function filtroMujer () {
    let mujeres = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Female';
    });
    mostraEnHtml(mujeres)
};

function filtroHombre () {
    let hombres = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Male';
    });
    mostraEnHtml(hombres)
};

function filtroTodo () {    
    mostraEnHtml(totalPersonajes)
};

// Crear evento
// elementoHTML.addEventListener('tipo de evento', función que se ejecuta cuando se da el evento)
botonFiltroMujer.addEventListener('click',filtroMujer)
botonFiltroHombre.addEventListener('click',filtroHombre)
botonFiltroTodo.addEventListener('click',filtroTodo)

function controlPaginado (pagina) {
    // agregar los controles de todas las situaciones

    if(pagina===1){
        botonPrimeraPagina.disabled=true;
        botonAnterioPagina.disabled=true;
        botonSiguientePagina.disabled=false;
        botonUltimaPagina.disabled=false;
    } else {
        if(paginaActual===42){            
            botonPrimeraPagina.disabled=false;
            botonAnterioPagina.disabled=false;
            botonSiguientePagina.disabled=true;
            botonUltimaPagina.disabled=true;

        } else {
            botonPrimeraPagina.disabled=false;
            botonAnterioPagina.disabled=false;
            botonAnterioPagina.disabled=false;
            botonPrimeraPagina.disabled=false;    
        }
    }
};


// Paginado
function siguientePagina () {    
    // sumamos 1 a la variable
    paginaActual++;
    controlPaginado (paginaActual);
    pedidoFetch(paginaActual);
};

function anteriorPagina () {
    paginaActual--;
    controlPaginado (paginaActual);
    pedidoFetch(paginaActual);
};

function primeraPagina () {
    paginaActual=1;
    controlPaginado (paginaActual);
    pedidoFetch(paginaActual);
};

// hay 42 páginas
function ultimaPagina () {
    paginaActual=42;
    controlPaginado (paginaActual);
    pedidoFetch(paginaActual);
};

botonSiguientePagina.addEventListener('click',siguientePagina);
botonAnterioPagina.addEventListener('click',anteriorPagina);
botonPrimeraPagina.addEventListener('click',primeraPagina);
botonUltimaPagina.addEventListener('click',ultimaPagina);
