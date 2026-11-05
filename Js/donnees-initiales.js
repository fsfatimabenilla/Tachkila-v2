import { validateDate,validateAdv, validateHeure,validateLieu,validateLieumatch } from "./validation.js";

 const modale = document.querySelector("#modale");
 const ouvrirBtn = document.querySelector("#ouvrir");
 const fermerBtn = document.querySelector("#fermer");
 const annulerBtn = document.querySelector("#annuler");
 const formulaire = document.querySelector("#formulaire");
 const ajoutBtn = document.querySelector("#ajouter");
 
const containir = document.querySelector(".match-containir");
export const adv = document.querySelector("#Adversaire");
export const date = document.querySelector("#date");
export const heure = document.querySelector("#heure");
export const lieu = document.querySelector("#lieu");
export const lieuMatch = document.querySelector("#check");

export const messageAdv = document.querySelector("#valide");
export const messageDate = document.querySelector("#valide-date");
export const messageHeure  = document.querySelector("#valide-heure");
export const messageLieu = document.querySelector("#valide-lieu");
export const messageLM  = document.querySelector("#valide-check");
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

export function gesModal(){
    ouvrirBtn.addEventListener("click",ouvrirModale);
    fermerBtn.addEventListener("click",fermerModale);
    annulerBtn.addEventListener("click",(event)=>{
        event.preventDefault();
        fermerModale();
    });
}

 export function ajoutMatch(event){
    event.preventDefault();
    const vaAdvd = validateAdv();
    const vaDate = validateDate();
    const vaHeure = validateHeure();
    const vaLieu = validateLieu();
    const vaLm = validateLieumatch();
    if(!vaAdvd ||
        !vaDate ||
        !vaHeure ||
        !vaLieu ||
        !vaLm
    ) return ;

    const carte = document.createElement("div");
      carte.className ="border rounded-xl bg-slate-700 w-full p-3 flex gap-3 justify-between "; 

      const infoMT = document.createElement("div");
      infoMT.className = "flex flex-col gap-3 flex-1";
       const adversaire = document.createElement("h3");
      adversaire.className = "text-sky-300 text-xl font-bold";
    adversaire.textContent = adv.value;
    const lieuM = document.createElement("p");
      lieuM.className = "text-white text-sm";
    lieuM.textContent = lieu.value;
    const lieuMT = document.createElement("p");
      lieuMT.className = "text-white text-sm";
    const choixLieu = lieuMatch.querySelector(
    'input[name="lieu-match"]:checked'
);
lieuMT.textContent = choixLieu.value;
    infoMT.append(adversaire,lieuM,lieuMT)

      const carteTime = document.createElement("div");
      carteTime.className = "border rounded-lg bg-slate-950 p-4 flex flex-col items-center justify-center gap-2";
    const dateM = document.createElement("p");
    dateM.className = "text-white text-lg";
    dateM.textContent = date.value;
    const heureM = document.createElement("p");
      heureM.className = "text-sky-300 text-lg";
    heureM.textContent = heure.value;
    carteTime.append(dateM,heureM);

    const btnModifier = document.createElement("button");
    btnModifier.type = "button";
    btnModifier.textContent = "✏️";
    btnModifier.className = "modifier";
    
    const btnSupprimer = document.createElement("button");
    btnSupprimer.type = "button";
    btnSupprimer.textContent = "🗑️";
    btnSupprimer.className = "supprimer";
    btnSupprimer.setAttribute("aria-label", "Supprimer");
    
    carte.append(
       carteTime,infoMT,btnModifier,btnSupprimer
    );
    containir.append(carte);
    fermerModale();
}
 export function ajoutmatchInit(){
     ajoutBtn.addEventListener("click",ajoutMatch);
}

