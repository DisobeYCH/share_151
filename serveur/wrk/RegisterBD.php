<?php
include_once('ConnexionDB.php');
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
/**
 * La classe RegisterDB permet de gérer l'inscription des utilisateurs dans la base de données.
 */
class RegisterDB
{

	/**
	 * Enregistre un nouvel utilisateur dans la base de données.
	 *
	 * @param string $email L'email de l'utilisateur.
	 * @param string $password Le mot de passe de l'utilisateur.
	 *
	 * @return bool Retourne true si l'utilisateur a été enregistré avec succès, sinon false.
	 */

	public function register($email, $password)
	{
		// Récupérer une instance de la connexion à la base de données

		$connection = Connection::getInstance();
		// Vérifier si l'utilisateur existe déjà dans la base de données

		$verif = $this->userExist($email);
		if ($verif == 0) {
			// Hasher le mot de passe avant de l'enregistrer dans la base de données

			$password = password_hash($password, PASSWORD_DEFAULT);
			$parameters = array($email, $password);
			$request = "INSERT INTO t_user (email, passwordUser) VALUES (?,?)";
			// Exécuter la requête pour enregistrer l'utilisateur dans la base de données

			$connection->executeQuery($request, $parameters);
			return true;
		} else {
			// L'utilisateur existe déjà dans la base de données

			return false;
		}
	}
	/**
	 * Vérifie si l'utilisateur existe dans la base de données.
	 *
	 * @param string $email L'email de l'utilisateur.
	 *
	 * @return int Retourne 1 si l'utilisateur existe, sinon 0.
	 */
	public function userExist($email)
	{
		$connection = Connection::getInstance();
		$requestMail = "SELECT COUNT(*) FROM t_user WHERE email = :email";
		$parametersMail = array('email' => $email);
		// Exécuter la requête pour compter le nombre d'utilisateurs avec l'email donné dans la base de données

		$query = $connection->selectQuery($requestMail, $parametersMail);
		$verif = 1;
		foreach ($query as $data) {
			$verif = $data['COUNT(*)'];
		}

		return $verif;
	}
}
