<?php

namespace App\Controllers\Ruptures;

use App\DAO\VeroCard\Ruptures\RupturesProductsDAO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class RupturesProductsController
{
    private $rupturesProductsDAO;

    public function __construct(RupturesProductsDAO $rupturesProductsDAO)
    {
        $this->rupturesProductsDAO = $rupturesProductsDAO;
    }

    public function handleProductionReport(Request $request, Response $response, array $args): Response
    {
        $reportType = $request->getQueryParams()['reportType'] ?? '';

        switch ($reportType) {
            case 'dmcard':
            case 'redeuze':
                $searchTerm = $request->getQueryParams()['searchTerm'] ?? '';
                $rupturesProducts = $this->rupturesProductsDAO->searchRupturesProducts($reportType, $searchTerm);
                break;
            default:
                // Handle unknown report type
                $response->getBody()->write("Unknown report type");
                return $response->withStatus(400);
        }

        // Return the response with JSON data
        return $response->withJson($rupturesProducts);
    }
}
