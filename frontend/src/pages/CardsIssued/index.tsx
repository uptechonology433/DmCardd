import React from "react";
import DefaultHeader from "../../components/layout/DefaultHeader";
import DownloadFacilitators from "../../components/layout/DownloadFacilitators";
import Input from "../../components/shared/Input";
import Select from "../../components/shared/Select";

const PageCardsIssued: React.FC = () => {
  return (
    <>
      <DefaultHeader sessionTheme="Cartões emitidos" />

      <div className="container-production-report">
        
        <Select info={"Selecione um Tipo:"} name="cardType" onChange>
          <option selected>Selecione um Tipo...</option>
          <option value="DmCard">Dm Card</option>
          <option value="RedeUze">Rede Uze</option>
        </Select>

        <div className="container-inputs">
          <div className="inputs">
            <Input
              name="fileName"
              placeholder="Titular..."
              info="Titular:"
              
              />
            <Input
              name="codigoConta"
              placeholder="Código Conta..."
              info="Código Conta"
            />
          </div>

          <div className="inputs">
            <Select info={"Descrição Status:"} name="cardType" onChange>
              <option selected>Descrição Status...</option>
              <option value="EmProdução">Em Produção</option>
              <option value="Expedido">Expedido</option>
            </Select>
            <Select info={"Tipo de Envio:"} name="cardType" onChange>
              <option selected>Tipo de Envio...</option>
              <option value="AdmTotal">Administradora-Total</option>
              <option value="AdmCS">Administradora-Carta Simples</option>
              <option value="CFC">Cliente-Flash Courier</option>
              <option value="CCR">Cliente-Carta Registrada</option>
              <option value="CCS">Cliente-Carta Simples</option>
            </Select>
          </div>

          <div className="inputs">
            <Input
              type="date"
              name="InitialShippingDate"
              info="Data de Expedição Inicial:"
            />
            <Input
              type="date"
              name="FinalShippingDate"
              info="Data de Expedição Final:"
            />
            </div>

          <div className="inputs">
            <Input
              type="date"
              name="InitialProcessingDate"
              info="Data de Processamento Inicial:"
            />
            <Input
              type="date"
              name="FinalProcessingDate"
              placeholder="Data processamento final.."
              info="Data de Processmento Final:"
            />
          </div>

          <div className="inputs">
            <Input
              name="Código Cartão:"
              placeholder="Código Cartão..."
              info="Código Cartão:"
            />
          </div>

          <DownloadFacilitators textButton="Pesquisar" />

        </div>
      </div>
    </>
  );
};
export default PageCardsIssued;
