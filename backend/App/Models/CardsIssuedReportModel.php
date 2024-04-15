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
    private $holder;

      /**
     * @var string
     */
    private $accountCode;

    /**
    * @var string
    */
   private $cardCode;

      /**
    * @var string
    */
    private $status;

   

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
    
    public function getHolder(): string
    {
        return $this -> holder;
    }
    
    public function setHolder(string $holder): CardsIssuedReportModel
    {

        $this->holder = $holder; 
        return $this;
    
    }

    public function getAccountCode(): string
    {
        return $this -> accountCode;
    }
    
    public function setAccountCode(string $accountCode): CardsIssuedReportModel
    {

        $this->accountCode = $accountCode; 
        return $this;
    
    }

    public function getCardCode(): string
    {
        return $this -> cardCode;
    }
    
    public function setCardCode(string $cardCode): CardsIssuedReportModel
    {

        $this->cardCode = $cardCode; 
        return $this;
    
    }

    public function getStatus(): string
    {
        return $this -> status;
    }
    
    public function setStatus(string $status): CardsIssuedReportModel
    {

        $this->status = $status; 
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
