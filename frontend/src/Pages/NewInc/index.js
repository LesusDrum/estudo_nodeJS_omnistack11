
import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import{Link, useHistory} from 'react-router-dom';

import './style.css';
import api from '../../services/api';

export default function NewInc() {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [value, setValor] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewInc(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('casos', data, {
                headers: {
                    auth: ongId,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Não foi possível cadastrar um novo caso, tente novamente.')
        }

    }

    return (
        <div className="newinc-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar Novo Caso</h1>

                    <p>Descreva o caso detalhadamente para encontrar um herói para ajuda-lo</p>
                    <Link className="backlink" to='/profile'>
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewInc}>
                    <input 
                    placeholder="Título do Caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    
                    <textarea 
                    placeholder="Descrição do Caso"
                    value={description}
                    onChange={e => setDesc(e.target.value)}
                    />


                    <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValor(e.target.value)}
                    />
                        
                   
                    <div className="button-group">
                        <button className="cancel" type="reset">
                            Cancelar
                        </button>

                        <button className="button" type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}