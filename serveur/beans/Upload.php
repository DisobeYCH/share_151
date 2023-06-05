<?php
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
/**
 * La classe Upload représente un objet qui contient des informations sur un fichier téléchargé.
 */
class Upload
{
    private $pk;
    private $title;
    private $fk_rubrique;
    private $file;
    private $descr;

    /**
     * Constructeur de la classe Upload.
     * 
     * @param int $pk_post L'identifiant du fichier.
     * @param string $title Le titre du fichier.
     * @param int $fk_rubrique L'identifiant de la rubrique à laquelle appartient le fichier.
     * @param string $fi Le contenu du fichier.
     * @param string $description La description du fichier.
     */
    public function __construct($pk_post, $title, $fk_rubrique, $fi, $description)
    {
        $this->pk = $pk_post;
        $this->title = $title;
        $this->fk_rubrique = $fk_rubrique;
        $this->file = $fi;
        $this->descr = $description;
    }

    /**
     * Retourne le titre du fichier.
     *
     * @return string Le titre du fichier.
     */
    public function getTitre()
    {
        return $this->title;
    }
    /**
     * Retourne le fichier.
     *
     * @return string Le contenu du fichier.
     */
    public function getFile()
    {
        return $this->file;
    }
    /**
     * Retourne la description du fichier.
     *
     * @return string La description du fichier.
     */
    public function getDescr()
    {
        return $this->descr;
    }

    /**
     * Retourne l'identifiant du fichier.
     *
     * @return int L'identifiant du fichier.
     */
    public function getPkUpload()
    {
        return $this->pk;
    }
    /**
     * Retourne l'identifiant de la rubrique à laquelle appartient le fichier.
     *
     * @return int L'identifiant de la rubrique à laquelle appartient le fichier.
     */
    public function getFkRubrique()
    {
        return $this->fk_rubrique;
    }
    /**
     * Retourne le contenu de l'objet au format XML.
     * @return string Le contenu de l'objet au format XML.
     */
    public function toXML()
    {
        $base64 = base64_encode($this->getFile());
        return "<upload><id>" . $this->getPkUpload() . "</id><title>" . $this->getTitre() . "</title><description>" . $this->getDescr() . "</description><fkRubrique>" . $this->getFkRubrique() . "</fkRubrique><file>" . $base64 . "</file></upload>";
    }
}
