/*
 * @author Luvisotto Marco
 * @version 1.0 / 12.03.2023
 * @creation 24.02.2023
 */

var BASE_URL = "http://localhost/projetPerso/151_projetperso-DisobeYCH/serveur/index.php";

function chargerRubriques(idRubrique, successCallback, errorCallback) {

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: BASE_URL,
        data: 'rubrique=' + idRubrique,
        success: successCallback,
        error: errorCallback
    });
}

function afficherToutesLesRubriques(successCallback, errorCallback) {
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: BASE_URL,
        data: 'toutesRubriques',
        success: successCallback,
        error: errorCallback
    });
}

function afficherTousUploads(successCallback, errorCallback) {
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: BASE_URL,
        data: 'tousUpload',
        success: successCallback,
        error: errorCallback
    });
}


function afficherRubriqueParents(successCallback, errorCallback) {

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: BASE_URL,
        data: 'rubriqueParent',
        success: successCallback,
        error: errorCallback
    });
}

function ajouterPost(titre, description, selectedValue, file, successCallback, errorCallback) {
    $.ajax({
        type: "PUT",
        url: BASE_URL,
        data: { titre: titre, description: description, idRubrique: selectedValue, file: file },
        success: successCallback,
        error: errorCallback
    });
}


function modifieUploads(id, titre, description, selectedValueModif, file, successCallback, errorCallback) {
    $.ajax({
        type: "PUT",
        url: BASE_URL,
        data: { pkModif: id, titre: titre, description: description, selectedValueModif: selectedValueModif, file: file },
        success: successCallback,
        error: errorCallback
    });
}

function deleteUploads(id, successCallback, errorCallback) {
    $.ajax({
        type: "DELETE",
        url: BASE_URL,
        data: { deleteUpload: id },
        success: successCallback,
        error: errorCallback
    });
}


function ajouterRubrique(parent, nom, successCallback, errorCallback) {
    $.ajax({
        type: "PUT",
        url: BASE_URL,
        data: { parentRubrique: parent, nomRubrique: nom },
        success: successCallback,
        error: errorCallback
    });
}

function login(user, password, successCallback, errorCallback) {
    $.ajax({
        type: "POST",
        url: BASE_URL,
        data: { loginUser: user, loginPassword: password },
        success: successCallback,
        error: errorCallback
    });
}

function register(user, password, successCallback, errorCallback) {

    $.ajax({
        type: "PUT",
        url: BASE_URL,
        data: { registerUser: user, registerPassword: password },
        success: successCallback,
        error: errorCallback
    });
}


function checkSession(successCallback, errorCallback) {

    $.ajax({
        type: "POST",
        url: BASE_URL,
        data: 'log',
        success: successCallback,
        error: errorCallback
    });
}

function destroySession(successCallback, errorCallback) {
    $.ajax({
        type: "POST",
        url: BASE_URL,
        data: 'out',
        success: successCallback,
        error: errorCallback
    });
}