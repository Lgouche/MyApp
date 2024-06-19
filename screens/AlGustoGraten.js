import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import menuData from '../menuData';
import styles from '../src/styles';

export default function AlGustoGraten({ navigation, resumenes, setResumenes }) {
  const [expandedSection, setExpandedSection] = useState('carne');
  const [selectedCarne, setSelectedCarne] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState(null);
  const [isSummary, setIsSummary] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [selectedMenuSize, setSelectedMenuSize] = useState(null);
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExtraQuestionVisible, setIsExtraQuestionVisible] = useState(false);
  const [isExtraModalVisible, setIsExtraModalVisible] = useState(false);
  const [isMenuQuestionVisible, setIsMenuQuestionVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

  const handleCarneSelect = (carne) => {
    setSelectedCarne(carne);
    setIsExtraQuestionVisible(true);
  };
  const getBebidasByCategory = (category) => {
    return menuData.bebidas.filter(bebida => bebida.categoria === category);
  };


  const handleExtraOptionSelect = (option) => {
    setIsExtraQuestionVisible(false);
    if (option === 'yes') {
      setIsExtraModalVisible(true);
    } else {
      setIsMenuQuestionVisible(true);
    }
  };

  const handleExtraSelect = (extra) => {
    setSelectedExtra(extra);
    setIsExtraModalVisible(false);
    setIsMenuQuestionVisible(true);
  };

  const handleMenuOptionSelect = (option) => {
    setIsMenuQuestionVisible(false);
    if (option === 'yes') {
      setIsModalVisible(true);
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

  const handleModalAccept = () => {
    if (selectedMenuSize && selectedBebida) {
      setIsModalVisible(false);
      setIsSummary(true);
      setIsMenu(true);
    } else {
      setIsWarningModalVisible(true);
    }
  };

  const handleModalAcceptSinMenu = () => {
    setIsModalVisible(false);
    setIsSummary(true);
  };

  const calculateTotalPrice = () => {
    
    const carnePrice = parseFloat(selectedCarne.precio.replace('€', '')) ;
    const extraPrice = selectedExtra ? parseFloat(selectedExtra.precio.replace('€', '')) : 0;
    const menuPrice = isMenu ? parseFloat(menuData.menus[selectedMenuSize].precio.replace('€', '')) : 0;
    return extraPrice + menuPrice + carnePrice;
  };

  const handleAccept = () => {
    const nuevoResumen = {
      Tipo: 'Al Gusto Graten',
      Carne: selectedCarne,
      Extra: selectedExtra ? selectedExtra.nombre : null,
      Menu: isMenu ? {
        Tamaño: selectedMenuSize,
        Bebida: selectedBebida,
      } : null,
      Precio: calculateTotalPrice(),
    };

    setResumenes([...resumenes, nuevoResumen]);
    navigation.navigate('Home');

    setSelectedCarne(null);
    setSelectedExtra(null);
    setIsMenu(false);
    setSelectedMenuSize(null);
    setSelectedBebida(null);
    setIsSummary(false);
  };

  const handleCancel = () => {
    setSelectedCarne(null);
    setSelectedExtra(null);
    setIsMenu(false);
    setSelectedMenuSize(null);
    setSelectedBebida(null);
    setIsSummary(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <ScrollView contentContainerStyle={styles.modalScrollContainer}>
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
              {selectedMenuSize && getBebidasByCategory(selectedMenuSize).map((bebida, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, selectedBebida === bebida.nombre && styles.selectedButton]}
                  onPress={() => handleBebidaSelect(bebida.nombre)}
                >
                  <Text style={styles.buttonText}>{bebida.nombre}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleModalAccept}>
                <Text style={styles.buttonText}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

      </Modal>

      <Modal
        visible={isExtraQuestionVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsExtraQuestionVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>¿Deseas añadir un extra?</Text>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleExtraOptionSelect('yes')}>
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => handleExtraOptionSelect('no')}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isExtraModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsExtraModalVisible(false)}
      >
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.sectionTitle}>Selecciona un Extra:</Text>
              {menuData.gratenAlGusto.extras.map((extra, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, selectedExtra === extra && styles.selectedButton]}
                  onPress={() => handleExtraSelect(extra)}
                >
                  <Text style={styles.buttonText}>{`${extra.nombre} - Precio: ${extra.precio}`}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsExtraModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>

      <Modal
        visible={isMenuQuestionVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsMenuQuestionVisible(false)}
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
          {expandedSection === 'carne' && (
            <>
              <Text style={styles.sectionTitle}>Selecciona una Carne:</Text>
              {menuData.gratenAlGusto.carnes.map((carne, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handleCarneSelect(carne)}>
                  <Text style={styles.buttonText}>{carne.nombre}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </>
      ) : (
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Resumen de Graten:</Text>
          <Text style={styles.summaryText}>{'->'} Carne: </Text>
          <Text style={styles.baseText}>{'-'} {selectedCarne.nombre}</Text>
          {selectedExtra && (
            <>
              <Text style={styles.summaryText}>{'->'} Extra:</Text>
              <Text style={styles.baseText}>{'-'} {selectedExtra.nombre}</Text>
            </>
          )}
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


