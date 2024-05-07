<?php

namespace App\Models;

final class InactiveModel
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

    public function setCardType(string $cardType): InactiveModel
    {

        $this -> cardType = $cardType;

        return $this;
    }

    
    public function getSearch(): string
    {
        return $this -> search;
    }

    public function setSearch(string $search): InactiveModel
    {

        $this -> search = $search;

        return $this;
    }




    
}
