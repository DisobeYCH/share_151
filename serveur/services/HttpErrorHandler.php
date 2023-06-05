<?php
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
class HttpErrorHandler
{
    /**
     * Définit un code d'erreur HTTP et renvoie un message d'erreur
     *
     * @param int $statusCode Le code d'erreur HTTP
     * @param string $message Le message d'erreur
     * @return string Le message d'erreur
     */
    public static function setHttpError($statusCode, $message)
    {
        http_response_code($statusCode);
        return  $message;
    }
}
