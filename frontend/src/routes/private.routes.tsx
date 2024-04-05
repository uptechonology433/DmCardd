import PageHome from '../pages/Home';
import PageProductionReport from '../pages/ProductionReport';
import { useContext } from "react";

import PageCardsIssued from '../pages/CardsIssued';
import PageUsers from '../pages/Users';
import { Route, Routes, Outlet } from 'react-router-dom';
import { Context } from '../AuthContext/AuthContext';

import PageStock from '../pages/Stoke';
import PageWaste from '../pages/Waste';
import PageInactive from '../pages/Inactives';
import PageRuptures from '../pages/Ruptures';





const PrivateRouter: React.FC = () => {

    const { authenticated }: any = useContext(Context);
    const { authenticatedAdmin }: any = useContext(Context);


    return (
        <>
            {
                authenticated ?

                    <Routes>
                        < Route path={`${process.env.PUBLIC_URL}/home`} element={< PageHome />} />
                        < Route path={`${process.env.PUBLIC_URL}/relatorio-producao`} element={< PageProductionReport />} />
                        < Route path={`${process.env.PUBLIC_URL}/estoque`} element={< PageStock />} />
                        < Route path={`${process.env.PUBLIC_URL}/cartoes-emitidos`} element={< PageCardsIssued />} />
                        < Route path={`${process.env.PUBLIC_URL}/rejeitos`} element={< PageWaste />} />
                        < Route path={`${process.env.PUBLIC_URL}/inativos`} element={< PageInactive />} />
                        < Route path={`${process.env.PUBLIC_URL}/rupturas`} element={< PageRuptures />} />
                        
                        {authenticatedAdmin ?
                            <>
                                < Route path={`${process.env.PUBLIC_URL}/usuarios`} element={< PageUsers />} />
                               {/*  < Route path={`${process.env.PUBLIC_URL}/emitidos`} element={< PageCardsIssued />} /> */}
                           </>

                            :
                            null
                        }



                        <Route path={`${process.env.PUBLIC_URL}*`} element={<Outlet />} />
                    </Routes >
                    :

                    null
            }
        </>





    )
}

export default PrivateRouter;