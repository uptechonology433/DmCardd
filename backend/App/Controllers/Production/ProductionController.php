<?php
namespace App\Controllers\Production;
use App\DAO\VeroCard\Production\ProductionDAO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class ProductionController
{   

    public function Productsinproduction(Request $request, Response $response, array $args): Response
    {

        $data = $request->getParsedBody();
        strtoupper(trim($data['tipo'])); 
      
        
        $productionDAO = new ProductionDAO();
        

        if($data['tipo'] == 'dmcard'){
            
            $production = $productionDAO -> getAllProductsInProductionDmCard($data['tipo']);

        }elseif ($data['tipo'] == 'redeuze'){

            $production = $productionDAO -> getAllProductsInProductionRedeUze($data['tipo']);
    }

       
        
        $response = $response -> withJson($production);

        return $response;
    }
}

?>