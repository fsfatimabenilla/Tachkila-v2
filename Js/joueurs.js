import {
  modale,
  form,
  nomInput,
  posteContainer,
  numeroInput,
  messageNom,
  messagePoste,
  messageNumero,
  ageInput, 
  statutInput,
  messageAge,
  joueursContainer,
  joueurs,
  joueurAModifier,
  setJoueurAModifier,
  CompteurPlayer,
  messageshow,
  fermerModale,
  rechercheInput,
  filtre,
  btnPr,
  btnSv,
  InfoPage
} from "./interface.js";
import {
  validateNom,validatePoste,valideNumber,validateAge
} from "./validation.js";
import { refreshLocalStorage } from "./stockage.js";

function carteColoree(poste) {
  if (poste === "Gardien") {
    return "border-l-4 border-amber-400 bg-amber-400/10";
  }

  if (poste === "Défenseur") {
    return "border-l-4 border-blue-400 bg-blue-400/10";
  }

  if (poste === "Milieu") {
    return "border-l-4 border-green-400 bg-green-400/10";
  }

  return "border-l-4 border-red-400 bg-red-400/10";
}

const optionsPositions = [
  { value: "banc", nom: "Sur le banc" },
  { value: "gb", nom: "GB - Gardien" },
  { value: "dg", nom: "DG - Défenseur gauche" },
  { value: "dc1", nom: "DC - Défenseur central 1" },
  { value: "dc2", nom: "DC - Défenseur central 2" },
  { value: "dd", nom: "DD - Défenseur droit" },
  { value: "mg", nom: "MG - Milieu gauche" },
  { value: "mc1", nom: "MC - Milieu central 1" },
  { value: "mc2", nom: "MC - Milieu central 2" },
  { value: "md", nom: "MD - Milieu droit" },
  { value: "bu1", nom: "BU - Buteur 1" },
  { value: "bu2", nom: "BU - Buteur 2" }
];


export function afficherJoueur(joueur, page = "effectif") {
  if (!joueursContainer) {
    return;
  }

  const carte = document.createElement("div");

  carte.className =
    "rounded-xl p-3 w-[300px]  flex flex-col gap-3  " +
    carteColoree(joueur.poste);

  carte.dataset.numero = joueur.numero;

  const contenu = document.createElement("div");
  contenu.className = "flex items-center gap-3 min-w-0";

  const numero = document.createElement("span");
  numero.className =
    "rounded-full border border-red-500 h-9 w-9 flex items-center justify-center";
  numero.textContent = joueur.numero;

  const informations = document.createElement("div");
  informations.className = "flex-1 min-w-0";

  const nom = document.createElement("h3");
  nom.textContent = joueur.nom;

  const poste = document.createElement("p");
  poste.className = "text-orange-400 text-sm";
  poste.textContent = joueur.poste;

  informations.append(nom, poste);
  contenu.append(numero, informations);

 const age = document.createElement('p');
    age.className='text-sm text-slate-400';
    age.textContent= `Age : ${joueur.age} ans`;
    const statut = document.createElement('span');
      statut.className = joueur.statut === 'Blessé'
    ? 'rounded-md bg-red-500/20 text-red-300 px-2 py-1 text-xs font-semibold'
    : 'rounded-md bg-green-500/20 text-green-300 px-2 py-1 text-xs font-semibold';
  statut.textContent = joueur.statut || 'En forme';

  if(page === "effectif"){
    const bas = document.createElement('div');
    bas.className = 'flex items-center justify-between gap-2 mt-1';
    const capitaine = document.createElement('div');
  capitaine.className ='flex items-center gap-2';

  const btnModifier = document.createElement("button");
    btnModifier.type = "button";
    btnModifier.textContent = "✏️ Modifier";
    btnModifier.className = "modifier";

    const btnSupprimer = document.createElement("button");
    btnSupprimer.type = "button";
    btnSupprimer.textContent = "🗑️";
    btnSupprimer.className = "supprimer";
    btnSupprimer.setAttribute("aria-label", "Supprimer");

    const bntCapitaine = document.createElement('button');
  bntCapitaine.type ='button';
  bntCapitaine.className = joueur.capitaine
   ? 'capitaine rounded-lg bg-purple-600 px-3 py-1 text-white font-bold'
    : 'capitaine rounded-lg border border-slate-600 px-3 py-1 text-slate-300 font-bold';
  bntCapitaine.textContent = joueur.capitaine ? 'C ' : 'c';
  bntCapitaine.setAttribute('aria-label', 'désigner le capitaine')
  
  
   if(joueur.capitaine){
    carte.classList.remove('border-l-amber-400','border-l-blue-500', 'border-l-green-500', 'border-l-red-500');
    carte.classList.add('border-l-purple-500','ring-1','ring-purple-500');
    bntCapitaine.classList.add('bg-purple-500','text-white');
  }
  capitaine.append(btnModifier, btnSupprimer,bntCapitaine);
    bas.append(statut,capitaine);
     carte.append(contenu , age,bas);
  }

 else if (page === "composition") {
    const selectPosition = document.createElement("select");



    selectPosition.className =
      "mt-3 w-full rounded-md border border-slate-500 bg-slate-700 p-2 text-sm text-white";

    optionsPositions.forEach(function (optionJoueur) {
      const option = document.createElement("option");
      option.value = optionJoueur.value;
      option.textContent = optionJoueur.nom;
      selectPosition.append(option);
    });
    
  

    selectPosition.value = joueur.position || "banc";
        if (joueur.statut === "Blessé") {
      selectPosition.disabled = true;
      selectPosition.value = "banc";
    }
     carte.append(contenu, age, statut, selectPosition);
  } 
 

  joueursContainer.append(carte);
}

