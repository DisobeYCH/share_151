/*
 * @author Luvisotto Marco
 * @version 1.0 / 12.03.2023
 * @creation 24.02.2023
 */

$(document).ready(function() {
    document.getElementById("alertPost").style.display = "none";
    $.getScript("../javascripts/beans/rubrique.js", function() {
        console.log("rubrique.js chargé !");
    });
    $.getScript("../javascripts/helpers/alert.js", function() {
        console.log("alert.js chargé !");
    });
    $.getScript("../javascripts/controllers/formsCtrl.js", function() {
        console.log("formsCtrl.js chargé !");
    });
    $.getScript("../javascripts/services/servicesHttp.js", function() {
        console.log("servicesHttp.js chargé !");
        changeStyle("devRubrique", "devPosts", "formRubriques", "formPosts");
        afficherToutesLesRubriques(successCallback, errorCallback);
        document
            .getElementById("devRubrique")
            .addEventListener("click", function() {
                changeStyle("devRubrique", "devPosts", "formRubriques", "formPosts");
            });

        document.getElementById("devPosts").addEventListener("click", function() {
            changeStyle("devPosts", "devRubrique", "formPosts", "formRubriques");
        });


        document
            .getElementById("formAddRubrique")
            .addEventListener("click", function() {
                refreshStyle(["newRubrique"]);

                var selectElement = document.getElementById("selectRubrique");
                if (document.getElementById("newRubrique").value.length > 0) {


                    ajouterRubrique(
                        selectElement.value,
                        document.getElementById("newRubrique").value,
                        succesAjout,
                        errorAjout
                    );
                } else {
                    setError("Veuillez ajouter un nom à votre rubrique", "alert", "newRubrique");
                }
            });

        document
            .getElementById("formAddPost")
            .addEventListener("click", function() {
                refreshStyle(["titrePost", "fileInput"]);

                var titre = document.getElementById("titrePost").value;
                var description = document.getElementById("description").value;
                var selectElement = document.getElementById("selectRubriquePost");
                var selectedValue = selectElement.value;
                const inputElement = document.getElementById("fileInput");
                const file = inputElement.files[0];
                console.log(titre.length)
                if (titre.length > 0) {
                    encodeFileToBase64(file, function(base64String) {
                        ajouterPost(
                            titre,
                            description,
                            selectedValue,
                            base64String,
                            succesAjoutPost,
                            errorAjout
                        );
                    });
                } else {
                    setError("Veuillez ajouter un Titre", "alertPost", "titrePost");
                }

            });
    });
});

function changeStyle(style1, style2, form1, form2) {
    element1 = document.getElementById(style1);
    element2 = document.getElementById(style2);
    formEnable = document.getElementById(form1);
    formDisable = document.getElementById(form2);
    formEnable.style.display = "block";
    formDisable.style.display = "none";
    element1.style.color = "black";
    element1.style.backgroundColor = "var(--hover)";
    element2.style.color = "white";
    element2.style.backgroundColor = "var(--styleFont)";
    if (style1 == "devPosts") {
        document.getElementById('add-title').innerHTML = "AJOUTER UN DOCUMENT";
    } else {
        document.getElementById('add-title').innerHTML = "AJOUTER UNE RUBRIQUE";

    }


}
/**

Encodage d'un fichier en Base64.
@param {File} file - Le fichier à encoder.
@param {function} callback - La fonction de rappel à exécuter après l'encodage.
@throws {Error} Lance une erreur si le fichier est null ou vide.
*/
function encodeFileToBase64(file, callback, ) {
    if (file != null) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            var base64String = reader.result.split(",")[1];
            callback(base64String);
        };
        reader.onerror = function(error) {
            setError(error, alert);
        };
    } else {
        setError("Veuillez ajouter un fichier", "alertPost", "fileInput");
    }
}
/**

La fonction de rappel appelée en cas de succès de la récupération des données, elle compose le select du formulaire add.

@param {string} data - Les données récupérées.
*/
function successCallback(data) {
    var txt = "";
    $(data)
        .find("rubrique")
        .each(function() {
            var rubrique = new Rubrique();
            rubrique.setNom($(this).find("nom").text());
            rubrique.setPk($(this).find("id").text());
            rubrique.setFk($(this).find("fk").text());
            $fk = rubrique.getFk();

            txt +=
                "    <option value='" +
                rubrique.getPk() +
                "'>" +
                rubrique.getNom() +
                "</option>";
        });
    document.getElementById("selectRubrique").innerHTML =
        " <option value='null'>Sélectionner rubrique</option>" + txt;
    document.getElementById("selectRubriquePost").innerHTML = txt;
}

function errorCallback(jqXHR) {
    setError(jqXHR.responseText, "alert");


}

function succesAjout(data) {
    setSucces(data, "alert");

}

function succesAjoutPost(data) {
    setSucces(data, "alertPost");

}

function errorAjout(jqXHR, textStatus, errorThrown) {
    setError(jqXHR.responseText, "alert");

}