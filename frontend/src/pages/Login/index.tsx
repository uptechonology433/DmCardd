import React, { useState, useContext } from "react";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { Context } from '../../AuthContext/AuthContext';
import Swal from 'sweetalert2';

const PageLogin: React.FC = () => {
    const { handleLogin }: any = useContext(Context);

    const [passwordVerification, setPasswordVerification] = useState(true);
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const ValidatePassword = () => {
        if (passwordInput.length < 6) {
            setPasswordVerification(false);
            return false;
        }
        setPasswordVerification(true);
        return true;
    }

    const isValidationLogin = () => {
        if (!usernameInput || !passwordInput) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vazios...',
                text: 'Preencha todos os campos para efetuar o login.',
                preConfirm: Button
            });
            return false;
        }
        if (!ValidatePassword())
            return false;
        return true;
    }

    const onConfirmButtonPress = (event: any) => {
        if (event.type === 'click' || event.key === 'Enter') {
            if (!isValidationLogin())
                return;
            handleLogin(usernameInput, passwordInput);
        }
    }

    return (
        <div className="container-page-login">
            <div className="container-login">
                <div className="container-style-uptechnology">
                    <div className="image-logo-up">
                        <img src='https://firebasestorage.googleapis.com/v0/b/project-vero-card-up.appspot.com/o/Logo-up-sem-fundo.png?alt=media&token=bd042517-7333-40ba-a87d-1998b1f382a7&_gl=1*4yttr1*_ga*MTI2OTcyMjI5OS4xNjg5MDc2NDM5*_ga_CW55HF8NVT*MTY5NTkyMzA2MC41LjEuMTY5NTkyMzA4Ni4zNC4wLjA.' alt="Logo up" />
                    </div>
                    <div className="greetings-up">
                        <p>UP! Manager</p>
                    </div>
                    <div className="image-user-login">
                        <img src="https://firebasestorage.googleapis.com/v0/b/project-vero-card-up.appspot.com/o/Userlogin.svg?alt=media&token=db2d57b8-e4a4-489e-9628-0e1b00d6d15e" alt="Logo cliente" />
                    </div>
                </div>
                <div className="container-style-client">
                    <div className="container-logos">
                        <div className="image-logo-client-red">
                            <img src='https://www.vocedm.com.br/portal/assets/logo.webp' alt="Logo up" />
                        </div>
                        <div className="image-logo-up">
                            <img src='https://www.vocedm.com.br/portal/assets/logo.webp' alt="Logo up" />
                        </div>
                    </div>
                    <h1>Entrar</h1>
                    <p>Faça login para iniciar sua sessão</p>
                    <div className="container-inputs-login">
                        <div className="input-name-user">
                            <Input placeholder="Nome de usuário..." onKeyUp={onConfirmButtonPress} info="Nome de usuário:" value={usernameInput} onChange={(text: any) => setUsernameInput(text.target.value)} />
                        </div>
                        <div className="input-password-user">
                            <Input placeholder="Senha..." onKeyUp={onConfirmButtonPress} info="Senha:" icon="visibility" onChange={(text: any) => setPasswordInput(text.target.value)} />
                            <div className="message-error-verification">
                                {!passwordVerification ? <p>A senha deve conter mais de 5 dígitos</p> : null}
                            </div>
                        </div>
                        <Button text="Entrar" onClick={onConfirmButtonPress} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default PageLogin;
