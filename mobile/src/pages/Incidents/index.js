import React, { useState, useEffect } from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import logoImg from '../../assets/logo.png' 
import styles from './styles'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setInc] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoad] = useState(false);

    function toDetail(incidents) {
        navigation.navigate('Details', {incidents});
    };

    async function loadInc() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length == total) {
            return;
        }

        setLoad(true);

        const res = await api.get('casos', {
            params: {page}
        });

        setInc([... incidents, ... res.data]);
        setTotal(res.headers['x-total-count'])
        setPage(page + 1);
        setLoad(false);
    };

    useEffect(() => {
        loadInc();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} Casos</Text>.
                </Text>
            </View>
            
                <Text style={styles.title}>Bem Vindo!</Text>
                <Text style={styles.desc}>Escolha um dos casos abaixo e salve o dia.</Text>
           
            <FlatList 
            data ={incidents}
            style={styles.incidentList}
            keyExtractor={incidents => String(incidents.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadInc}
            onEndReachedThreshold={0.2}
            renderItem={({item: incidents}) => (
                <View style={styles.incident}>

                    <Text style={styles.incidentProp}>ONG</Text>
                    <Text style={styles.incidentValue}>{incidents.nome}</Text>

                    <Text style={styles.incidentProp}>Descrição</Text>
                    <Text style={styles.incidentValue}>{incidents.description}</Text>

                    <Text style={styles.incidentProp}>Valor</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', 
                    {style: 'currency', currency: 'BRL'}).format(incidents.value)}</Text>

                    <TouchableOpacity 
                        style={styles.detailsBtn}
                        onPress={() => toDetail(incidents)}>
                            <Text style={styles.detailsBtnText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color='#E02041'/>
                        </TouchableOpacity>

                </View>
            )}
            />
           

        </View>
    );
}