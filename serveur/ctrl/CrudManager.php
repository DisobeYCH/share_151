

<?php

include_once("./wrk/CrudBD.php");
include_once('SessionManager.php');
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
class CrudManager
{
    private $crudDB;
    public function __construct()
    {
        $this->crudDB = new CrudDB();
    }
    /**
     * Ajoute une nouvelle rubrique.
     * @param string $nom Le nom de la rubrique.
     * @param int $parent L'identifiant parent de la rubrique.
     * @return bool|string
     */
    public function ajoutRubrique($nom, $parent)
    {
        $session = new SessionManager();
        if (!$session->isLoggedIn()) {
            $error = new HttpErrorHandler();

            return $error->setHttpError(403, "Vous netes pas connecté");
        }
        return $this->crudDB->ajoutRubrique(strip_tags($nom), $parent);
    }
    /**
     * Ajoute un nouveau post.
     * @param string $titre Le titre du post.
     * @param string $description La description du post.
     * @param int $idRubrique L'identifiant de la rubrique.
     * @param string $file Le contenu du fichier.
     * @return bool
     */
    public function ajoutPost($titre, $description, $idRubrique, $file)
    {
        $base64 = base64_decode($file);

        $session = new SessionManager();
        if (!$session->isLoggedIn()) {
            $error = new HttpErrorHandler();

            return $error->setHttpError(403, "Vous netes pas connecté");
        }
        try {
            return $this->crudDB->ajoutNewPost(strip_tags($titre), strip_tags($description), strip_tags($idRubrique),  $base64);
        } catch (Exception $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }
    /**
     * Supprime un fichier uploadé.
     * @param int $id L'identifiant du fichier à supprimer.
     */
    public function deleteUpload($id)
    {
        $error = new HttpErrorHandler();
        $session = new SessionManager();
        if (!$session->isLoggedIn()) {

            return $error->setHttpError(403, "Vous netes pas connecté");
        }
        $user = $this->crudDB->checkUser($id);
        if ($user != $_SESSION['idUser']) {
            return $error->setHttpError(403, "Vous n'avez pas les droits");
        }
        return $this->crudDB->deleteUpload(strip_tags($id));
    }
    /**
     * Modifie un fichier uploadé.
     * @param int $pk L'identifiant du fichier à modifier.
     * @param string $titre Le titre du fichier.
     * @param string $description La description du fichier.
     * @param int $fk L'identifiant de la rubrique associée au fichier.
     * @param string $file Le contenu du fichier.
     */
    public function modifyUpload($pk, $titre, $description, $fk, $file)
    {
        $base64 = base64_decode($file);
        $error = new HttpErrorHandler();
        $session = new SessionManager();
        if (!$session->isLoggedIn()) {

            return $error->setHttpError(403, "Vous netes pas connecté");
        }
        $user = $this->crudDB->checkUser($pk);
        if ($user != $_SESSION['idUser']) {
            return $error->setHttpError(403, "Vous n'avez pas les droits");
        }
        return $this->crudDB->modifieUpload(strip_tags($pk), strip_tags($titre), strip_tags($description), strip_tags($fk), $base64);
    }
}
