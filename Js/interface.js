// Sélection des éléments présents dans la page courante

export const modale = document.querySelector("#modale");
export const ouvrir = document.querySelector("#ouvrir");
export const fermer = document.querySelector("#fermer");
export const annuler = document.querySelector("#annuler");

export const form = document.querySelector("#formulaire");
export const nomInput = document.querySelector("#nom");
export const posteContainer = document.querySelector("#check");
export const numeroInput = document.querySelector("#numero");

export const messageNom = document.querySelector("#valide");
export const messagePoste = document.querySelector("#poste-message");
export const messageNumero = document.querySelector("#numero-message");
export const message = document.querySelector("#message");

export const joueursContainer = document.querySelector("#joueurs-container");
export const compteur = document.querySelector("#compteur");

export let joueurs = [];
export let joueurAModifier = null;
let timerMessage;

export function setJoueurs(valeur) {
  joueurs = valeur;
}

export function setJoueurAModifier(valeur) {
  joueurAModifier = valeur;
}

export function CompteurPlayer() {
  if (compteur) {
    compteur.textContent = joueurs.length + " joueurs";
  }
}

// Messages de succès / d'erreur (3 s)

export function messageshow(texte, type = "erreur") {
  if (!message) {
    return;
  }

  message.textContent = texte;
  message.className =
    type === "erreur"
      ? "mt-3 text-sm text-red-500"
      : "mt-3 text-sm text-green-500";

  clearTimeout(timerMessage);

  timerMessage = setTimeout(function () {
    message.textContent = "";
  }, 3000);
}

// Ouvrir et fermer la modale

export function fermerModale() {
  if (!modale) {
    return;
  }

  modale.classList.add("hidden");
  modale.classList.remove("flex");
}

export function initModale() {
  if (!ouvrir || !form || !modale || !fermer || !annuler) {
    return;
  }

  ouvrir.addEventListener("click", function () {
    form.reset();
    setJoueurAModifier(null);

    if (messageNom) messageNom.textContent = "";
    if (messagePoste) messagePoste.textContent = "";
    if (messageNumero) messageNumero.textContent = "";

    modale.classList.remove("hidden");
    modale.classList.add("flex");
  });

  fermer.addEventListener("click", fermerModale);
  annuler.addEventListener("click", fermerModale);
}
