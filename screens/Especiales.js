import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import menuData from '../menuData';

export default function Especiales({ navigation, resumenes, setResumenes }) {
  const [selectedTaco, setSelectedTaco] = useState(null);
  const [isSummary, setIsSummary] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [selectedMenuSize, setSelectedMenuSize] = useState(null);
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

  const handleTacoSelect = (taco) => {
    setSelectedTaco(taco);
    setIsModalVisible(true);
  };

  const handleMenuOptionSelect = (option) => {
    setIsModalVisible(false);
    if (option === 'yes') {
      setIsMenuModalVisible(true);
    } else {
      setIsSummary(true);
    }
  };

  const handleMenuSizeSelect = (size) => {
    setSelectedMenuSize(size);
  };

  const handleBebidaSelect = (bebida) => {
    setSelectedBebida(bebida);
  };

  const handleMenuModalAccept = () => {
    if (selectedMenuSize && selectedBebida) {
      setIsMenuModalVisible(false);
      setIsMenu(true);
      setIsSummary(true);
    } else {
      setIsWarningModalVisible(true);
    }
  };

  const calculateTotalPrice = () => {
    const tacoPrice = parseFloat(selectedTaco.precio.replace('€', ''));
    const menuPrice = isMenu ? parseFloat(menuData.menus[selectedMenuSize].precio.replace('€', '')) : 0;
    return tacoPrice + menuPrice;
  };

  const handleAccept = () => {
    const nuevoResumen = {
      Tipo: 'Especial',
      Nombre: selectedTaco.nombre,
      Descripcion: selectedTaco.descripcion,
      Menu: isMenu ? {
        Tamaño: selectedMenuSize,
        Bebida: selectedBebida,
      } : null,
      Precio: calculateTotalPrice(),
    };

    setResumenes([...resumenes, nuevoResumen]);
    navigation.navigate('Home');

    setSelectedTaco(null);
    setIsSummary(false);
    setIsMenu(false);
    setSelectedMenuSize(null);
    setSelectedBebida(null);
  };

  const handleCancel = () => {
    setSelectedTaco(null);
    setIsSummary(false);
    setIsMenu(false);
    setSelectedMenuSize(null);
    setSelectedBebida(null);
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
            <Text style={styles.sectionTitle}>¿Deseas añadir un menú?</Text>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleMenuOptionSelect('yes')}>
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => handleMenuOptionSelect('no')}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isMenuModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsMenuModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Selecciona el tamaño del menú:</Text>
            {Object.entries(menuData.menus).map(([size, details], index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, selectedMenuSize === size && styles.selectedButton]}
                onPress={() => handleMenuSizeSelect(size)}
              >
                <Text style={styles.buttonText}>{`${size.charAt(0).toUpperCase() + size.slice(1)} - Precio: ${details.precio}`}</Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.sectionTitle}>Selecciona una Bebida:</Text>
            {menuData.bebidas.map((bebida, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, selectedBebida === bebida.nombre && styles.selectedButton]}
                onPress={() => handleBebidaSelect(bebida.nombre)}
              >
                <Text style={styles.buttonText}>{bebida.nombre}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleMenuModalAccept}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsMenuModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isWarningModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsWarningModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Campos faltantes</Text>
            <Text style={styles.warningText}>Por favor, selecciona tanto el tamaño del menú como la bebida.</Text>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => setIsWarningModalVisible(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!isSummary ? (
        <>
          <Text style={styles.sectionTitle}>Selecciona un Taco Especial:</Text>
          {Object.entries(menuData.especiales).map(([nombre, taco], index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleTacoSelect({ nombre, ...taco })}>
              <Text style={styles.buttonText}>{`${nombre} - ${taco.precio}`}</Text>
              <Text style={styles.buttonSubText}>{taco.descripcion}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Resumen de tu Taco Especial:</Text>
          <Text style={styles.summaryText}>{'->'} Nombre: </Text>
          <Text style={styles.baseText}>{'-'} {selectedTaco.nombre}</Text>
          <Text style={styles.summaryText}>{'->'} Descripción: </Text>
          <Text style={styles.baseText}>{'-'} {selectedTaco.descripcion}</Text>
          {isMenu && (
            <>
              <Text style={styles.summaryText}>{'->'} Menú:</Text>
              <Text style={styles.baseText}>{'-'} Tamaño: {selectedMenuSize}</Text>
              <Text style={styles.baseText}>{'-'} Bebida: {selectedBebida}</Text>
            </>
          )}
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
  buttonSubText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
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
  warningText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
});
