<?php

namespace App\DAO\VeroCard\MonthReport;

use App\DAO\VeroCard\Connection;

class MonthReportDAO extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllMonthReport(): array
    {
        $monthReport = $this->pdo
            ->query("SELECT * FROM vw_ordens_producao_mes_atual_dmcard")
            ->fetchAll(\PDO::FETCH_ASSOC);

        return $monthReport;
    }

   
}
