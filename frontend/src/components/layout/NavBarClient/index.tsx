import React, { useState, useContext } from 'react';
import Icon from '../../shared/Icon';
import { Link } from 'react-router-dom';
import { Context } from '../../../AuthContext/AuthContext';

const NavBarClient: React.FC = () => {
    const [sideBar, setSideBar] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);

    const { authenticatedAdmin }: any = useContext(Context);
    const { handleLogout }: any = useContext(Context);

    const showSidebar = () => setSideBar(!sideBar);

    const toggleSubMenu = () => setShowSubMenu(!showSubMenu);

    return (
        <header>
            <nav>
                <div className="image-logo-client-white">
                    <img src='https://www.dmcard.com.br/portal/assets/logo-md.webp' alt="Logo up" />
                </div>
                <Icon name='menu' onClick={showSidebar} />
                <ul className="nav-list">
                    <li className='li-principal'><Link to={`${process.env.PUBLIC_URL}/home`}>Home</Link></li>
                    <li className='li-principal'><Link to={`${process.env.PUBLIC_URL}/relatorio-producao`}>Relatorio de Produção</Link></li>
                    <li className="dropdown li-principal" >
                        <span onClick={toggleSubMenu}>Insumos</span>
                        {showSubMenu && (
                            <div className="submenu">
                                <ul>
                                    <li><Link className='select' to={`${process.env.PUBLIC_URL}/estoque`}>Estoques</Link></li>
                                    <li><Link className='select' to={`${process.env.PUBLIC_URL}/rejeitos`}>Rejeitos</Link></li>
                                    <li><Link className='select' to={`${process.env.PUBLIC_URL}/inativos`}>Inativos</Link></li>
                                    <li><Link className='select' to={`${process.env.PUBLIC_URL}/rupturas`}>Rupturas</Link></li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li className='li-principal'><Link to={`${process.env.PUBLIC_URL}/cartoes-emitidos`}>Cartões emitido</Link></li>
                    {authenticatedAdmin && (
                        <li className='li-principal'><Link to={`${process.env.PUBLIC_URL}/usuarios`}>Admin users</Link></li>
                    )}
                    <div className='container-logout-icon'>
                        <li className='li-principal'><Icon name='logout' onClick={handleLogout} /></li>
                    </div>
                </ul>
            </nav>

            {sideBar && (
                <div className='container-sadbar'>
                    <div className='container-icon-close'>
                        <Icon name='close' onClick={showSidebar} />
                    </div>
                    <ul className="nav-list">
                        <li><Link to={`${process.env.PUBLIC_URL}/home`}>Home</Link></li>
                        <li><Link to={`${process.env.PUBLIC_URL}/relatorio-producao`}>Relatorio de Produção</Link></li>
                        <div className="dropdown">
                            <span className='insumos' onClick={toggleSubMenu}>Insumos</span>
                            {showSubMenu && (
                                <div className="submenu">
                                    <ul>
                                        <li><Link to={`${process.env.PUBLIC_URL}/estoque`}>Estoque</Link></li>
                                        <li><Link to={`${process.env.PUBLIC_URL}/rejeitos`}>Rejeitos</Link></li>
                                        <li><Link to={`${process.env.PUBLIC_URL}/estoque`}>Inativos</Link></li>
                                        <li><Link to={`${process.env.PUBLIC_URL}/rupturas`}>Rupturas</Link></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        {authenticatedAdmin && (
                            <li><Link to={`${process.env.PUBLIC_URL}/usuarios`}>Admin users</Link></li>
                        )}
                        <li><Icon name='logout' onClick={handleLogout} /></li>
                    </ul>
                </div>
            )}
        </header>
    )
}

export default NavBarClient;