// Libérer une position occupée par un joueur

export function libre(joueur) {
  if (!joueur.position || joueur.position === "banc") {
    return;
  }

  const ancienneCase = document.querySelector(
    ".containir ." + joueur.position
  );

  if (
    ancienneCase &&
    ancienneCase.dataset.numero === String(joueur.numero)
  ) {
    delete ancienneCase.dataset.numero;

    const statut = ancienneCase.querySelector("p");

    if (statut) {
      statut.textContent = "Libre";
    }
  }
}

function viderMessages() {
  if (messageNom) messageNom.textContent = "";
  if (messagePoste) messagePoste.textContent = "";
  if (messageNumero) messageNumero.textContent = "";
  if (messageAge) messageAge.textContent = "";
}

export function initJoueurs() {
  if (
    !form ||
    !joueursContainer ||
    !nomInput ||
    !posteContainer ||
    !numeroInput ||
    !ageInput ||
    !statutInput ||
    !modale
  ) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nomValide = validateNom();
    const posteValide = validatePoste();
    const numeroValide = valideNumber();
    const ageValide =  validateAge();
    

    if (!nomValide || !posteValide || !numeroValide || !ageValide) {
      return;
    }

    const posteSelectionne = posteContainer.querySelector(
      'input[type="radio"]:checked'
    );

    if(!posteSelectionne){
      return;
    }

    const nouveauJoueur = {
      nom: nomInput.value.trim(),
      numero: Number(numeroInput.value),
      poste: posteSelectionne.value,
      age : Number(ageInput.value),
      statut : statutInput.value || "En forme"
      
    };

    if (joueurAModifier) {
      const joueur = joueurAModifier;
      const ancienNumero = joueurAModifier.numero;
      const anciennePosition = joueurAModifier.position;
      const ancienPoste = joueurAModifier.poste;
      

      // Si le poste change, le joueur retourne au banc
      if (ancienPoste !== nouveauJoueur.poste || nouveauJoueur.statut=== "Blessé")
         {
        libre(joueurAModifier);
        joueurAModifier.position = "banc";
      } else if (anciennePosition !== "banc") {
        // Le poste ne change pas : conserver la position
        const caseTerrain = document.querySelector(
          ".containir ." + anciennePosition
        );

        if (
          caseTerrain &&
          caseTerrain.dataset.numero === String(ancienNumero)
        ) {
          caseTerrain.dataset.numero = String(nouveauJoueur.numero);

          const terrainnv = caseTerrain.querySelector("p");

          if (terrainnv) {
            terrainnv.textContent = nouveauJoueur.nom;
          }
        }
      }

      joueurAModifier.nom = nouveauJoueur.nom;
      joueurAModifier.numero = nouveauJoueur.numero;
      joueurAModifier.poste = nouveauJoueur.poste;
      joueurAModifier.age = nouveauJoueur.age;
      joueurAModifier.statut = nouveauJoueur.statut;

       joueursContainer.replaceChildren();

      joueurs.forEach(function (joueur) {
        afficherJoueur(joueur, "effectif");
      });

      setJoueurAModifier(null);
      CompteurPlayer();
      messageshow("Joueur modifié avec succès !", "succes");
    } else {
      nouveauJoueur.position ="banc";
      nouveauJoueur.capitaine=false;

      joueurs.push(nouveauJoueur);
      afficherJoueur(nouveauJoueur, "effectif");
      CompteurPlayer();
      messageshow("Joueur ajouté avec succès !", "succes");
    }

    refreshLocalStorage();
    form.reset();
    viderMessages();
    

    fermerModale();
  });

  // Suppression

  joueursContainer.addEventListener("click", function (event) {
    const btn = event.target.closest(".supprimer");

    if (!btn || !joueursContainer.contains(btn)) {
      return;
    }

    const carte = btn.closest("[data-numero]");

    if (!carte) {
      return;
    }

    const numero = Number(carte.dataset.numero);

    const index = joueurs.findIndex(function (joueur) {
      return joueur.numero === numero;
    });

    if (index === -1) {
      return;
    }

    const confirmation = confirm(
      "Voulez-vous supprimer ce joueur ?"
    );

    if (!confirmation) {
      return;
    }

    const joueur = joueurs[index];

    libre(joueur);
    joueurs.splice(index, 1);
    carte.remove();

    CompteurPlayer();
    refreshLocalStorage();
    messageshow("Joueur supprimé avec succès !", "succes");
  });

  // Modification

  joueursContainer.addEventListener("click", function (event) {
    const btn = event.target.closest(".modifier");

    if (!btn || !joueursContainer.contains(btn)) {
      return;
    }

    const carte = btn.closest("[data-numero]");

    if (!carte) {
      return;
    }

    const numero = Number(carte.dataset.numero);

    const joueur = joueurs.find(function (j) {
      return j.numero === numero;
    });

    if (!joueur) {
      return;
    }

    setJoueurAModifier(joueur);

    nomInput.value = joueur.nom;
    numeroInput.value = joueur.numero;
    ageInput.value = joueur.age;
    statutInput.value = joueur.statut || "En forme";

    const posteInput = posteContainer.querySelector(
      `input[name="poste"][value="${joueur.poste}"]`
    );

    if (posteInput) {
      posteInput.checked = true;
    }
    viderMessages();

    modale.classList.remove("hidden");
    modale.classList.add("flex");
  });

  // désigner le capitaine :
  joueursContainer.addEventListener("click", function (event) {
    const btn = event.target.closest(".capitaine");
     if (!btn || !joueursContainer.contains(btn)) {
      return;
    }
     const carte = btn.closest("[data-numero]");

    if (!carte) return;

    const numero = Number(carte.dataset.numero);

    const joueurSelectionne = joueurs.find(function (j) {
      return j.numero === numero;
    });


    if(!joueurSelectionne) return;
    
    joueurs.forEach(function (joueur) {
      joueur.capitaine = joueur === joueurSelectionne;
    });

    refreshLocalStorage();
    Pagination();
    messageshow(
      joueurSelectionne.nom + " est maintenant le capitaine.",
      "succes"
    );
  });
}



 // Recherche : 

