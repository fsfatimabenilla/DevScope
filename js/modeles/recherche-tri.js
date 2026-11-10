
import { searchBtn, searchInput  } from "./donnees-initiales.js";
import { validateInput } from "./validation.js";
import { githubProfile } from "../api/github.js";

searchBtn.addEventListener("click", async function () {
    if (!validateInput()) {
        return;
    }
    const profile = searchInput.value.trim();
    try{
        const data = await githubProfile(profile);
        return data;
    }catch(e){
        console.log(e.message);
    }
    
    // window.location.href = `profil.html?username=${profile}`;
});




