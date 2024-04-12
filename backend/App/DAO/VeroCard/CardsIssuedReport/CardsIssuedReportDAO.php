<?php

namespace App\DAO\VeroCard\CardsIssuedReport;

use App\DAO\VeroCard\Connection;
use App\Models\CardsIssuedReportModel;

class CardsIssuedReportDAO extends Connection
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getCardsIssuedReportFilterFileDmCardDAO(CardsIssuedReportModel $CardsIssuedReportModel): array
    {

        $statement = $this->pdo->prepare("SELECT titular, nr_cartao,rastreio,
        codigo_conta,desc_status,
         to_char(dt_op, 'DD/MM/YYYY') AS dt_op, 
         to_char(dt_expedicao, 'DD/MM/YYYY') AS dt_expedicao,
         nome_arquivo_proc,
        total_cartoes, status from view_dmcard_relatorio_cartoes WHERE nome_arquivo_proc = :arquivo");

        $statement->execute(['arquivo' => $CardsIssuedReportModel->getFile()]);

        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

        return $response;
    }

    public function getCardsIssuedReportFilterDateDmCardDAO(CardsIssuedReportModel $CardsIssuedReportModel): array
    {

        $statement = $this->pdo->prepare("SELECT  titular, nr_cartao,rastreio,
        codigo_conta,desc_status,
         to_char(dt_op, 'DD/MM/YYYY') AS dt_op,
         to_char(dt_expedicao, 'DD/MM/YYYY') AS dt_expedicao,
         nome_arquivo_proc,
        total_cartoes, status from view_dmcard_relatorio_cartoes where dt_op BETWEEN :datainicial AND :datafinal ;");

        $statement->execute(['datainicial' => $CardsIssuedReportModel->getInitialProcessinDate(), 'datafinal' => $CardsIssuedReportModel->getFinalProcessinDate()]);

        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

        return $response;
    }

    public function getCardsIssuedReportFilterShippingDmCardDAO(CardsIssuedReportModel $CardsIssuedReportModel): array
    {
        $statement = $this->pdo->prepare("SELECT titular, nr_cartao,rastreio,
        codigo_conta,desc_status,
         to_char(dt_op, 'DD/MM/YYYY') AS dt_op, 
         to_char(dt_expedicao, 'DD/MM/YYYY') AS dt_expedicao,
         nome_arquivo_proc,
        total_cartoes, status from view_dmcard_relatorio_cartoes where dt_expedicao BETWEEN :expedicaoinicial AND :expedicaofinal ;");

        $statement->execute(['expedicaoinicial' => $CardsIssuedReportModel->getInitialShippingdate(), 'expedicaofinal' => $CardsIssuedReportModel->getFinalShippingdate()]);

        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

        return $response;
    }


    public function getCardsIssuedReportFilterDatesInGeneralDmCardDAO(CardsIssuedReportModel $CardsIssuedReportModel): array
    {
        $statement = $this->pdo->prepare("SELECT 
         titular, nr_cartao,rastreio,
        codigo_conta,desc_status,
         to_char(dt_op, 'DD/MM/YYYY') AS dt_op,
         to_char(dt_expedicao, 'DD/MM/YYYY') AS dt_expedicao,
         nome_arquivo_proc,
        total_cartoes, status from view_dmcard_relatorio_cartoes where dt_expedicao BETWEEN :expedicaoinicial AND :expedicaofinal OR dt_op BETWEEN :datainicial AND :datafinal;");

        $statement->execute(['expedicaoinicial' => $CardsIssuedReportModel->getInitialShippingdate(), 'expedicaofinal' => $CardsIssuedReportModel->getFinalShippingdate(), 'datainicial' => $CardsIssuedReportModel->getInitialProcessinDate(), 'datafinal' => $CardsIssuedReportModel->getFinalProcessinDate()]);

        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

        return $response;
    }

    public function getCardsIssuedReportFilterFileRedeUzeDAO(CardsIssuedReportModel $CardsIssuedReportModel): array
    {

        $statement = $this->pdo->prepare("SELECT  titular, nr_cartao,rastreio,
        codigo_conta,desc_status,
         to_char(dt_op, 'DD/MM/YYYY') AS dt_op, 
         to_char(dt_expedicao, 'DD/MM/YYYY') AS dt_expedicao,
         nome_arquivo_proc,
        total_cartoes, status from view_redeuze_relatorio_cartoes WHERE nome_arquivo_proc = :arquivo");

        $statement->execute(['arquivo' => $CardsIssuedReportModel->getFile()]);

        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

        return $response;
    }

    public function getCardsIssuedReportFilterDateRedeUzeDAO(CardsIssuedReportModel $CardsIssuedReportModel): array
    {

        $statement = $this->pdo->prepare("SELECT  titular, nr_cartao,rastreio,
        codigo_conta,desc_status,
         to_char(dt_op, 'DD/MM/YYYY') AS dt_op, 
         to_char(dt_expedicao, 'DD/MM/YYYY') AS dt_expedicao,
         nome_arquivo_proc,
        total_cartoes, status  from view_redeuze_relatorio_cartoes  where dt_op BETWEEN :datainicial AND :datafinal ;");

        $statement->execute(['datainicial' => $CardsIssuedReportModel->getInitialProcessinDate(), 'datafinal' => $CardsIssuedReportModel->getFinalProcessinDate()]);

        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

        return $response;
    }

    public function getCardsIssuedReportFilterShippingRedeUzeDAO(CardsIssuedReportModel $CardsIssuedReportModel): array
    {
        $statement = $this->pdo->prepare("SELECT  titular, nr_cartao,rastreio,
        codigo_conta,desc_status,
         to_char(dt_op, 'DD/MM/YYYY') AS dt_op,  
         to_char(dt_expedicao, 'DD/MM/YYYY') AS dt_expedicao,
         nome_arquivo_proc,
        total_cartoes, status from view_redeuze_relatorio_cartoes  where dt_expedicao BETWEEN :expedicaoinicial AND :expedicaofinal ;");

        $statement->execute(['expedicaoinicial' => $CardsIssuedReportModel->getInitialShippingdate(), 'expedicaofinal' => $CardsIssuedReportModel->getFinalShippingdate()]);

        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

        return $response;
    }


    public function getCardsIssuedReportFilterDatesInGeneralRedeUzeDAO(CardsIssuedReportModel $CardsIssuedReportModel): array
    {
        $statement = $this->pdo->prepare("SELECT titular, nr_cartao,rastreio,
        codigo_conta,desc_status,
         to_char(dt_op, 'DD/MM/YYYY') AS dt_op, 
         to_char(dt_expedicao, 'DD/MM/YYYY') AS dt_expedicao,
         nome_arquivo_proc,
        total_cartoes, status FROM view_redeuze_relatorio_cartoes  where dt_expedicao BETWEEN :expedicaoinicial AND :expedicaofinal OR dt_op BETWEEN :datainicial AND :datafinal;");

        $statement->execute(['expedicaoinicial' => $CardsIssuedReportModel->getInitialShippingdate(), 'expedicaofinal' => $CardsIssuedReportModel->getFinalShippingdate(), 'datainicial' => $CardsIssuedReportModel->getInitialProcessinDate(), 'datafinal' => $CardsIssuedReportModel->getFinalProcessinDate()]);

        $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

        return $response;
     }
}
