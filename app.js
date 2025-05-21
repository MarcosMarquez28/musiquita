const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const iconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');

// const canciones = [
//     {
//         titulo: 'Future',
//         nombre: 'Anno Domini',
//         fuente: 'music/Future - Anno Domini Beats.mp3'
//     },

//     {
//         titulo: 'Invisible',
//         nombre: 'Anno Domini',
//         fuente: 'music/Invisible - Anno Domini Beats.mp3'
//     },

//     {
//         titulo: 'Kick It',
//         nombre: 'Yung',
//         fuente: 'music/Kick It - Yung Logos.mp3'
//     },

//     {
//         titulo: 'Motherland',
//         nombre: 'Ryan Stasik, Kanika Moore',
//         fuente: 'music/Motherland - Ryan Stasik, Kanika Moore.mp3'
//     },


//     {
//         titulo: 'Swing Haven 4',
//         nombre: 'Tulsa - Reed Mathis',
//         fuente: 'music/Swing Haven 4 - Tulsa - Reed Mathis.mp3'
//     },

// ];

axios.get('https://api.institutoalfa.org/api/songs')
  .then(function (response) {
    const canciones = response.data.songs
    let indiceCancionesActual = 0;
    
    function actualizarInfoCancion() {
        tituloCancion.textContent = canciones[indiceCancionesActual].title;
        nombreArtista.textContent = canciones[indiceCancionesActual].author;
        // cancion.src = canciones[indiceCancionesActual].audio.url;
        cancion.setAttribute('src', canciones[indiceCancionesActual].audio.url)
        // cancion.addEventListener('loadeddata', function () { });
    };
    
    botonReproducirPausar.addEventListener('click', reproducirPausar);
    
    function reproducirPausar() {
        
        if(cancion.paused){
            reproducirCancion();
           
        } else {
            pausarCancion();
            
        }
    };
    
    reproducirCancion()
    
    function reproducirCancion() {
        cancion.play();
    }
    
    function pausarCancion() {
        cancion.pause();
    }
    
    cancion.addEventListener('timeupdate', function(){
        if(!cancion.paused){
            progreso.value = cancion.currentTime;
        }
    });
    
    progreso.addEventListener('input', function(){
        cancion.currentTime = progreso.value;
    })
    
    progreso.addEventListener('change', function(){
       reproducirCancion();
    })
    
    botonAdelante.addEventListener('click', ()=>{
        indiceCancionesActual = (indiceCancionesActual + 1) % canciones.length;
        actualizarInfoCancion();
        reproducirCancion()
    });
    
    botonAtras.addEventListener('click', ()=>{
        indiceCancionesActual = (indiceCancionesActual - 1 + canciones.length) % canciones.length;
        actualizarInfoCancion();
        reproducirCancion()
    });
    
    actualizarInfoCancion();
  })
