import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
// Importaciones de FIREBASE
import {appFirebase} from '../credenciales';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// Icono
import { AntDesign } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D57C48', // Color de fondo cálido
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    tarjeta: {
        margin: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // Fondo de tarjeta ligeramente transparente
        borderRadius: 20,
        padding: 30,
        width: '90%',
        borderColor: '#F39C12', // Borde de color que combina con el fondo
        borderWidth: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cajaTexto: {
        paddingVertical: 20,
        backgroundColor: 'rgba(204, 204, 204, 0.6)', // Fondo de caja de texto con transparencia
        borderRadius: 30,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        paddingHorizontal: 15,
        flex: 1,
    },
    eyeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    padreBoton: {
        alignItems: 'center',
    },
    boton: {
        backgroundColor: '#E67E22', // Color de botón cálido
        paddingVertical: 20,
        borderRadius: 30,
        marginTop: 20,
        width: 130
    },
    textoBotonInicio: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    textoBotonRegitro:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        textDecorationLine: 'underline'
    }
});
