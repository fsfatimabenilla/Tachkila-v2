
import { key } from "./donnees-initiales";
export function stock(){
  const donnees = localStorage.getItem(key);
  return donnees ? JSON.parse(donnees) : [];
}

export function sauvegarderJoueurs(joueurs){
  localStorage.setItem(key, JSON.stringify(joueurs));
}