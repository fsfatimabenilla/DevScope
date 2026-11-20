
import { btnFiltre, rechercheInput } from "./donnees-initiales.js";
let statutDefault = "Tous";

export function searchFiltre(dev) {

    const search = rechercheInput.value.toLowerCase();

    return dev.filter(developer => {

        const nom = ( developer.name || "").toLowerCase();
        const statut = developer.statuts || "A contacter";

        return  nom.includes(search) && (statutDefault === "Tous" || statut === statutDefault);

        // const filtrageStatut = statutDefault === "Tous" || statut === statutDefault;
        // return rechercheNom && filtrageStatut;
    });
}

export function initRecherche(callback){

    btnFiltre.forEach(btn => { btn.addEventListener("click", () => {
            statutDefault = btn.dataset.statut;
    
            btnFiltre.forEach(b => {
                b.classList.remove("bg-rose-300");
                b.classList.add("hover:bg-rose-200");
            });
            btn.classList.add("bg-rose-300");
            btn.classList.remove("hover:bg-rose-200");
    
            callback();
        });
    
    });
    rechercheInput.addEventListener("input", () => {
        callback();
    });
}

