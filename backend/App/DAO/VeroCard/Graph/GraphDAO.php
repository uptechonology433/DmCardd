<?php

namespace App\DAO\VeroCard\Graph;

use App\DAO\VeroCard\Connection;

class GraphDAO extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllGraphDmcard(): array
    {
        $graph = $this->pdo
            ->query("SELECT * FROM view_dmcard_grafico_site")
            ->fetchAll(\PDO::FETCH_ASSOC);

        return $graph;
    }

    
    public function getAllGraphRedeUze(): array
    {
        $graph = $this->pdo
            ->query("SELECT * FROM view_redeuze_grafico_site")
            ->fetchAll(\PDO::FETCH_ASSOC);

        return $graph;
    }

   
}
