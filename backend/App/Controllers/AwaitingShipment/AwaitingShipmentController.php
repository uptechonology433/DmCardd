<?php

namespace App\Controllers\AwaitingShipment;

use App\DAO\VeroCard\AwaitingShipment\AwaitingShipmentDAO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class AwaitingShipmentController
{   
    
    public function AwaitingShipment(Request $request, Response $response, array $args): Response
    {
        
        $productionDAO = new AwaitingShipmentDAO();
        
        $production = [

            $productionDAO -> getAllAwaitingShipmentDmCard(),
            $productionDAO -> getAllAwaitingShipmentRedeUze()

        ];

        
        $response = $response -> withJson($production);

        return $response;
    
    }
}
