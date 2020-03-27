import React, {useEffect, useState} from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import{Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

import './style.css';

export default function Profile() {
    const ongNome = localStorage.getItem('ongNome');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                auth: ongId,
            }
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ongId]);

    async function handleDelInc(id) {
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    auth: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    async function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo {ongNome}</span>
               <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
               <button type="button"
               onClick={handleLogout}>
                <FiPower size={20} color="#A8A8B3"/>
               </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>
                    
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>
                    
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', 
                    {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button type="button"
                    onClick={() => {handleDelInc(incident.id)}}>
                    <FiTrash2 size={18} color="#999"/>
                    </button>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}