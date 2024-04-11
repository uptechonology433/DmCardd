<?php

namespace App\Controllers\Waste;

use App\DAO\VeroCard\Waste\WasteProductsDAO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class WasteProductsController
{
    public function getWasteProducts(Request $request, Response $response, array $args): Response
    {
        $searchTerm = $request->getParsedBody()['searchTerm'] ?? '';

        $wasteProductsDAO = new WasteProductsDAO();

        if (!empty($searchTerm)) {
            $wasteProducts = $wasteProductsDAO->searchWasteProducts($searchTerm);
        } else {
            $wasteProducts = $wasteProductsDAO->getAllWasteProducts();
        }

        $response = $response->withJson($wasteProducts);
        return $response;
    }
}
