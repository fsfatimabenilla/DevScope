
import { searchBtn, searchInput  } from "./donnees-initiales.js";
import { validateInput } from "./validation.js";

function Recherche() {
    searchBtn.addEventListener("click", () => {
        if (!validateInput()) {
            return;
        }
        const profile = searchInput.value.trim();
        window.location.href = `profil.html?username=${profile}`;
    });
}
Recherche();
