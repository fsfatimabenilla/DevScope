
import { searchBtn, searchInput  } from "./donnees-initiales.js";
import { validateInput } from "./validation.js";
import { githubProfile } from "../api/github.js";

searchBtn.addEventListener("click", async function () {

    if (!validateInput()) {
        return;
    }
    const profile = searchInput.value.trim();
window.location.href = `profil.html?username=${encodeURIComponent(profile)}`;
});




