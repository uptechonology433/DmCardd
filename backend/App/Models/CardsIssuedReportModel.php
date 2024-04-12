<?php

namespace App\Models;

final class CardsIssuedReportModel
{
    /**
     * @var string
     */
    private $file;

     /**
     * @var string
     */
    private $cardType;
    /**
     * @var string
     */
    private $initialProcessinDate;
    /**
     * @var string
     */
    private $finalProcessinDate;
    /**
     * @var string
     */
    private $initialshippingdate;
    /**
     * @var string
     */
    private $finalshippingdate;



    public function getFile(): string
    {
        return $this -> file;
    }

    public function setFile(string $file): CardsIssuedReportModel
    {

        $this -> file = $file;

        return $this;
    }

    public function getCardType(): string
    {
        return $this -> cardType;
    }

    public function setCardType(string $cardType): CardsIssuedReportModel
    {

        $this -> cardType = $cardType;

        return $this;
    }

    public function getInitialProcessinDate(): string
    {
        return $this -> initialProcessinDate;
    }

    public function setInitialProcessinDate(string $initialProcessinDate): CardsIssuedReportModel
    {

        $this-> initialProcessinDate = $initialProcessinDate;

        return $this;
    }

    public function getFinalProcessinDate(): string
    {
        return $this -> finalProcessinDate;
    }

    public function setFinalProcessinDate(string $finalProcessinDate): CardsIssuedReportModel
    {

        $this-> finalProcessinDate = $finalProcessinDate;

        return $this;
    }

    public function getInitialShippingdate(): string
    {
        return $this -> initialshippingdate;
    }

    public function setInitialShippingdate(string $initialshippingdate): CardsIssuedReportModel
    {

        $this-> initialshippingdate = $initialshippingdate;

        return $this;
    }

    public function getFinalShippingdate(): string
    {
        return $this -> finalshippingdate;
    }

    public function setFinalShippingdate(string $finalshippingdate): CardsIssuedReportModel
    {
        $this-> finalshippingdate = $finalshippingdate;

        return $this;
    }

    
}
