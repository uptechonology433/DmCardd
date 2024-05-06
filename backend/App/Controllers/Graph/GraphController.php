<?php

namespace App\Controllers\Graph;

use App\DAO\VeroCard\Graph\GraphDAO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class GraphController
{
    public function getGraph(Request $request, Response $response, array $args): Response
    {

        $graphDAO = new GraphDAO();

        $production = [
            $graphDAO -> getAllGraphDmcard(),
            $graphDAO -> getAllGraphRedeUze(),
        ];
      
          

        $response = $response->withJson($production);
        return $response;
    }
}
