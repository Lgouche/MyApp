import React, { useState } from 'react'
import { Text,TextInput, StyleSheet, View, Image,TouchableOpacity } from 'react-native'

export default function Login() {

    return (
        <View style={styles.padre}>
            <View>
                <Image source={require('../assets/Taco.png')} style={styles.profile} />
            </View>
            <View style={styles.tarjeta}>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Usuario' style={{paddingHorizontal:15}}/>
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Constraseña' style={{paddingHorizontal:15}}/>
                </View>
                <View style={styles.padreBoton}>
                    <TouchableOpacity style={styles.cajaBoton}>
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
