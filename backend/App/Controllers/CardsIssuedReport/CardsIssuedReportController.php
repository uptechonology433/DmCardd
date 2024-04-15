<?php

namespace App\Controllers\CardsIssuedReport;

use App\DAO\VeroCard\CardsIssuedReport\CardsIssuedReportDAO;
use App\Models\CardsIssuedReportModel;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class CardsIssuedReportController
{

    public function CardsIssuedReport(Request $request, Response $response, array $args): Response
    {

        $data = $request->getParsedBody();

        if (
            empty(trim($data['arquivo'])) &&
            empty(trim($data['titular'])) &&
            empty(trim($data['codigo_conta'])) &&
            empty(trim($data['codigo_cartao'])) &&
            empty(trim($data['desc_status'])) &&
            empty(trim($data['tipo'])) &&
            empty(trim($data['dataInicial'])) &&
            empty(trim($data['dataFinal'])) &&
            empty(trim($data['expedicaoInicial'])) &&
            empty(trim($data['expedicaoFinal']))
        ) {

            try {

                throw new \Exception("Preencha um dos campos para fazer a requisição");
            } catch (\Exception | \Throwable $ex) {

                return $response->withJson([
                    'error' => \Exception::class,
                    'status' => 400,
                    'code' => "002",
                    'userMessage' => 'Campos vazios, preencha um dos campos',
                    'developerMessage' => $ex->getMessage()
                ], 401);
            }
        }

        $CardsIssuedReportModel = new CardsIssuedReportModel();

        $CardsIssuedReportDAO = new CardsIssuedReportDAO();

        $CardsIssuedReportModel
            ->setFile(trim($data['arquivo']))
            ->setHolder(trim($data['titular']))
            ->setAccountCode(trim($data['codigo_conta']))
            ->setCardCode(trim($data['codigo_cartao']))
            ->setStatusInProduction(trim($data['desc_status']))
            ->setStatusDispatched(trim($data['desc_status']))
            ->setCardType(trim($data['tipo']))
            ->setInitialProcessinDate(trim($data['dataInicial']))
            ->setFinalProcessinDate(trim($data['dataFinal']))
            ->setInitialShippingdate(trim($data['expedicaoInicial']))
            ->setFinalShippingdate(trim($data['expedicaoFinal']));


        $CardsIssuedReport = null;
        if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'DmCard') {

            if (!empty(trim($data['arquivo']))) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterFileDmCardDAO($CardsIssuedReportModel);
            } else if (!empty(trim($data['codigo_conta']))) {
                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterAccountCodeDmCardDAO($CardsIssuedReportModel);
            } else if (!empty(trim($data['titular']))) {
                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterHolderDmCardDAO($CardsIssuedReportModel);
            } else if (!empty(trim($data['codigo_cartao']))) {
                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterCardCodeDmCardDAO($CardsIssuedReportModel);
            
            } else if (!empty(trim($data['desc_status'])) && $data['desc_status'] === 'EmProducao') {
                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterStatusInProductionDmCardDAO($CardsIssuedReportModel);

            }else if(!empty(trim($data['desc_status'])) && $data['desc_status'] === 'Expedido'){
                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterStatusDispatichedDmCardDAO($CardsIssuedReportModel);
            } else if (
                !empty(trim($data['dataInicial'])) && !empty(trim($data['dataFinal']))
                && empty(trim($data['expedicaoInicial'])) && empty(trim($data['expedicaoFinal']))
            ) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterDateDmCardDAO($CardsIssuedReportModel);
            } else if (
                !empty(trim($data['expedicaoInicial'])) && !empty(trim($data['expedicaoFinal']))
                && empty(trim($data['dataInicial'])) && empty(trim($data['dataFinal']))
            ) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterShippingDmCardDAO($CardsIssuedReportModel);
            } else if (
                !empty(trim($data['expedicaoInicial'])) && !empty(trim($data['expedicaoFinal']))
                && !empty(trim($data['dataInicial'])) && !empty(trim($data['dataFinal']))
            ) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterDatesInGeneralDmCardDAO($CardsIssuedReportModel);
            } else {

                $CardsIssuedReport = "Preencha os campos corretamente!";
            }
        } else if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'RedeUze') {

            if (!empty(trim($data['arquivo']))) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterFileRedeUzeDAO($CardsIssuedReportModel);
            } else if (!empty(trim($data['titular']))) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterHolderRedeUzeDAO($CardsIssuedReportModel);
            } else if (!empty(trim($data['codigo_conta']))) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterAccountCodeRedeUzeDAO($CardsIssuedReportModel);
            } else if (!empty(trim($data['codigo_cartao']))) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterCardCodeRedeUzeDAO($CardsIssuedReportModel);

            } if (!empty(trim($data['desc_status'])) && $data['desc_status'] === 'EmProducao') {
                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterStatusInProductionRedeUzeDAO($CardsIssuedReportModel);

            }else if(!empty(trim($data['desc_status'])) && $data['desc_status'] === 'Expedido'){
                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterStatusDispatichedRedeUzeDAO($CardsIssuedReportModel);

            } else if (
                !empty(trim($data['dataInicial'])) && !empty(trim($data['dataFinal']))
                && empty(trim($data['expedicaoInicial'])) && empty(trim($data['expedicaoFinal']))
            ) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterDateRedeUzeDAO($CardsIssuedReportModel);
            } else if (
                !empty(trim($data['expedicaoInicial'])) && !empty(trim($data['expedicaoFinal']))
                && empty(trim($data['dataInicial'])) && empty(trim($data['dataFinal']))
            ) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterShippingRedeUzeDAO($CardsIssuedReportModel);
            } else if (
                !empty(trim($data['expedicaoInicial'])) && !empty(trim($data['expedicaoFinal']))
                && !empty(trim($data['dataInicial'])) && !empty(trim($data['dataFinal']))
            ) {

                $CardsIssuedReport = $CardsIssuedReportDAO->getCardsIssuedReportFilterDatesInGeneralRedeUzeDAO($CardsIssuedReportModel);
            } else {

                $CardsIssuedReport = "Preencha os campos corretamente!";
            }
        }

        $response = $response->withJson($CardsIssuedReport);



        return $response;
    }
}
