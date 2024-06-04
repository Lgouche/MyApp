import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import menuData from '../menuData';

export default function Bebidas({ navigation, resumenes, setResumenes }) {
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [isSummary, setIsSummary] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBebidaSelect = (bebida) => {
    setSelectedBebida(bebida);
    setIsModalVisible(true);
  };

  const handleAccept = () => {
    const nuevoResumen = {
      Tipo: 'Bebida',
      Nombre: selectedBebida.nombre,
      Precio: parseFloat(selectedBebida.precio.replace('€', '')),
    };

    setResumenes([...resumenes, nuevoResumen]);
    navigation.navigate('Home');

    setSelectedBebida(null);
    setIsSummary(false);
  };

  const handleCancel = () => {
    setSelectedBebida(null);
    setIsSummary(false);
    setIsModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Confirmar selección de bebida</Text>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!isSummary ? (
        <>
          <Text style={styles.sectionTitle}>Selecciona una Bebida:</Text>
          {menuData.bebidas.map((bebida, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleBebidaSelect(bebida)}>
              <Text style={styles.buttonText}>{`${bebida.nombre} - ${bebida.precio}`}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Resumen de tu Bebida:</Text>
          <Text style={styles.summaryText}>{'->'} Nombre: </Text>
          <Text style={styles.baseText}>{'-'} {selectedBebida.nombre}</Text>
          <Text style={styles.summaryText}>{'->'} Precio: {selectedBebida.precio}</Text>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedButton: {
    borderColor: '#fff',
    borderWidth: 2,
  },
  summary: {
    alignItems: 'center',
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
    alignSelf: 'flex-start',
  },
  summaryButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    margin: 10,
    padding: 10,
    width: '40%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    margin: 10,
    padding: 10,
    width: '40%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#D57C48',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
