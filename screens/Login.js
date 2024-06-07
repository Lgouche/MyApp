import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
// Importaciones de FIREBASE
import {appFirebase} from '../credenciales';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// Icono
import { AntDesign } from '@expo/vector-icons';
import styles from "../src/styles";

const auth = getAuth(appFirebase);

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vpass, setVpass] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    const logueo = async () => {
        try {
            setShowLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            props.navigation.replace('Home');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'El Usuario o la contraseña son incorrectos');
        } finally {
            setTimeout(() => {
                setShowLoading(false);
            }, 3000);
        }
    };
    

    return (
        <View style={styles.padre}>
            <View>
                <Image source={require('../assets/Taco.png')} style={styles.profile} />
            </View>
            <View style={styles.tarjeta}>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Usuario' style={styles.input} onChangeText={(text) => setEmail(text)} />
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Contraseña' style={styles.input} secureTextEntry={vpass} onChangeText={(text) => setPassword(text)} />
                    <TouchableOpacity
                        onPressIn={() => setVpass(false)}
                        onPressOut={() => setVpass(true)}
                        style={styles.eyeButton}
                    >
                        <AntDesign name="eye" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.padreBoton}>
                    <TouchableOpacity style={styles.boton} onPress={logueo}>
                        <Text style={styles.textoBotonInicio}>Ingresar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Registro')}}> 
                        <Text style={styles.textoBotonRegitro}>Registrarse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Home')}}>
                        <Text style={styles.textoBotonRegitro}>Desarrollo</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showLoading && (
                <View style={styles.loading}>
                    <Text>Iniciando sesión...</Text>
                </View>
            )}
        </View>
    );
}

