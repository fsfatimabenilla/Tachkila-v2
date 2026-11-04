 const modale = document.querySelector("#modale");
 const ouvrirBtn = document.querySelector("#ouvrir");
 const fermerBtn = document.querySelector("#fermer");
 const annulerBtn = document.querySelector("#annuler");
 const formulaire = document.querySelector("#formulaire");

export const adv = document.querySelector("#Adversaire");
export const date = document.querySelector("date");
export const heure = document.querySelector("#heure");
export const lieu = document.querySelector("#lieu");

 export const messageAdv = document.querySelector("#valide");

 export function ouvrirModale() {
    modale.classList.remove("hidden");
    modale.classList.add("flex");
}

export function fermerModale() {
    modale.classList.add("hidden");
    modale.classList.remove("flex");
    
    formulaire.reset();
}

export function gesModal(){
    ouvrirBtn.addEventListener("click",ouvrirModale);
    fermerBtn.addEventListener("click",fermerModale);
    annulerBtn.addEventListener("click",(event)=>{
        event.preventDefault();
        fermerModale();
    });
}

 
 