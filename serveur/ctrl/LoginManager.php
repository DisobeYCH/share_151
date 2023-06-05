<?php
include_once("./wrk/LoginBD.php");
include_once('SessionManager.php');
include_once('./services/HttpErrorHandler.php');

/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
class LoginManager
{

    private $loginDb;
    /**
     * Constructeur de la classe LoginManager
     */
    public function __construct()
    {
        $this->loginDb = new LoginDB();
    }
    /**
     * Vérifie si l'utilisateur peut se connecter
     * @param string $email Email de l'utilisateur
     * @param string $password Mot de passe de l'utilisateur
     * @return mixed Chaîne de caractères indiquant si la connexion a réussi ou un objet HttpErrorHandler en cas d'erreur
     */
    public function checkLogin($email, $password)
    {
        $session = new SessionManager();
        $user = $this->loginDb->getUserByEmail(strip_tags($email));

        if (!$user) {

            $error = new HttpErrorHandler();

            return $error->setHttpError(404, "L'utilisateur renseigné n'existe pas");
        }
        if (!password_verify($password, $user['passwordUser'])) {
            $error = new HttpErrorHandler();

            return $error->setHttpError(401, "Le mot de passe est incorrect");
        } else {
            $session->openSession($user['email'], $user['PK_user']);
            return "Logguer avec succès";
        }
    }
}
