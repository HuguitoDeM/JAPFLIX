const url =  "https://japceibal.github.io/japflix_api/movies-data.json";

let peliculas = []
let pelicula = null;

addEventListener("DOMContentLoaded", () => {
    let boton = document.getElementById("btnBuscar")
    let input = document.getElementById("inputBuscar")
 
    fetch(url)
        .then(res => res.json())
        .then(res => peliculas = res)

    boton.addEventListener("click", ()=> {
        //console.log(peliculas);
        let filtradas = filtrar(input.value);
        //console.log(filtradas);
        MostrarData(filtradas);
    })

    /*input.addEventListener("input", ()=>{
        
    })*/
    

});

function MostrarData(dataArray) {
    const lista =  document.getElementById("lista");
    lista.innerHTML = "";
   
    /*
    var str = "äöüÄÖÜçéèñ";
var b64 = window.btoa(unescape(encodeURIComponent(str)))
console.log(b64);

var str2 = decodeURIComponent(escape(window.atob(b64)));
console.log(str2);
    */

    for (const item of dataArray) {
        lista.innerHTML += `
            <div class="card mb-3 bg-dark text-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" onclick="pelicula=JSON.parse(decodeURIComponent(escape(atob('${btoa(unescape(encodeURIComponent(JSON.stringify(item))))}')))); dropdown(pelicula) ">
                <div class="card-body">
                    <div class="d-flex">
                        <div class="w-100">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h6 class="fw-bold mb-0">${item.title}</h6>
                                    <p class="mb-0">${estrellas(item.vote_average)} </p>
                                </div>
                                <p class="mb-0 fw-lighter fst-italic">${item.tagline}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        `
    }
    if(dataArray.length==0) {
        lista.innerHTML = "Ninguna pelicula coincide con el criterio de busqueda"
    }
}

function estrellas(score) {
    let estrella = ``
    score /= 2;
    for (let i = 0; i < 5; i++) {
        if (i < score) {
            estrella += `<i class="fa fa-star checked"></i>`
        } else {
            estrella += `<i class="fa fa-star"></i>`
        }
    }
    return estrella;
}

function filtrar(texto) {
    texto = texto.toLowerCase();
    return peliculas.filter(p=> {
        return p.title.toLowerCase().includes(texto) ||
        p.overview.toLowerCase().includes(texto) ||
        p.tagline.toLowerCase().includes(texto) ||
        p.genres.find(g=>g.name.toLowerCase()==texto)
    })
}


function dropdown(pelicula) {
    let generos = ""
    pelicula.genres.forEach(e => generos += " - "  + e.name )
    let contenedor_superior = document.getElementById("barra_superior")
    contenedor_superior.innerHTML= `
    <div class="cuerpo">
    <h3 class="offcanvas-title" id="offcanvasExampleLabel">${pelicula.title}</h3>
  
      <div class="offcanvas-body">
        <div id="overview">
          <p>${pelicula.overview}</p>
        </div>
        <hr />
        <div class="mt-3">
          <span>
            ${generos}
          </span>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-secondary me-md-2 dropdown-toggle" data-bs-toggle="dropdown" data-bs-target="#menu">
            Ver más
          </button>
          <ul class="dropdown-menu" id="menu">
            <li>Año de lanzamiento: ${pelicula.release_date.substring(0,4)}</li>
            <li>Duración: ${pelicula.runtime} mins</li>
            <li>Presupuesto: $${pelicula.budget}</li>
            <li>Ganancias obtenidas: $${pelicula.revenue}</li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}