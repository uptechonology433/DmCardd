<?php

namespace App\Models;

final class WasteModel
{
     /**
     * @var string
     */
    private $cardType;

      /**
     * @var string
     */
    private $search;


    public function getCardType(): string
    {
        return $this -> cardType;
    }

    public function setCardType(string $cardType): WasteModel
    {

        $this -> cardType = $cardType;

        return $this;
    }

    
    public function getSearch(): string
    {
        return $this -> search;
    }

    public function setSearch(string $search): WasteModel
    {

        $this -> search = $search;

        return $this;
    }




    
}
