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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Selecciona un Entrante:</Text>
      {!isSummaryVisible ? (
        <>
          {Object.entries(menuData.entrantes).map(([nombre, entrante], index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleEntranteSelect({ nombre, ...entrante })}>
              <Text style={styles.buttonText}>{`${nombre} - ${entrante.precio}`}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Resumen de tu Entrante:</Text>
          <Text style={styles.summaryText}>{'->'} Nombre: </Text>
          <Text style={styles.baseText}>{'-'} {selectedEntrante.nombre}</Text>
          <Text style={styles.summaryText}>{'->'} Total: {calculateTotalPrice()}€</Text>
          <View style={styles.summaryButtons}>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
              <MaterialIcons name="check" size={24} color="white" />
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <MaterialIcons name="cancel" size={24} color="white" />
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

