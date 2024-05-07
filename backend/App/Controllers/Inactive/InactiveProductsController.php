<?php

namespace App\Controllers\Inactive;

use App\DAO\VeroCard\Inactive\InactiveProductsDAO;
use App\Models\InactiveModel;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class InactiveProductsController
{
    public function InactiveProducts(Request $request, Response $response, array $args): Response
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

        $inactiveProductsModel = new InactiveModel();
        $inactiveProductsDAO = new InactiveProductsDAO();

        $inactiveProductsModel
            ->setCardType(trim($data['tipo']))
            ->setSearch(trim($data['search']));
           
            $productionInactive = null;

        if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'All') {

                if (!empty(trim($data['search']))){
                    $productionInactive = $inactiveProductsDAO-> getAllInactive_DmCard_RedeUze_Search($inactiveProductsModel);
                }else{
                    $productionInactive = $inactiveProductsDAO->getAllInactive_DmCard_RedeUze($inactiveProductsModel);
                }  

            } else if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'DmCard') {

                if (!empty(trim($data['search']))){
                    $productionInactive = $inactiveProductsDAO-> getAllInactiveDmCard_Search($inactiveProductsModel);
                }else{
                    $productionInactive = $inactiveProductsDAO->getAllInactiveDmCard($inactiveProductsModel);
                }  
               
            } else if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'RedeUze') {

                if (!empty(trim($data['search']))){
                    $productionInactive = $inactiveProductsDAO-> getAllInactiveRedeUze_Search($inactiveProductsModel);
                }else{
                    $productionInactive = $inactiveProductsDAO->getAllInactiveRedeUze($inactiveProductsModel);
                }  
            }
            $response = $response->withJson($productionInactive);
            return $response;
    }
    
}
