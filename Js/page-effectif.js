import { initModale,CompteurPlayer } from "./interface.js";
import  {initValidation } from "./validation.js";
import { afficherJoueur , initJoueurs ,initRecherche,filterJoueurs} from "./joueurs.js";
import { restaurerJoueurs } from "./stockage.js";

initModale();
initValidation();
initJoueurs();
initRecherche();
filterJoueurs();

CompteurPlayer();

restaurerJoueurs(function (joueur) {
  afficherJoueur(joueur, "effectif");
});