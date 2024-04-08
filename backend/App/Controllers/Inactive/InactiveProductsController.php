<?php

namespace App\Controllers\Inactive;

use App\DAO\VeroCard\Inactive\InactiveProductsDAO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class InactiveProductsController
{
    public function getInactiveProducts(Request $request, Response $response, array $args): Response
    {
        $searchTerm = $request->getParsedBody()['searchTerm'] ?? '';

        $inactiveProductsDAO = new InactiveProductsDAO();

        if (!empty($searchTerm)) {
            $inactiveProducts = $inactiveProductsDAO->searchInactiveProducts($searchTerm);
        } else {
            $inactiveProducts = $inactiveProductsDAO->getAllInactiveProducts();
        }

        $response = $response->withJson($inactiveProducts);
        return $response;
    }
}
