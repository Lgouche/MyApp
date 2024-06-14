import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import menuData from '../menuData';
import styles from "../src/styles";

export default function Entrantes({ navigation, resumenes, setResumenes }) {
  const [selectedEntrante, setSelectedEntrante] = useState(null);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const handleEntranteSelect = (entrante) => {
    setSelectedEntrante(entrante);
    setIsSummaryVisible(true);
  };

  const calculateTotalPrice = () => {
    return parseFloat(selectedEntrante.precio.replace('€', ''));
  };

  const handleAccept = () => {
    const nuevoResumen = {
      Tipo: 'Entrantes',
      Nombre: selectedEntrante.nombre,
      Precio: calculateTotalPrice(),
    };

    setResumenes([...resumenes, nuevoResumen]);
    navigation.navigate('Home');

    setSelectedEntrante(null);
    setIsSummaryVisible(false);
  };

  const handleCancel = () => {
    setSelectedEntrante(null);
    setIsSummaryVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={stylesEntrantes.container}>
      <Text style={stylesEntrantes.sectionTitle}>Selecciona un Entrante:</Text>
      {!isSummaryVisible ? (
        <>
          {Object.entries(menuData.entrantes).map(([nombre, entrante], index) => (
            <TouchableOpacity key={index} style={stylesEntrantes.button} onPress={() => handleEntranteSelect({ nombre, ...entrante })}>
              <Text style={stylesEntrantes.buttonText}>{`${nombre} - ${entrante.precio}`}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <View style={stylesEntrantes.summary}>
          <Text style={stylesEntrantes.sectionTitle}>Resumen de tu Entrante:</Text>
          <Text style={stylesEntrantes.summaryText}>{'->'} Nombre: </Text>
          <Text style={stylesEntrantes.baseText}>{'-'} {selectedEntrante.nombre}</Text>
          <Text style={stylesEntrantes.summaryText}>{'->'} Total: {calculateTotalPrice()}€</Text>
          <View style={stylesEntrantes.summaryButtons}>
            <TouchableOpacity style={[stylesEntrantes.button, stylesEntrantes.acceptButton]} onPress={handleAccept}>
              <MaterialIcons name="check" size={24} color="white" />
              <Text style={stylesEntrantes.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[stylesEntrantes.button, stylesEntrantes.cancelButton]} onPress={handleCancel}>
              <MaterialIcons name="cancel" size={24} color="white" />
              <Text style={stylesEntrantes.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const stylesEntrantes = StyleSheet.create({
  container: {
    flexGrow: 1,
    overflow: "hidden",
    backgroundColor: '#D57C48',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  summaryText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  baseText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: '#895232',
    margin: 10,
    padding: 10,
    width: '70%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
