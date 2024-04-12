<?php

namespace App\Controllers\Ruptures;

use App\DAO\VeroCard\Ruptures\RupturesProductsDAO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class RupturesProductsController
{

    public function getRupturesProducts(Request $request, Response $response, array $args): Response
    {
        $searchTerm = $request->getParsedBody()['searchTerm'] ?? '';

        $rupturesProductsDAO = new RupturesProductsDAO();

        if (!empty($searchTerm)) {
            $rupturesProducts = $rupturesProductsDAO->searchRuptureProducts($searchTerm);
        } else {
            $rupturesProducts = $rupturesProductsDAO->getAllRupturesProducts();
        }

        $response = $response->withJson($rupturesProducts);
        return $response;
    }
}
