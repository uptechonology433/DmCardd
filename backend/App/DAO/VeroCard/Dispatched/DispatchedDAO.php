<?php

namespace App\DAO\VeroCard\Dispatched;
use App\DAO\VeroCard\Connection;


class DispatchedDAO extends Connection{

    public function __construct()
    {
        parent::__construct();
    }

    public function getAllDispatchedDmCard() : array {

        $productsDispatched = $this -> pdo
            ->query("SELECT  * FROM view_dmcard_dispatched;") 
            ->fetchAll(\PDO::FETCH_ASSOC);

          

            return $productsDispatched ;

    }

    public function getAllDispatchedRedeUze() : array {

        $productsDispatched  = $this -> pdo
            ->query("SELECT * from view_redeuze_dispatched;") 
            ->fetchAll(\PDO::FETCH_ASSOC);

           

            return $productsDispatched ;

    }


}