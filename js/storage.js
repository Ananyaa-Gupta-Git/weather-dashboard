export function saveUserPreferences(prefs){

    localStorage.setItem(
        "weatherPreferences",
        JSON.stringify(prefs)
    );
}

export function loadUserPreferences(){

    const prefs = localStorage.getItem(
        "weatherPreferences"
    );

    return prefs
        ? JSON.parse(prefs)
        : {
            defaultCity:"London",
            theme:"light"
        };
}