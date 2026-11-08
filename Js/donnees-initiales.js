
const modale = document.querySelector("#modale");
const ouvrirBtn = document.querySelector("#ouvrir");
const fermerBtn = document.querySelector("#fermer");
const annulerBtn = document.querySelector("#annuler");
const formulaire = document.querySelector("#formulaire");
const titreModal = document.querySelector("#titre-modale");

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

export const rechercheInput = document.querySelector("#recherche");

const modaleScore  = document.querySelector("#modale-score");
export const formulaireSc = document.querySelector("#form-score");
export const scoreEquipe = document.querySelector("#sc-equipe");
export const scoreAdv = document.querySelector("#sc-adv");
export const fermerScore = document.querySelector("#fermer-score");
export const annulerScore = document.querySelector("#annuler-sc");
export const messageScore = document.querySelector("#mssg-sc");

export let score = null;


export function ouvrirModale() {
    formulaire.reset();
    ajoutBtn.textContent = "Ajouter";
    titreModal.textContent = "Ajouter un Match";
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
    ajoutBtn.textContent = "Ajouter";
    titreModal.textContent = "Ajouter un Match";
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

export function setMatch(nv) {
    match = nv;
}

export function ouvrirModaleUpdate() {
    ajoutBtn.textContent = "Modifier";
    titreModal.textContent = "Modifier un Match";
    modale.classList.remove("hidden");
    modale.classList.add("flex");
}



export function ouvrirModaleScore(ball) {
    score = ball;
    formulaireSc.reset();
    // ajoutBtn.textContent = "Ajouter";
    // titreModal.textContent = "Ajouter un Match";
    messageScore.textContent = "";

    modaleScore.classList.remove("hidden");
    modaleScore.classList.add("flex");
}

export function fermerModaleScore() {
    modaleScore.classList.add("hidden");
    modaleScore.classList.remove("flex");

    formulaireSc.reset();
    // ajoutBtn.textContent = "Ajouter";
    // titreModal.textContent = "Ajouter un Match";
   messageScore.textContent = "";
   score = null;
}
fermerScore.addEventListener("click",fermerModaleScore);
annulerScore.addEventListener("click",fermerModaleScore);