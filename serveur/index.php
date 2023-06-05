<?php
include_once('ctrl/ShowContentManager.php');
include_once('ctrl/LoginManager.php');
include_once('ctrl/RegisterManager.php');
include_once('ctrl/SessionManager.php');
include_once('ctrl/CrudManager.php');

/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
// Récupérer le contenu de la requête PUT

parse_str(file_get_contents("php://input"), $vars);

// Si la rubrique est spécifiée dans l'URL, afficher le contenu de la rubrique
if (isset($_GET['rubrique'])) {
    $rubriques = new ShowContentManager();
    echo $rubriques->readContent($_GET['rubrique']);
}
// Si la rubrique parent est spécifiée dans l'URL, retourner la liste des rubriques parentes
if (isset($_GET['rubriqueParent'])) {
    $rubriques = new ShowContentManager();
    echo $rubriques->returnRubrique();
}
// Si l'utilisateur soumet un formulaire de connexion, vérifier les informations de connexion
if (isset($_POST['loginUser']) && isset($_POST['loginPassword'])) {
    $checkLogin = new LoginManager();
    echo $checkLogin->checkLogin($_POST['loginUser'], $_POST['loginPassword']);
}
// Si l'utilisateur soumet un formulaire d'inscription, vérifier les informations d'inscription
if (isset($vars['registerUser']) && isset($vars['registerPassword'])) {
    $checkRegister = new RegisterManager();
    echo $checkRegister->checkRegister($vars['registerUser'], $vars['registerPassword']);
}
// Si l'utilisateur souhaite vérifier s'il est connecté ou non
if (isset($_POST['log'])) {
    $session = new SessionManager();
    echo $session->isLoggedIn();
}
// Si l'utilisateur souhaite se déconnecter
if (isset($_POST['out'])) {
    $session = new SessionManager();
    echo $session->logout();
}
// Si l'utilisateur demande la liste de toutes les rubriques
if (isset($_GET['toutesRubriques'])) {
    $rubriques = new ShowContentManager();
    echo $rubriques->toutesRubriques();
}
// Si l'utilisateur demande la liste de tous les uploads
if (isset($_GET['tousUpload'])) {
    $rubriques = new ShowContentManager();
    echo $rubriques->tousUpload();
}
// Si l'utilisateur soumet un formulaire pour ajouter une nouvelle rubrique
if (isset($vars['parentRubrique']) && isset($vars['nomRubrique'])) {
    $parent = $vars['parentRubrique'];
    $nom = $vars['nomRubrique'];
    if ($parent == "null") {
        $parent = NULL;
    }
    $crud = new CrudManager();
    echo $crud->ajoutRubrique($nom, $parent);
}
// Si l'utilisateur soumet un formulaire pour ajouter un nouveau post
if (isset($vars['titre']) && isset($vars['description']) && isset($vars['idRubrique']) && isset($vars['file'])) {
    $crud = new CrudManager();
    echo $crud->ajoutPost($vars['titre'], $vars['description'], $vars['idRubrique'], $vars['file']);
}
// Si l'utilisateur souhaite supprimer un upload
if (isset($vars['deleteUpload'])) {
    $crud = new CrudManager();
    echo $crud->deleteUpload($vars['deleteUpload']);
}
// Si l'utilisateur souhaite modifier un upload
if (isset($vars['pkModif']) && isset($vars['titre']) && isset($vars['description']) && isset($vars['selectedValueModif']) && isset($vars['file'])) {
    $crud = new CrudManager();
    echo $crud->modifyUpload($vars['pkModif'], $vars['titre'], $vars['description'], $vars['selectedValueModif'], $vars['file']);
}
