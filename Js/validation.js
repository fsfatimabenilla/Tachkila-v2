import {
  nomInput,
  posteContainer,
  numeroInput,
  ageInput,
  messageNom,
  messageNumero,
  messagePoste,
  messageAge,
  joueurs,
  joueurAModifier,
  message
} from "./interface.js";

import {messageAdv , 
  adv ,
  date,
  heure,
  lieu,
  lieuMatch,
  messageDate,
  messageHeure,
  messageLM,
  messageLieu
}
from "./donnees-initiales.js"

// Validation du nom

const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,30}$/;

export function validateNom() {
  const nom = nomInput.value.trim();


  if (nom === "") {
    messageNom.textContent = "Le nom est obligatoire.";
    messageNom.className = "mt-2 text-sm text-red-400";
    return false;
  }

  if (!regexNom.test(nom)) {
    messageNom.textContent =
      "Le nom doit contenir 3 à 30 caractères valides.";
    messageNom.className = "mt-2 text-sm text-red-400";
    return false;
  }

  messageNom.textContent = "";
  return true;
}

// Validation du poste avec Event Delegation

export function validatePoste() {
  const posteChoisi = posteContainer.querySelector(
    'input[type="radio"]:checked'
  );

  if (!posteChoisi) {
    messagePoste.textContent = "Veuillez choisir un poste.";
    messagePoste.className = "mt-2 text-sm text-red-400";
    return false;
  }

  messagePoste.textContent = "";
  return true;
}

// Numéro obligatoire de 1 à 99 et unique

export function valideNumber() {
  const valeur = numeroInput.value.trim();
  const numero = Number(valeur);

  if (
    valeur === "" ||
    !Number.isInteger(numero) ||
    numero < 1 ||
    numero > 99
  ) {
    messageNumero.textContent =
      "Le numéro doit être un entier entre 1 et 99.";
    messageNumero.className = "mt-2 text-sm text-red-400";
    return false;
  }

  const numeroExiste = joueurs.some(function (joueur) {
    return (
      joueur.numero === numero &&
      joueur !== joueurAModifier
    );
  });

  if (numeroExiste) {
    messageNumero.textContent = "Ce numéro est déjà utilisé.";
    messageNumero.className = "mt-2 text-sm text-red-400";
    return false;
  }

  messageNumero.textContent = "";
  return true;
}

// validation age :
export function validateAge() {
  const valeur = ageInput.value.trim();
  const age = Number(valeur);

  if (
    valeur === "" ||
    !Number.isInteger(age) ||age < 18 || age > 39 ) {
    messageAge.textContent = "L'âge doit être entre 18 et 39.";
    messageAge.className = "mt-2 text-sm text-red-400";
    return false;
  }

  messageAge.textContent = "";
  return true;
}




export function initValidation() {
  if (!nomInput || !posteContainer || !numeroInput || !ageInput) {
    return;
  }

  nomInput.addEventListener("input", validateNom);

  posteContainer.addEventListener("change", function (event) {
    if (event.target.matches('input[type="radio"]')) {
      validatePoste();
    }
  });

  numeroInput.addEventListener("input", valideNumber);
  ageInput.addEventListener('input',validateAge)
}


// pages match :
const regexAdv = /^[A-Za-zÀ-ÿ\s'-]{3,30}$/;

export  function validateAdv(){
  const Adversaire = adv.value.trim();
  if(Adversaire === ""){
    messageAdv.textContent = "L'Adversaire est obligatoir!!";
    messageAdv.className = "mt-2 text-sm text-red-400";
    return false;
  }
  if(!regexAdv.test(Adversaire)){
    messageAdv.textContent = "L'adversaire doit contenir 3 à 30 caractères valides."
    messageAdv.className = "mt-2 text-sm text-red-400";
    return false;
  }
    messageAdv.textContent = "";
  return true;
}
export function validateAdvInit(){
  adv.addEventListener("input",validateAdv);
}

export function validateDate(){
  if(date.value === ""){
    messageDate.textContent="la date est obligatoire !!";
    messageDate.className= "mt-2 text-sm text-red-400";
    return false;

 }
  messageDate.textContent = "";
  return true;
}

export function validateHeure() {
  if (heure.value === "") {
    messageHeure.textContent = "L'heure est obligatoire!!";
    messageHeure.className= "mt-2 text-sm text-red-400";
    return false;
  }
  messageHeure.textContent = "";
  return true;
}

export function validateLieu() {
  if (lieu.value.trim() === "") {
    messageLieu.textContent = "Le lieu est obligatoire!!";
    messageLieu.className= "mt-2 text-sm text-red-400";
    return false;
  }
  messageLieu.textContent = "";
  return true;
}

export function validateLieumatch (){
  const lmChoisi = lieuMatch.querySelector(
    'input[type="radio"]:checked'
  );
  if(!lmChoisi){
    messageLM.textContent = "Lieu de travaille est obligatoire!!"
    messageLM.className ="mt-2 text-sm text-red-400";
    return false
    }
    messageLM.textContent = ""; 
    return true;
}
