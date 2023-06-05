<?php
include_once("./wrk/registerBD.php");
include_once('./services/HttpErrorHandler.php');
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
/**
 * Classe RegisterManager pour gérer l'enregistrement des utilisateurs.
 */
class RegisterManager
{
    /**
     * Vérifie si l'utilisateur est déjà enregistré ou non.
     * Si l'utilisateur n'est pas enregistré, l'enregistre et renvoie un message de succès.
     * Si l'utilisateur est déjà enregistré, renvoie une erreur HTTP 409.
     *
     * @param string $email Email de l'utilisateur à enregistrer.
     * @param string $password Mot de passe de l'utilisateur à enregistrer.
     *
     * @return string|HttpErrorHandler Message de succès si l'utilisateur a été enregistré avec succès.
     *                                 Sinon, renvoie une erreur HTTP 409 si l'utilisateur existe déjà.
     */
    public function checkRegister($email, $password)
    {
        $register = new RegisterDB();
        $user = $register->userExist(strip_tags($email));
        if ($user < 1) {
            if ($register->register(strip_tags($email), strip_tags($password))) {
                return "L'utilisateur à été enrengistré avec succès";
            }
        } else {
            $error = new HttpErrorHandler();

            return $error->setHttpError(409, "L'utilisateur renseigné existe déja");
        }
    }
}
