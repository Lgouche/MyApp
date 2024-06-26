import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import menuData from '../menuData';
import styles from "../src/styles";

export default function Graten({ navigation, resumenes, setResumenes }) {
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
  const getBebidasByCategory = (category) => {
    return menuData.bebidas.filter(bebida => bebida.categoria === category);
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
      Tipo: 'Graten',
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
        <ScrollView contentContainerStyle={styles.modalScrollContainer}>
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
            {selectedMenuSize && getBebidasByCategory(selectedMenuSize).map((bebida, index) => (
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
        </ScrollView>
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
          <Text style={styles.sectionTitle}>Selecciona un Graten:</Text>
          <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('AlGustoGraten')}>
              <Text style={styles.buttonText}> Al Gusto</Text>
            </TouchableOpacity>
          {Object.entries(menuData.graten).map(([nombre, taco], index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleTacoSelect({ nombre, ...taco })}>
              <Text style={styles.buttonText}>{`${nombre} - ${taco.precio}`}</Text>
              <Text style={styles.buttonSubText}>{taco.descripcion}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Resumen de tu Graten:</Text>
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
