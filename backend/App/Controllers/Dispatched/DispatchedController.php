<?php

namespace App\Controllers\Dispatched;

use App\DAO\VeroCard\Dispatched\DispatchedDAO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class DispatchedController
{   
    
    public function Dispatched(Request $request, Response $response, array $args): Response
    {
        
        $productionDAO = new DispatchedDAO();
        
        $production = [

            $productionDAO -> getAllDispatchedDmCard(),
            $productionDAO -> getAllDispatchedRedeUze()

        ];

        
        $response = $response -> withJson($production);

        return $response;
    
    }
}
