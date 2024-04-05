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
        <Select info={"Selecione um tipo:"} name="activeType" onChange>
          <option selected>Selecione um ativo...</option>
          <option value="Sim">Dm Card</option>
          <option value="Não">Rede Use</option>
        </Select>

        <div className="container-inputs">
          <div className="inputs">
            <Input
              name="fileName"
              placeholder="Arquivo..."
              info="Arquivo:"
             
            />
          </div>

          <div className="inputs">
            <Input
              type="date"
              name="InitialProcessingDate"
              info="Data de processamento inicial:"
             
            />

            <Input
              type="date"
              name="FinalProcessingDate"
              info="Data de processamento final:"
             
            />
          </div>

          <div className="inputs">
            <Input
              type="date"
              name="InitialShippingDate"
              info="Data de expedição inicial:"
              
            />

            <Input
              type="date"
              name="FinalShippingDate"
              info="Data de expedição final:"
             
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageCardsIssued;
