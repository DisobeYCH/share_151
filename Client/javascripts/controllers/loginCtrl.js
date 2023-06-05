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

    document.getElementById("formLogin").addEventListener("click", function(event) {
        event.preventDefault();
        // Vérifie si l'adresse e-mail est valide

        if (checkPattern("emailL", /^[^\s@]+@[^\s@]+\.[^\s@]+$/) || checkPattern("emailL", /^[^<>{}()]*$/)) {
            setError("Adresse email invalide", "alert", "emailL");
            refreshStyle(["passwordL"]);
            return;
        }
        // Vérifie si le mot de passe est valide

        if (checkPattern("passwordL", /^[^<>{}()]*$/)) {
            setError("Mot de passe invalide", "alert", "passwordL");
            refreshStyle(["emailL"]);
            return;
        }
        // Appelle la fonction de connexion avec les paramètres d'entrée appropriés

        login(document.getElementById("emailL").value, document.getElementById("passwordL").value, successCallback, errorCallback);
    });
};

function successCallback(responseData) {
    window.location.href = "../index.html";
}


function errorCallback(jqXHR, textStatus, errorThrown) {
    //  checkSession(successCallbackSession, errorCallbackSession);
    console.log(errorThrown)
    if (errorThrown == "Unauthorized") {
        setError(jqXHR.responseText, "alert", "passwordL");
        refreshStyle(["emailL"]);
    }
    if (errorThrown == "Not Found") {
        setError(jqXHR.responseText, "alert", "emailL");
        refreshStyle(["passwordL"]);
    }


}