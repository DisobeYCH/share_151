<?php
include_once("./wrk/ShowContentBD.php");
include_once('SessionManager.php');
include_once('./services/HttpErrorHandler.php');
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
/**
 * La classe ShowContentManager gère l'affichage de contenu à partir de la base de données.
 */
class ShowContentManager
{
	/**
	 * Récupère le contenu d'une rubrique à partir de son identifiant.
	 *
	 * @param int $id L'identifiant de la rubrique.
	 *
	 * @return string Le contenu de la rubrique au format XML.
	 */
	public function readContent($id)
	{
		$content = new ShowContentBD();
		$session = new SessionManager();
		$session->setLastRubrique($id);
		return $content->getInXML($id);
	}
	/**
	 * Récupère le contenu de la  rubrique visitée.
	 *
	 * @return string Le contenu de la rubrique visitée au format XML.
	 */
	public function returnRubrique()
	{
		$session = new SessionManager();
		$content = new ShowContentBD();
		$rubrique  = $session->getLasRubrique();

		return $content->getInXML($rubrique);
	}
	/**
	 * Récupère le contenu de toutes les rubriques.
	 *
	 * @return string Le contenu de toutes les rubriques au format XML.
	 * 
	 * @throws HttpErrorHandler Si l'utilisateur n'est pas connecté (erreur HTTP 403).
	 */
	public function toutesRubriques()
	{
		$session = new SessionManager();
		if (!$session->isLoggedIn()) {
			$error = new HttpErrorHandler();

			return $error->setHttpError(403, "Vous n'etes pas connecté");
		}
		$content = new ShowContentBD();
		return $content->toutesRubriquesInXML();
	}
	/**
	 * Récupère le contenu de tous les posts.
	 *
	 * @return string Le contenu de tous les posts au format XML.
	 * 
	 * @throws HttpErrorHandler Si l'utilisateur n'est pas connecté (erreur HTTP 403).
	 */
	public function tousUpload()
	{
		$session = new SessionManager();
		if (!$session->isLoggedIn()) {
			$error = new HttpErrorHandler();

			return $error->setHttpError(403, "Vous n'etes pas connecté");
		}
		$content = new ShowContentBD();
		return $content->tousPostsXml();
	}
}
