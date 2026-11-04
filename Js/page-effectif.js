import { initModale,CompteurPlayer } from "./interface.js";
import  {initValidation } from "./validation.js";
import { afficherJoueur , initJoueurs ,initRecherche,filterJoueurs , initPagination, Pagination ,rechercherJoueurs} from "./joueurs.js";
import { restaurerJoueurs } from "./stockage.js";

initModale();
initValidation();
initJoueurs();
initRecherche();
filterJoueurs();
initPagination();
Pagination();

CompteurPlayer();

restaurerJoueurs(function (joueur) {
  afficherJoueur(joueur, "effectif");
});

rechercherJoueurs();