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
        <Select info={"Selecione um Tipo:"} name="activeType" onChange>
          <option selected>Selecione um Tipo...</option>
          <option value="Sim">Dm Card</option>
          <option value="Não">Rede Use</option>
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
            <Input
              name="descriçãoStatus"
              placeholder="Status Descrição..."
              info="Status Descrição:"
            />
            <Input
              name="tipoEnvio"
              placeholder="Tipo Envio..."
              info="Tipo Envio:"
            />
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
