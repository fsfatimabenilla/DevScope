
export async function githubProfile(username) {

//   const api = `https://api.github.com/users/${username}` ;
    // try{
    //    const res = await fetch(api,{
    //     Headers :{
    //         authorization : ` Bearer  ${token}`
    //     }
    //     });
    //     if(!res.ok){
    //         throw new Error(`http erreur: ${res.status}`);
    //     }
    //     const data = await res.json();
    //     return data;
    // }catch(e){
    //     console.log("error:",e.message); 
    //     return null;
    // }
    try {
    const response = await fetch(`https://api.github.com/users/${username}`
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (e) {
    console.error("Failed to fetch profile:", e.message);
    return null; // Return a fallback value so the app doesn't crash
  }
}

export async function githubDepots(username) {
    try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (e) {
    console.error("Failed to fetch profile:", e.message);
    return null; // Return a fallback value so the app doesn't crash
  }
}


export async function githublanguage(username, repoName) {
  
    const l = `https://api.github.com/repos/${username}/${repoName}/languages`;
    try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`
        );
        if (!res.ok) {
            throw new Error(`HTTP erreur: ${res.status}`);
        }
        const data = await res.json();
        return data;

    } catch (e) {
        console.log("error:", e.message);
        
    }
}
