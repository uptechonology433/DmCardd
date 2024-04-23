<?php

namespace App\Controllers\MonthReport;

use App\DAO\VeroCard\MonthReport\MonthReportDAO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class MonthReportController
{
    public function getMontReport(Request $request, Response $response, array $args): Response
    {

        $montReportDAO = new MonthReportDAO();

      
            $montReport = $montReportDAO->getAllMonthReport();
        

        $response = $response->withJson($montReport);
        return $response;
    }
}
