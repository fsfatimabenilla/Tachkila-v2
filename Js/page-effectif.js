import { initModale,CompteurPlayer } from "./interface.js";
import  {initValidation } from "./validation.js";
import { afficherJoueur , initJoueurs ,initRecherche} from "./joueurs.js";
import { restaurerJoueurs } from "./stockage.js";

initModale();
initValidation();
initJoueurs();
initJoueurs();
initRecherche();

CompteurPlayer();

restaurerJoueurs(function (joueur) {
  afficherJoueur(joueur, "effectif");
});