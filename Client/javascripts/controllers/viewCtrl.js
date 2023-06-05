/*
 * @author Luvisotto Marco
 * @version 1.0 / 12.03.2023
 * @creation 24.02.2023
 */

$(document).ready(function() {
    /**

    Obtient le chemin d'accès au répertoire à partir de l'URL courante en retirant le suffixe "/view".
    @returns {string} - Le chemin d'accès au répertoire.
    */
    let root = window.location.pathname;
    let filenameIndex = root.lastIndexOf("/");
    let directoryPath = root.substring(0, filenameIndex);
    let modifiedUrl = directoryPath.replace('/view', '');
    /**

Charge la page de navigation et initialise les événements.
@returns {void}
*/
    fetch(getURL() + "/view/navigation.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
            document.getElementById('header').innerHTML = html;
            const dropdown = document.getElementById("dropdown");
            dropdown.addEventListener("click", function() {
                drop = document.getElementById("dropdown-content");
                if (drop.style.display == "block") {
                    drop.style.display = "none"


                } else {
                    drop.style.display = "block"

                }
            });
            const destroySessions = document.getElementById("destroySession");
            destroySessions.addEventListener("click", function() {
                destroySession(sessionCallbackDestroy, sessionCallbackError);
            });

            $.getScript(modifiedUrl + "/javascripts/services/servicesHttp.js", function() {
                console.log("servicesHttp.js chargé !");
                checkSession(sessionCallback, sessionCallbackError);

            });

        })
        .catch(error => {
            console.error('Une erreur est survenue :', error);
        });

    document.getElementById("alert").style.display = "none";
});

function sessionCallback(data) {
    configSession(data);


}

function sessionCallbackDestroy(data) {
    configSession(data);
    window.location.href = getURL() + "/index.html";

}
/**

Configure l'affichage des éléments de la page en fonction de la session utilisateur.
@param {boolean} data - True si l'utilisateur est connecté, false sinon.
@returns {void}
*/
function configSession(data) {

    const postsElement = document.getElementById("posts");
    const destroySessionElement = document.getElementById("destroySession");
    const loginElement = document.getElementById("login");
    const registerElement = document.getElementById("register");
    const addElement = document.getElementById("add");

    if (postsElement && destroySessionElement && loginElement && registerElement && addElement) {
        if (data == true) {
            postsElement.style.display = "flex";
            destroySessionElement.style.display = "flex";
            loginElement.style.display = "none";
            registerElement.style.display = "none";
            addElement.style.display = "flex";
        } else {
            addElement.style.display = "none";
            postsElement.style.display = "none";
            loginElement.style.display = "flex";
            destroySessionElement.style.display = "none";
            registerElement.style.display = "flex";
        }
    } else {
        console.log("Un ou plusieurs éléments n'ont pas été trouvés.");
    }
}

function getURL() {
    let root = window.location.pathname;
    let filenameIndex = root.lastIndexOf("/");
    let directoryPath = root.substring(0, filenameIndex);
    let modifiedUrl = directoryPath.replace('/view', '');
    return modifiedUrl;
}

function sessionCallbackError() {}