let pageActuelle = 1;
const parPage = 8;
let posteChoisi = "Tous";
let joueurFiltres = [];

export function rechercherJoueurs() {

  if (!joueursContainer || !rechercheInput) return;

  const recherche = rechercheInput.value.trim().toLowerCase();

  joueurFiltres = joueurs.filter((joueur) =>
    joueur.nom.toLowerCase().includes(recherche) &&
    (posteChoisi === "Tous" || joueur.poste === posteChoisi)
  );

  pageActuelle = 1;

  Pagination();
}

export function initRecherche() {

  rechercheInput.addEventListener("input", () => {
    rechercherJoueurs();
  });
}

// Filtrage selon poste :

export function filterJoueurs() {

  filtre.addEventListener("click", (event) => {

    const btnFiltre = event.target.closest("button[data-poste]");
    if (!btnFiltre) return;
    filtre.querySelectorAll("button[data-poste]").forEach((btn)=>{
      btn.classList.remove("bg-green-500" , "rounded-xl" , "p-6");
      btn.classList.add("p-6" ,"rounded-lg" , "hover:bg-slate-700");
      });

       btnFiltre.classList.add("bg-green-500" , "rounded-xl" , "p-6");
      btnFiltre.classList.remove("p-6" ,"rounded-lg" ,"hover:bg-slate-700");

    posteChoisi = btnFiltre.dataset.poste;

    rechercherJoueurs();

  });

}

// Pagination

export function Pagination() {

  const totalPages = Math.ceil(joueurFiltres.length / parPage);
  if(pageActuelle > totalPages){
    pageActuelle = Math.max(1,totalPages);
  }

  const debut = (pageActuelle - 1) * parPage;
  const joueurAfficher = joueurFiltres.slice( debut,debut + parPage);

  joueursContainer.replaceChildren();

  if (joueurAfficher.length === 0) {

    const vide = document.createElement("p");
    vide.className = "text-center text-slate-400 py-8";
    vide.textContent = "Aucun joueur trouvé.";
    joueursContainer.append(vide);
  }
  joueurAfficher.forEach((joueur) => {
    afficherJoueur(joueur, "effectif");
  });

  InfoPage.textContent = `Page ${pageActuelle} / ${totalPages}`;
  btnPr.disabled = pageActuelle <= 1;
  btnSv.disabled = pageActuelle >= totalPages || totalPages === 0;

}


export function initPagination() {

  btnPr.addEventListener("click", () => {

    if (pageActuelle > 1) {
      pageActuelle--;
      Pagination();
    }

  });

  btnSv.addEventListener("click", () => {
    const totalPages = Math.ceil(joueurFiltres.length / parPage);
    if (pageActuelle < totalPages) {
      pageActuelle++;
      Pagination();
    }
  });

}
