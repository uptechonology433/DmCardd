<?php

namespace App\DAO\VeroCard\Production;

use App\DAO\VeroCard\Connection;


class ProductionDAO extends Connection
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getAllProductsInProductionDmCard(): array
    {
        $products = $this->pdo
            ->query("SELECT * from view_dmcard_production;")->fetchAll(\PDO::FETCH_ASSOC);

            foreach ($products as &$product) {
                $product['dt_processamento'] = date('d/m/Y', strtotime($product['dt_processamento']));
    
                switch ($product['status']) {
                    case 6:
                        $product['status'] = 'COFRE';
                        break;
                    case 2:
                        $product['status'] = 'PERSO';
                        break;
                    case 3:
                        $product['status'] = 'MANUSEIO';                
                        break;
                    default:
                        $product['status'] = 'desconhecido';
                        break;
                }
            }
    
            return $products;
        }
    public function getAllProductsInProductionRedeUze(): array
    {
        $products = $this->pdo
            ->query("SELECT * FROM view_redeuze_production;")->fetchAll(\PDO::FETCH_ASSOC);

        foreach ($products as &$product) {
            $product['dt_processamento'] = date('d/m/Y', strtotime($product['dt_processamento']));

            switch ($product['status']) {
                case 6:
                    $product['status'] = 'COFRE';
                    break;
                case 2:
                    $product['status'] = 'PERSO';
                    break;
                case 3:
                    $product['status'] = 'MANUSEIO';                
                    break;
                default:
                    $product['status'] = 'desconhecido';
                    break;
            }
        }

        return $products;
    }
}
