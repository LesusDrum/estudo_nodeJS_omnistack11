import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import{Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

import './style.css'

export default function Register () {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            city,
            uf
        };

       try {
        const res = await api.post('ongs', data);

        alert(`Seu Id de acesso é: ${res.data.id}`);

        history.push('/');
       } catch (err) {
        alert("Erro no cadastro, tente novamente.")
       }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>

                    <p>Faça seu cadastro, entre na plataforma e ajude outras pessoas a encontrarem os casos da sua ONG</p>
                    <Link className="backlink" to='/'>
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o Logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da Ong"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Whatsapp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="input-group">
                        <input placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" style={{width: 80}}
                        value={uf}
                        onChange={e => setUF(e.target.value)}/>
                    </div>

                <button className="button" type="submit">
                    Cadastrar
                </button>

                </form>
            </div>
        </div>
    )
}