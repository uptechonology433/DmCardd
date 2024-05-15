<?php

namespace App\Controllers\Ruptures;

use App\DAO\VeroCard\Ruptures\RupturesProductsDAO;
use App\Models\RupturesModel;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;

final class RupturesProductsController
{

    public function RupturesProducts(Request $request, Response $response, array $args): Response
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

        $rupturesProductsModel = new RupturesModel();
        $rupturesProductsDAO = new RupturesProductsDAO();

        $rupturesProductsModel
            ->setCardType(trim($data['tipo']))
            ->setSearch(trim($data['search']));
           
            $productionRuptures = null;

        if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'All') {

                if (!empty(trim($data['search']))){
                    $productionRuptures = $rupturesProductsDAO-> getAllRuptures_DmCard_RedeUze_Search($rupturesProductsModel);
                }else{
                    $productionRuptures = $rupturesProductsDAO->getAllRuptures_DmCard_RedeUze($rupturesProductsModel);
                }  

            } else if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'dmcard') {

                if (!empty(trim($data['search']))){
                    $productionRuptures = $rupturesProductsDAO-> getAllRupturesDmCard_Search($rupturesProductsModel);
                }else{
                    $productionRuptures = $rupturesProductsDAO->getAllRupturesDmCard($rupturesProductsModel);
                }  
               
            } else if (!empty(trim($data['tipo'])) &&  $data['tipo']  === 'redeuze') {

                if (!empty(trim($data['search']))){
                    $productionRuptures = $rupturesProductsDAO-> getAllRupturesRedeUze_Search($rupturesProductsModel);
                }else{
                    $productionRuptures = $rupturesProductsDAO->getAllRupturesRedeUze($rupturesProductsModel);
                }  
            }
            $response = $response->withJson($productionRuptures);
            return $response;
    }
}
