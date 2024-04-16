<?php

namespace App\DAO\VeroCard\AwaitingRelease;
use App\DAO\VeroCard\Connection;


class AwaitingReleaseDAO extends Connection{

    public function __construct()
    {
        parent::__construct();
    }

    public function getAllAwaitingReleaseDmCard() : array {

        $productsAwaitingRelease = $this -> pdo
            ->query("SELECT  * FROM view_dmcard_awaitingrelease") 
            ->fetchAll(\PDO::FETCH_ASSOC);

            foreach ($productsAwaitingRelease as &$product) {
                $product['dt_processamento'] = date('d/m/Y', strtotime($product['dt_processamento']));
              
            }

            return $productsAwaitingRelease;

    }

    public function getAllAwaitingReleaseRedeUze() : array {

        $productsAwaitingRelease = $this -> pdo
            ->query("SELECT * from view_redeuze_awaitingrelease;") 
            ->fetchAll(\PDO::FETCH_ASSOC);

            foreach ($productsAwaitingRelease as &$product) {
                $product['dt_processamento'] = date('d/m/Y', strtotime($product['dt_processamento']));
              
            }

            return $productsAwaitingRelease;

    }


}