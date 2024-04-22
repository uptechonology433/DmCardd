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

      
            $graph = $graphDAO->getAllGraph();
        

        $response = $response->withJson($graph);
        return $response;
    }
}
