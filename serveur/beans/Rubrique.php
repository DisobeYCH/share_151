<?php
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
/**
 * Classe représentant une rubrique.
 */
class Rubrique
{
    private $pk_rubrique;
    private $nom;
    private $fk_parent;

    /**
     * Constructeur de la classe Rubrique.
     * 
     * @param int    $pk_rubrique Identifiant de la rubrique.
     * @param string $nom         Nom de la rubrique.
     * @param int    $fk_parent   Identifiant de la rubrique parente.
     */
    public function __construct($pk_rubrique, $nom, $fk_parent)
    {
        $this->pk_rubrique = $pk_rubrique;
        $this->nom = $nom;
        $this->fk_parent = $fk_parent;
    }

    /**
     * Retourne le nom de la rubrique.
     *
     * @return string Nom de la rubrique.
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Retourne l'identifiant de la rubrique.
     *
     * @return int Identifiant de la rubrique.
     */
    public function getPkRubrique()
    {
        return $this->pk_rubrique;
    }
    /**
     * Retourne l'identifiant de la rubrique parente.
     *
     * @return int Identifiant de la rubrique parente.
     */
    public function getFkParent()
    {
        return $this->fk_parent;
    }

    /**
     * Retourne le contenu de la rubrique au format XML.
     *
     * @return string Contenu de la rubrique au format XML.
     */

    public function toXML()
    {

        return "<rubrique><id>" . $this->getPkRubrique() . "</id><nom>" . $this->getNom() . "</nom><fk>" . $this->getFkParent() . "</fk></rubrique>";
    }
}
