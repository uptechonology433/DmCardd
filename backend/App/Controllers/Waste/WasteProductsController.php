<?php

namespace App\Controllers\Waste;

use App\DAO\VeroCard\Waste\WasteProductsDAO;
use App\Models\WasteModel;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class WasteProductsController
{
    public function WasteProducts(Request $request, Response $response, array $args): Response
    {

        $data = $request->getParsedBody();
        
        if(
            empty(trim($data['tipo'])) &&
            empty(trim($data['search']))
        ){
            
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

        $wasteProductsModel = new WasteModel();
        $wasteProductsDAO = new WasteProductsDAO();

        $wasteProductsModel
            ->setCardType(trim($data['tipo']))
            ->setSearch(trim($data['search']));
           
            $productionWaste = null;

        if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'All') {

                if (!empty(trim($data['search']))){
                    $productionWaste = $wasteProductsDAO-> getAllWaste_DmCard_RedeUze_Search($wasteProductsModel);
                }else{
                    $productionWaste = $wasteProductsDAO->getAllWaste_DmCard_RedeUze($wasteProductsModel);
                }  

            } else if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'DmCard') {

                if (!empty(trim($data['search']))){
                    $productionWaste = $wasteProductsDAO-> getAllWasteDmCard_Search($wasteProductsModel);
                }else{
                    $productionWaste = $wasteProductsDAO->getAllWasteDmCard($wasteProductsModel);
                }  
               
            } else if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'RedeUze') {

                if (!empty(trim($data['search']))){
                    $productionWaste = $wasteProductsDAO-> getAllWasteRedeUze_Search($wasteProductsModel);
                }else{
                    $productionWaste = $wasteProductsDAO->getAllWasteRedeUze($wasteProductsModel);
                }  
            }
            $response = $response->withJson($productionWaste);
            return $response;
    }
    
}
