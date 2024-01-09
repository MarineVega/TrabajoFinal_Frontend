// elementos del HTML
let divPersonajes = document.getElementById('personajes');
let divTotalPersonajes = document.getElementById('totalPersonajes');

    // botones del filtro
let botonFiltroTodo = document.getElementById('filtroTodo');
let botonFiltroMujer = document.getElementById('filtroMujer');
let botonFiltroHombre = document.getElementById('filtroHombre');
let botonFiltroNeutro = document.getElementById('filtroNeutro');
let botonFiltroDesconocido = document.getElementById('filtroDesconocido');

    // bptones de paginadp
let botonPrimeraPagina = document.getElementById('primeraPagina');
let botonAnterioPagina = document.getElementById('anteriorPagina');
let botonSiguientePagina = document.getElementById('siguientePagina');
let botonUltimaPagina = document.getElementById('ultimaPagina');

let totalPersonajes;
let paginaActual = 1;

// Función para mostrar los personajes en el html
function mostraEnHtml (arrPersonajes) { 
    divTotalPersonajes.innerHTML = `<div>
                                        Total de personajes: ${arrPersonajes.length} 
                                    </div>`

    // limpio lo que tenía el div de personajes
    divPersonajes.innerHTML = '';   
    arrPersonajes.forEach((itemPersonaje) => {
        divPersonajes.innerHTML +=  `<div class="personaje">
                                        <h3>${itemPersonaje.name}</h3>
                                        <img src=${itemPersonaje.image}>
                                        <p>Género: ${itemPersonaje.gender}</p>
                                        <p>Especie: ${itemPersonaje.species}</p>
                                        <p>Estado: ${itemPersonaje.status}</p>
                                        <p>Origen: ${itemPersonaje.origin.name}</p>
                                        <p>Locación: ${itemPersonaje.location.name}</p>
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
function filtroTodo () {    
    mostraEnHtml(totalPersonajes)
};

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

function filtroNeutro () {
    let neutros = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='Genderless';
    });
    mostraEnHtml(neutros)
};

function filtroDesconocido () {
    let desconocidos = totalPersonajes.filter((itemPersonaje)=>{
        return itemPersonaje.gender==='unknown';
    });
    mostraEnHtml(desconocidos)
};


// Crear evento
// elementoHTML.addEventListener('tipo de evento', función que se ejecuta cuando se da el evento)
botonFiltroTodo.addEventListener('click',filtroTodo)
botonFiltroMujer.addEventListener('click',filtroMujer)
botonFiltroHombre.addEventListener('click',filtroHombre)
botonFiltroNeutro.addEventListener('click',filtroNeutro)
botonFiltroDesconocido.addEventListener('click',filtroDesconocido)

function controlPaginado (pagina) {
    // agregar los controles de todas las situaciones

    if(pagina===1){
        botonPrimeraPagina.disabled=true;
        botonPrimeraPagina.className="disable";
        botonAnterioPagina.disabled=true;       
        botonAnterioPagina.className="disable";
        botonSiguientePagina.disabled=false;
        botonSiguientePagina.classList.remove("disable");
        botonUltimaPagina.disabled=false;
        botonUltimaPagina.classList.remove("disable");
    } else {
        if(paginaActual===42){            
            botonPrimeraPagina.disabled=false;
            botonPrimeraPagina.classList.remove("disable");
            botonAnterioPagina.disabled=false;
            botonAnterioPagina.classList.remove("disable");
            botonSiguientePagina.disabled=true;
            botonSiguientePagina.className="disable";
            botonUltimaPagina.disabled=true;
            botonUltimaPagina.className="disable";
        } else {
            botonPrimeraPagina.disabled=false;
            botonPrimeraPagina.classList.remove("disable");
            botonAnterioPagina.disabled=false;
            botonAnterioPagina.classList.remove("disable");
            botonSiguientePagina.disabled=false;
            botonSiguientePagina.classList.remove("disable");
            botonUltimaPagina.disabled=false;
            botonUltimaPagina.classList.remove("disable");
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
