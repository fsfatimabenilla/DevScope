
import { searchBtn, searchInput , erreurMsg } from "./donnees-initiales.js";
import { validateInput } from "./validation.js";
import { githubProfile } from "../api/github.js";

searchBtn.addEventListener("click", async function () {

    if (!validateInput()) {
        return;
    }
    const profile = searchInput.value.trim();
    try{
        const data = await githubProfile(profile);
        if(!data){
            erreurMsg.textContent = "Aucun profile avec ce username !"
            return;
        }
        window.location.href = `profil.html?username=${encodeURIComponent(profile)}`;
    }
    catch (e) {
        console.log(e.message);
    }
});




