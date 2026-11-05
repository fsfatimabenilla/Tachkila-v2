
const modale = document.querySelector("#modale");
const ouvrirBtn = document.querySelector("#ouvrir");
const fermerBtn = document.querySelector("#fermer");
const annulerBtn = document.querySelector("#annuler");
const formulaire = document.querySelector("#formulaire");

export const ajoutBtn = document.querySelector("#ajouter");
export const containir = document.querySelector(".match-containir");

export const adv = document.querySelector("#Adversaire");
export const date = document.querySelector("#date");
export const heure = document.querySelector("#heure");
export const lieu = document.querySelector("#lieu");
export const lieuMatch = document.querySelector("#check");

export const messageAdv = document.querySelector("#valide");
export const messageDate = document.querySelector("#valide-date");
export const messageHeure = document.querySelector("#valide-heure");
export const messageLieu = document.querySelector("#valide-lieu");
export const messageLM = document.querySelector("#valide-check");

export function ouvrirModale() {
    formulaire.reset();
    messageLM.textContent = "";
    messageLieu.textContent = "";
    messageHeure.textContent = "";
    messageDate.textContent = "";

    modale.classList.remove("hidden");
    modale.classList.add("flex");
}

export function fermerModale() {
    modale.classList.add("hidden");
    modale.classList.remove("flex");

    formulaire.reset();
    messageLM.textContent = "";
    messageLieu.textContent = "";
    messageHeure.textContent = "";
    messageDate.textContent = "";
}

export function gesModal() {
    ouvrirBtn.addEventListener("click", ouvrirModale);
    fermerBtn.addEventListener("click", fermerModale);

    annulerBtn.addEventListener("click", (event) => {
        event.preventDefault();
        fermerModale();
    });
}

export let match = [];

export function ajouterMatch(ball) {
    match.push(ball);
}

export function supprimerMatch(ball) {
    const index = match.indexOf(ball);

    if (index !== -1) {
        match.splice(index, 1);
    }
}
