
export async function githubProfile(username) {
  const api = `https://api.github.com/users/${username}` ;

    try{
        const res = await fetch(api,{
        });
        if(!res.ok){
            throw new Error(`http erreur: ${res.status}`);
        }
        const data = await res.json();
        return data;
    }catch(e){
        console.log("error:",e.message); 
        throw e;
    }
}
