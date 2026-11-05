import { gesModal, ajoutmatchInit } from "./donnees-initiales.js";
import { validateAdvInit , validateLieu,validateHeure,validateLieumatch,
    validateDate  
} 
    from "./validation.js";
gesModal();
validateAdvInit();
validateDate();
validateHeure();
validateLieu();
validateLieumatch();
ajoutmatchInit();