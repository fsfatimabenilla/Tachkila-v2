import {
    joueurs,setJoueurs,joueursContainer,CompteurPlayer
} from "./interface.js"


// 10. localStorage

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
if(!joueursContainer){
    return;
}

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
  
  CompteurPlayer();
  refreshLocalStorage();
}
