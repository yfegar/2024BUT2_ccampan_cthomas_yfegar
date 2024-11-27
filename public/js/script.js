let titre = document.getElementById("locfit_titre");
let nav = document.querySelectorAll(".nav_lien");


let currentLocation = window.location.href

if(currentLocation == 'http://localhost:3000/index' || currentLocation == 'http://localhost:3000/indexadmin'|| currentLocation == 'http://localhost:3000/apropos' || currentLocation == 'http://localhost:3000/inscription' || currentLocation == 'http://localhost:3000/connexion' ) {
    titre.classList.toggle("white");
    
    for (let i = 0; i < nav.length; ++i) {
        nav[i].classList.add('white');
     }
}

//Souligner la page actuelle dans le menu
const currentPage = window.location.pathname;

// Récupérer tous les liens du menu
const menuLinks = document.querySelectorAll('nav ul li a');

// Parcourir chaque lien et comparer avec l'URL
menuLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

//ajouter les bontons à la page indexadmin

console.log(window.location.href);