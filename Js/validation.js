import {
  nomInput,
  posteContainer,
  numeroInput,
  messageNom,
  messageNumero,
  messagePoste,
  joueurs,
  joueurAModifier
} from "./interface.js";

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

export function initValidation() {
  if (!nomInput || !posteContainer || !numeroInput) {
    return;
  }

  nomInput.addEventListener("input", validateNom);

  posteContainer.addEventListener("change", function (event) {
    if (event.target.matches('input[type="radio"]')) {
      validatePoste();
    }
  });

  numeroInput.addEventListener("input", valideNumber);
}
