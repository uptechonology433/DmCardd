import React, { useEffect, useState, useRef } from "react";
import NavBarClient from "../../components/layout/NavBarClient";
import DefaultHeader from "../../components/layout/DefaultHeader";
import Input from "../../components/shared/Input";
import Table from "../../components/shared/Table";
import DownloadFacilitators from "../../components/layout/DownloadFacilitators";
import Icon from "../../components/shared/Icon";
import api from "../../connectionAPI";
import ModalUsers from "../../components/layout/ModalUsers";
import Swal from "sweetalert2";
import { useDownloadExcel } from "react-export-table-to-excel";
import { isValidEmail } from "../../utils/Validation";
import Select from "../../components/shared/Select";


const PageRuptures: React.FC = () => {

    const [users, setUsers] = useState([]);

    const [searchUserText, setSearchUserText] = useState('');

    const [editDataUser, setEditdatauser] = useState([]);

    const [emailVerification, setEmailVerification] = useState(true);

    const [modal, setModal] = useState(false);

    useEffect(() => {

        const UsersPageRequests = async () => {

            await api.post('/searchUser', {
                email: ""
            })
                .then((data) => {
                    setUsers(data.data);
                }).catch((error) => {
                    console.log(error)
                });
        }

        UsersPageRequests()

    }, []);

    const handleModal = () => setModal(!modal)

    const DeleteUser = async (id: any) => {

        Swal.fire({
            title: 'Deseja deletar esse usuário?',
            text: "Essa ação é inreversível!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!'

        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire(
                    'Deletado!',
                    'O usuario foi deletado com sucesso.',
                    'success'
                )
                setTimeout(() => {
                    api.delete(`/users/${id}`)
                        .then(() => {
                            window.location.reload();
                        }).catch(() => {

                        });
                }, 1000);

            }
        })


    }

    const EditUser = (user: any) => {
        setEditdatauser(user)
        handleModal()

    }

    const AddUser = () => {
        setEditdatauser([])
        handleModal()
    }

    const ValidateEmailInput = () => {

        if (!isValidEmail(searchUserText)) {

            setEmailVerification(false);

            return false
        }

        setEmailVerification(true);

        return true;
    }

    const searchUser = async () => {

        if (searchUserText && emailVerification) {
            await api.post('/searchUser', {
                email: searchUserText
            })
                .then((data) => {
                    setUsers([])
                    setUsers(data.data);
                }).catch((error) => {
                    console.log(error)
                });
        } else {
            return
        }

    }

    const tableRef: any = useRef();

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Usuarios VeroCard",
        sheet: "Usuarios VeroCard"
    })



    return (

        <>

            <DefaultHeader sessionTheme="Rupturas" />
            <div className="container-ruptures">
                <div className="inputs-info-products">
                <Select info={"Selecione um Tipo:"} name="cardType" onChange={""}>
                            <option selected>Selecione um Tipo...</option>
                            <option value="DmCard">Dm Card</option>
                            <option value="RedeUze">Rede Uze</option>
                        </Select>
                    <Input
                        name="searchTerm"
                        info="Código ou Descrição do Produto:"
                        placeholder="Produto..."
                        value={""}
                      
                    />
                </div>
                <DownloadFacilitators excelClick={() => onDownload()} printClick={() => window.print()} textButton={'Pesquisar'} />

            </div>


           

        </>

    )
    
}

export default PageRuptures