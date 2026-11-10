import { erreurMsg,searchInput } from "./donnees-initiales.js";

export function validateInput(){
    const regex =  /^[a-zA-Z0-9-]+$/;
    const profile = searchInput.value.trim();

    if(profile ===""){
        erreurMsg.textContent = "Ce champ est obligatoire!";
        return false ;
    }
    if(profile.length  < 1 || profile.length >39){
         erreurMsg.textContent = "Username doite contenir entre 1 et 39 des lettres !";
        return false;
    }
    if(!regex.test(profile) || profile.startsWith("-") || profile.endsWith("-")){
        erreurMsg.textContent = "Username doite contenir lettres, chiffres et tirets , at pas commance ou termine avec tiret!";
        return false;
    }

    erreurMsg.textContent="";
    return true ;

}