import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import logoImg from '../../assets/logo.png' 
import styles from './styles'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';

export default function Details() {
    const route = useRoute();
    const incident = route.params.incidents;
    const navigation = useNavigation();
    const message = `Olá ${incident.nome}, estou entrando em contato pois quero ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', 
    {style: 'currency', currency: 'BRL'}).format(incident.value)}`

    function goBack() {
        navigation.goBack();
    };

    function sendMail() {
        MailComposer.composeAsync({
            subject: 'Herói do caso: ' + incident.title,
            recipients: [`${incident.email}`],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={goBack}>
                    <Feather name="arrow-left" size={28} color='#e02041'/>
                </TouchableOpacity>
            </View>

            
            <View style={styles.incidentBox}>

                    <Text style={styles.incidentProp}>ONG</Text>
                    <Text style={styles.incidentValue}>{incident.nome} de {incident.city}/{incident.uf}</Text>

                    <Text style={styles.incidentProp}>Descrição</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProp}>Valor</Text>
                    <Text style={styles.incidentEnd}>{Intl.NumberFormat('pt-BR', 
                    {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.title}>Salve o dia!</Text>
                <Text style={styles.title}>Seja o herói desse caso.</Text>

                <Text style={styles.text}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}