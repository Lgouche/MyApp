import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
// Importaciones de FIREBASE
import {appFirebase} from '../credenciales';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
// Icono
import { AntDesign } from '@expo/vector-icons';
import styles from "../src/styles";


const auth = getAuth(appFirebase);

export default function Registro(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState('');
    const [vpass, setVpass] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    const registrarse = async () => {
        try {
            if (password!== check) {
                Alert.alert('Error', 'Las contraseñas no coinciden');
                return;
            }else{
                setShowLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            props.navigation.navigate('Login');
            }
            
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Introduce un usuario y una contraseña valida'+error);
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
                <Text style={styles.text}>Introduce un usuario</Text>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Usuario' style={styles.input} onChangeText={(text) => setEmail(text)} />
                </View>
                <Text style={styles.text}>Introduce una contraseña</Text>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Contraseña' style={styles.input} secureTextEntry={vpass} onChangeText={(text) => setPassword(text)} />
                    <TouchableOpacity
                        onPressIn={() => setVpass(false)}
                        onPressOut={() => setVpass(true)}
                        style={styles.eyeButton}
                    >
                        <AntDesign name="eye" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Repite la Contraseña' style={styles.input} secureTextEntry={vpass} onChangeText={(text) => setCheck(text)} />
                    <TouchableOpacity
                        onPressIn={() => setVpass(false)}
                        onPressOut={() => setVpass(true)}
                        style={styles.eyeButton}
                    >
                        <AntDesign name="eye" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize:10,color:'white'}}>La contraseña tiene que tener minimo 6 caracteres*</Text>
                <View style={styles.padreBoton}>
                    <TouchableOpacity style={styles.boton} onPress={registrarse}>
                        <Text style={styles.textoBotonInicio}>Regitrarse</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
            {showLoading && (
                <View style={styles.loading}>
                    <Text>Registrando al Usuario</Text>
                </View>
            )}
        </View>
    );
}


