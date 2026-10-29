

import {stock,sauvegarderJoueurs} from "./stockage.js";
import { gererPlayer } from "./joueurs.js";
import { afficherJoueur,CompteurPlayer } from "./interface";

  //  Sélection des éléments
const modale = document.querySelector("#modale");
const ouvrir = document.querySelector("#ouvrir");
const fermer = document.querySelector("#fermer");
const annuler = document.querySelector("#annuler");

const form = document.querySelector("#formulaire");
const nomInput = document.querySelector("#nom");
const posteContainer = document.querySelector("#check");
const numeroInput = document.querySelector("#numero");

const messageNom = document.querySelector("#valide");
const messagePoste = document.querySelector("#poste-message");
const messageNumero = document.querySelector("#numero-message");
const message = document.querySelector("#message");

const joueursContainer = document.querySelector("#joueurs-container");
const compteur = document.querySelector("#compteur");

const elements = {
  modale, ouvrir, fermer, annuler, form, nomInput, posteContainer,
  numeroInput, messageNom, messagePoste, messageNumero, message,
  joueursContainer, compteur
};
const etat = {
  joueurs: chargerJoueurs(),
  joueurAModifier: null
};

gererPlayer(elements, etat);

joueursContainer.innerHTML = "";

joueurs.forEach(function (joueur) {
   afficherJoueur(joueur);
   if (joueur.position && joueur.position !== "banc") {
    const caseTerrain = document.querySelector(".containir ." + joueur.position);

    if (caseTerrain && !caseTerrain.dataset.numero) {
      caseTerrain.dataset.numero = String(joueur.numero);

      const statut = caseTerrain.querySelector("p");

      if (statut) {
        statut.textContent = joueur.nom;
      }
    } else {
      joueur.position = "banc";
    }
  }
    });

CompteurPlayer(etat,joueurs,compteur);
sauvegarderJoueurs(etat.joueurs);