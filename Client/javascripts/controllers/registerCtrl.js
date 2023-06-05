/*
 * @author Luvisotto Marco
 * @version 1.0 / 12.03.2023
 * @creation 24.02.2023
 */

$(document).ready(function() {
    $.getScript("../javascripts/services/servicesHttp.js", function() {
        console.log("servicesHttp.js chargé !");
    });

    $.getScript("../javascripts/helpers/alert.js", function() {
        console.log("alert.js chargé !");
    });
    $.getScript("../javascripts/controllers/formsCtrl.js", function() {
        console.log("formsCtrl.js chargé !");
    });
});

window.onload = function() {

    document.getElementById("formRegister").addEventListener("click", function(event) {
        event.preventDefault();
        // Vérifie si l'adresse e-mail est valide

        if (checkPattern("emailR", /^[^\s@]+@[^\s@]+\.[^\s@]+$/) || checkPattern("emailR", /^[^<>{}()]*$/)) {
            setError("Adresse email invalide", "alert", "emailR");
            refreshStyle(["passwordR"]);
            return;
        }
        // Vérifie si le mot de passe est valide

        if (checkPattern("passwordR", /^[^<>{}()]*$/)) {
            setError("Mot de passe invalide", "alert", "passwordR");
            refreshStyle(["emailR"]);
            return;
        }
        register(document.getElementById('emailR').value, document.getElementById('passwordR').value, successCallback, errorCallback);
    });
};

function successCallback(responseData) {
    refreshStyle(["emailR", "passwordR"]);
    setSucces(responseData, "alert");
}

function errorCallback(jqXHR, textStatus, errorThrown) {
    refreshStyle(["passwordR"]);
    setError("Cette adresse mail est déja utilisé", "alert", "emailR");
}