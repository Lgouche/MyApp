import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import menuData from '../menuData';
import styles from "../src/styles";

export default function MenuInfantil({ navigation, resumenes, setResumenes }) {
  const [selectedOpcion1, setSelectedOpcion1] = useState(null);
  const [selectedOpcion2, setSelectedOpcion2] = useState(null);
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [isBebidaModalVisible, setIsBebidaModalVisible] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const handleOpcion1Select = (item) => {
    setSelectedOpcion1(item);
  };

  const handleOpcion2Select = (item) => {
    if (item === 'bebida') {
      setIsBebidaModalVisible(true);
    } else {
      setSelectedOpcion2(item);
      setIsSummaryVisible(true);
    }
  };

  const handleBebidaSelect = (bebida) => {
    setSelectedBebida(bebida);
    setSelectedOpcion2('bebida');
    setIsBebidaModalVisible(false);
    setIsSummaryVisible(true);
  };

  const calculateTotalPrice = () => {
    const opcion1Price = parseFloat(selectedOpcion1.precio.replace('€', ''));
    const opcion2Price = selectedOpcion2 === 'bebida' ? parseFloat(menuData.menuInfantil.opcion2.bebida.precio.replace('€', '')) : parseFloat(menuData.menuInfantil.opcion2.postre.precio.replace('€', ''));
    return opcion1Price + opcion2Price;
  };

  const handleAccept = () => {
    const nuevoResumen = {
      Tipo: 'Menu Infantil',
      Opcion1: selectedOpcion1.nombre,
      Opcion2: selectedOpcion2 === 'bebida' ? `Bebida: ${selectedBebida}` : 'Postre',
      Precio: calculateTotalPrice(),
    };

    setResumenes([...resumenes, nuevoResumen]);
    navigation.navigate('Home');

    setSelectedOpcion1(null);
    setSelectedOpcion2(null);
    setSelectedBebida(null);
    setIsSummaryVisible(false);
  };

  const handleCancel = () => {
    setSelectedOpcion1(null);
    setSelectedOpcion2(null);
    setSelectedBebida(null);
    setIsSummaryVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={stylesMenuInfantil.container}>
      <Text style={stylesMenuInfantil.sectionTitle}>Menú Infantil</Text>
      {!selectedOpcion1 ? (
        <>
          <Text style={stylesMenuInfantil.sectionTitle}>Selecciona una opción:</Text>
          {Object.entries(menuData.menuInfantil.opcion1).map(([nombre, opcion], index) => (
            <TouchableOpacity key={index} style={stylesMenuInfantil.button} onPress={() => handleOpcion1Select({ nombre, ...opcion })}>
              <Text style={stylesMenuInfantil.buttonText}>{`${nombre} - ${opcion.precio}`}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : !selectedOpcion2 ? (
        <>
          <Text style={stylesMenuInfantil.sectionTitle}>Selecciona una opción:</Text>
          {Object.entries(menuData.menuInfantil.opcion2).map(([nombre, opcion], index) => (
            <TouchableOpacity key={index} style={stylesMenuInfantil.button} onPress={() => handleOpcion2Select(nombre)}>
              <Text style={stylesMenuInfantil.buttonText}>{`${nombre} - ${opcion.precio}`}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : isSummaryVisible ? (
        <View style={stylesMenuInfantil.summary}>
          <Text style={stylesMenuInfantil.sectionTitle}>Resumen de tu Menú Infantil:</Text>
          <Text style={stylesMenuInfantil.summaryText}>{'->'} Opción 1: </Text>
          <Text style={stylesMenuInfantil.baseText}>{'-'} {selectedOpcion1.nombre}</Text>
          <Text style={stylesMenuInfantil.summaryText}>{'->'} Opción 2: </Text>
          <Text style={stylesMenuInfantil.baseText}>{'-'} {selectedOpcion2 === 'bebida' ? `Bebida: ${selectedBebida}` : 'Postre'}</Text>
          <Text style={stylesMenuInfantil.summaryText}>{'->'} Total: {calculateTotalPrice()}€</Text>
          <View style={stylesMenuInfantil.summaryButtons}>
            <TouchableOpacity style={[stylesMenuInfantil.button, stylesMenuInfantil.acceptButton]} onPress={handleAccept}>
              <MaterialIcons name="check" size={24} color="white" />
              <Text style={stylesMenuInfantil.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[stylesMenuInfantil.button, stylesMenuInfantil.cancelButton]} onPress={handleCancel}>
              <MaterialIcons name="cancel" size={24} color="white" />
              <Text style={stylesMenuInfantil.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <Modal
        visible={isBebidaModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsBebidaModalVisible(false)}
      >
        <View style={stylesMenuInfantil.modalContainer}>
          <View style={stylesMenuInfantil.modalContent}>
            <Text style={stylesMenuInfantil.sectionTitle}>Selecciona una Bebida:</Text>
            {menuData.bebidas.map((bebida, index) => (
              <TouchableOpacity
                key={index}
                style={[stylesMenuInfantil.button, selectedBebida === bebida.nombre && stylesMenuInfantil.selectedButton]}
                onPress={() => handleBebidaSelect(bebida.nombre)}
              >
                <Text style={stylesMenuInfantil.buttonText}>{bebida.nombre}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[stylesMenuInfantil.button, stylesMenuInfantil.cancelButton]} onPress={() => setIsBebidaModalVisible(false)}>
              <Text style={stylesMenuInfantil.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const stylesMenuInfantil = StyleSheet.create({
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
  summaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  selectedButton: {
    borderColor: 'yellow',
    borderWidth: 2,
  },
});
