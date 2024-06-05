import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import menuData from '../menuData';
import styles from "../src/styles";

export default function AlGusto(props) {
  const [expandedSection, setExpandedSection] = useState('tallas');
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [selectedCarnes, setSelectedCarnes] = useState([]);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSalsa, setSelectedSalsa] = useState(null);
  const [isSummary, setIsSummary] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [selectedMenuSize, setSelectedMenuSize] = useState(null);
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

  const handleTallaSelect = (nombre) => {
    setSelectedTalla(nombre);
    setExpandedSection('carnes');
  };

  const handleCarnesSelect = (carne) => {
    const { carnes: maxCarnes } = menuData.alGusto.tallas[selectedTalla];
    const updatedCarnes = [...selectedCarnes, carne];

    if (updatedCarnes.length >= maxCarnes) {
      setSelectedCarnes(updatedCarnes);
      setExpandedSection('bases');
    } else {
      setSelectedCarnes(updatedCarnes);
    }
  };

  const handleBaseSelect = (nombre) => {
    setSelectedBase(nombre);
    setExpandedSection('salsas');
  };

  const handleSalsaSelect = (salsa) => {
    setSelectedSalsa(salsa);
    setExpandedSection('menu');
  };

  const handleMenuToggle = () => {
    setIsMenu(!isMenu);
    if (isMenu) {
      setSelectedMenuSize(null);
      setSelectedBebida(null);
    } else {
      setIsModalVisible(true);
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
    } else {
      setIsWarningModalVisible(true);
    }
  };
  const handleModalAcceptSinMenu = () => {
    setIsModalVisible(false);
    setIsSummary(true);
  };

  const calculateTotalPrice = () => {
    const tallaPrice = parseFloat(menuData.alGusto.tallas[selectedTalla].precio.replace('€', ''));
    const basePrice = selectedBase && menuData.alGusto.bases[selectedBase].precio_extra ? parseFloat(menuData.alGusto.bases[selectedBase].precio_extra.replace('€', '')) : 0;
    const menuPrice = isMenu ? parseFloat(menuData.menus[selectedMenuSize].precio.replace('€', '')) : 0;
    return tallaPrice + basePrice + menuPrice;
  };

  const handleAccept = () => {
    const nuevoResumen = {
      Tipo: 'Al Gusto',
      Talla: selectedTalla,
      Carnes: selectedCarnes,
      Base: selectedBase,
      Salsa: selectedSalsa,
      Menu: isMenu ? {
        Tamaño: selectedMenuSize,
        Bebida: selectedBebida,
      } : null,
      Precio: calculateTotalPrice(),
    };

    props.setResumenes([...props.resumenes, nuevoResumen]);
    props.navigation.navigate('Home');

    setExpandedSection('tallas');
    setSelectedTalla(null);
    setSelectedCarnes([]);
    setSelectedBase(null);
    setSelectedSalsa(null);
    setIsMenu(false);
    setSelectedMenuSize(null);
    setSelectedBebida(null);
    setIsSummary(false);
  };

  const handleCancel = () => {
    setExpandedSection('tallas');
    setSelectedTalla(null);
    setSelectedCarnes([]);
    setSelectedBase(null);
    setSelectedSalsa(null);
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
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleModalAccept}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
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
          {expandedSection === 'tallas' && (
            <>
              <Text style={styles.sectionTitle}>Selecciona una Talla:</Text>
              {Object.entries(menuData.alGusto.tallas).map(([nombre, talla], index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handleTallaSelect(nombre)}>
                  <Text style={styles.buttonText}>{` --> ${nombre} -  ${talla.precio}`}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {expandedSection === 'carnes' && (
            <>
              <Text style={styles.sectionTitle}>Selecciona {menuData.alGusto.tallas[selectedTalla].carnes} Carne(s):</Text>
              {menuData.alGusto.carnes.map((carne, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, selectedCarnes.filter(c => c === carne).length > 0 && styles.selectedButton]}
                  onPress={() => handleCarnesSelect(carne)}
                >
                  <Text style={styles.buttonText}>{carne} ({selectedCarnes.filter(c => c === carne).length})</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {expandedSection === 'bases' && (
            <>
              <Text style={styles.sectionTitle}>Selecciona una Base:</Text>
              {Object.entries(menuData.alGusto.bases).map(([nombre, base], index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handleBaseSelect(nombre)}>
                  <Text style={styles.buttonText}>
                    {`${nombre} \n${base.descripcion} \n${base.precio_extra || '0€'}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {expandedSection === 'salsas' && (
            <>
              <Text style={styles.sectionTitle}>Selecciona una Salsa:</Text>
              {menuData.alGusto.salsas.map((salsa, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handleSalsaSelect(salsa)}>
                  <Text style={styles.buttonText}>{salsa}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {expandedSection === 'menu' && (
            <>
              <Text style={styles.sectionTitle}>¿Deseas añadir un menú?</Text>
              <TouchableOpacity style={styles.button} onPress={handleMenuToggle}>
                <Text style={styles.buttonText}>Añadir Menú</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleModalAcceptSinMenu}>
                <Text style={styles.buttonText}>Sin Menú</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Resumen de tu Taco:</Text>
          <Text style={styles.summaryText}>{'->'} Talla: </Text>
          <Text style={styles.baseText}>{'-'} {selectedTalla}</Text>
          <Text style={styles.summaryText}>{'->'} Carnes: </Text>
          {menuData.alGusto.carnes.map((carne, index) => {
            const count = selectedCarnes.filter(c => c === carne).length;
            return count > 0 ? <Text key={index} style={styles.carnesText}>{'-'} {carne} x{count}</Text> : null;
          })}
          <Text style={styles.summaryText}>{'->'} Base:</Text>
          <Text style={styles.baseText}>{'-'} {selectedBase}</Text>
          <Text style={styles.summaryText}>{'->'} Salsa:</Text>
          <Text style={styles.baseText}>{'-'} {selectedSalsa}</Text>
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

