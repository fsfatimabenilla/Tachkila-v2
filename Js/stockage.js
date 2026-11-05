import {
  joueurs,
  setJoueurs,
  joueursContainer,
  CompteurPlayer,
} from "./interface.js";
import { match , setMatch } from "./donnees-initiales.js";

// localStorage

const key = "tachkila";
export function refresh() {
  const rs = localStorage.getItem(key);
  setJoueurs(rs ? JSON.parse(rs) : []);
}

export function refreshLocalStorage() {
  localStorage.setItem(key, JSON.stringify(joueurs));
}

export function restaurerJoueurs(afficherJoueur) {
  refresh();

  if (!joueursContainer) return;

  joueursContainer.innerHTML = "";

  joueurs.forEach(function (joueur) {
    afficherJoueur(joueur);

    if (!joueur.position || joueur.position === "banc") {
      return;
    }

    const caseTerrain = document.querySelector(
      ".containir ." + joueur.position,
    );

    if (!caseTerrain) return;

    if (caseTerrain.dataset.numero) {
      joueur.position = "banc";
      return;
    }
    caseTerrain.dataset.numero = String(joueur.numero);

    const statut = caseTerrain.querySelector("p");

    if (statut) {
      statut.textContent = joueur.nom;
    }
  });

  CompteurPlayer();
  refreshLocalStorage();
}



const keyMatch = "tachkila-matchs";

export function refreshMatch() {
    const rs = localStorage.getItem(keyMatch);
    setMatch(rs ? JSON.parse(rs) : []);
}

export function refreshLocalStorageMatch() {
    localStorage.setItem(keyMatch, JSON.stringify(match));
}