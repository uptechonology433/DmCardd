<?php

namespace App\Models;

final class RupturesModel
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

    public function setCardType(string $cardType): RupturesModel
    {

        $this -> cardType = $cardType;

        return $this;
    }

    
    public function getSearch(): string
    {
        return $this -> search;
    }

    public function setSearch(string $search): RupturesModel
    {

        $this -> search = $search;

        return $this;
    }




    
}
