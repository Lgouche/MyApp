import React, { useState } from 'react'
import { Text,TextInput, StyleSheet, View, Image,TouchableOpacity,Alert } from 'react-native'
//Impotaciones de FIREBSE
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appFirebase);
//Tenemos que pasarle las props
export default function Login(props) {



    //Aqui tenemos la logica que nos permite conectar con firebase
    //Creamos la variable estado
    const [email,setEmail]= useState();
    const [password,setPassword]= useState();
    //La mas importante
    const logueo = async()=>{
        try {
            await signInWithEmailAndPassword(auth,email,password);
            Alert.alert('Iniciando Sesion', 'Accediendo...');
            //Con esto pasamos el cambio de pantalla
            props.navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            Alert.alert('Error','El Usuario o la contraseña son incorrectos');
            
        }
    }

    return (
        <View style={styles.padre}>
            <View>
                <Image source={require('../assets/Taco.png')} style={styles.profile} />
            </View>
            <View style={styles.tarjeta}>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Usuario' style={{paddingHorizontal:15}} onChangeText={(text)=>setEmail(text)}/>
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Constraseña' style={{paddingHorizontal:15}} secureTextEntry={true} onChangeText={(text)=>setPassword(text)}/>
                </View>
                <View style={styles.padreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={logueo}>
                        <Text style={styles.textoBoton}>Ingresar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );

}

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    tarjeta:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5,
    },
    cajaTexto:{
        paddingVertical:20,
        backgroundColor:'#cccccc40',
        borderRadius:30,
        marginVertical:10
    },
    padreBoton:{
        alignItems:'center',

    },
    cajaBoton:{
        backgroundColor:'#525FE1',
        paddingVertical:20,
        borderRadius:30,
        marginTop:20,
        width:130
    },
    textoBoton:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    }
})
