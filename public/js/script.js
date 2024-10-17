let titre = document.getElementById("locfit_titre");
let nav = document.querySelectorAll(".nav_lien");


let currentLocation = window.location.href

if(currentLocation == 'http://localhost:3000/' || currentLocation == 'http://localhost:3000/apropos' || currentLocation == 'http://localhost:3000/inscription' || currentLocation == 'http://localhost:3000/connexion' ) {
    titre.classList.toggle("white");
    
    for (let i = 0; i < nav.length; ++i) {
        nav[i].classList.add('white');
     }
}

console.log(window.location.href);