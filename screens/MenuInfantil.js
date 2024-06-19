import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import menuData from '../menuData';
import styles from "../src/styles";

export default function MenuInfantil({ navigation, resumenes, setResumenes }) {
  const [selectedOpcion1, setSelectedOpcion1] = useState(null);
  const [selectedOpcion2, setSelectedOpcion2] = useState(null);
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [selectedPostre, setSelectedPostre] = useState(null);
  const [isBebidaModalVisible, setIsBebidaModalVisible] = useState(false);
  const [isPostreModalVisible, setIsPostreModalVisible] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const handleOpcion1Select = (item) => {
    setSelectedOpcion1(item);
  };

  const handleOpcion2Select = (item) => {
    if (item === 'bebida') {
      setIsBebidaModalVisible(true);
    } else {
      setIsPostreModalVisible(true);
    }
  };

  const handleBebidaSelect = (bebida) => {
    setSelectedBebida(bebida);
    setSelectedOpcion2('bebida');
    setIsBebidaModalVisible(false);
    setIsSummaryVisible(true);
  };

  const handlePostreSelect = (postre) => {
    setSelectedPostre(postre);
    setSelectedOpcion2('postre');
    setIsPostreModalVisible(false);
    setIsSummaryVisible(true);
  };

  const calculateTotalPrice = () => {
    const opcion1Price = parseFloat(selectedOpcion1.precio.replace('€', ''));
    const opcion2Price = selectedOpcion2 === 'bebida' ? parseFloat(menuData.menuInfantil.opcion2.bebida.precio.replace('€', '')) : parseFloat(selectedPostre.precio.replace('€', ''));
    return opcion1Price + opcion2Price;
  };

  const handleAccept = () => {
    const nuevoResumen = {
      Tipo: 'Menu Infantil',
      Opcion1: selectedOpcion1.nombre,
      Opcion2: selectedOpcion2 === 'bebida' ? `Bebida: ${selectedBebida}` : `Postre: ${selectedPostre.nombre}`,
      Precio: calculateTotalPrice(),
    };

    setResumenes([...resumenes, nuevoResumen]);
    navigation.navigate('Home');

    setSelectedOpcion1(null);
    setSelectedOpcion2(null);
    setSelectedBebida(null);
    setSelectedPostre(null);
    setIsSummaryVisible(false);
  };

  const handleCancel = () => {
    setSelectedOpcion1(null);
    setSelectedOpcion2(null);
    setSelectedBebida(null);
    setSelectedPostre(null);
    setIsSummaryVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Menú Infantil</Text>
      {!selectedOpcion1 ? (
        <>
          <Text style={styles.sectionTitle}>Selecciona una opción:</Text>
          {Object.entries(menuData.menuInfantil.opcion1).map(([nombre, opcion], index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleOpcion1Select({ nombre, ...opcion })}>
              <Text style={styles.buttonText}>{`${nombre}`}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : !selectedOpcion2 ? (
        <>
          <Text style={styles.sectionTitle}>Selecciona una opción:</Text>
          {Object.entries(menuData.menuInfantil.opcion2).map(([nombre, opcion], index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleOpcion2Select(nombre)}>
              <Text style={styles.buttonText}>{`${nombre} `}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : isSummaryVisible ? (
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Resumen de tu Menú Infantil:</Text>
          <Text style={styles.summaryText}>{'->'} Opción 1: </Text>
          <Text style={styles.baseText}>{'-'} {selectedOpcion1.nombre}</Text>
          <Text style={styles.summaryText}>{'->'} Opción 2: </Text>
          <Text style={styles.baseText}>{'-'} {selectedOpcion2 === 'bebida' ? `Bebida: ${selectedBebida}` : `Postre: ${selectedPostre.nombre}`}</Text>
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
      ) : null}

      <Modal
        visible={isBebidaModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsBebidaModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
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
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsBebidaModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isPostreModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPostreModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Selecciona un Postre:</Text>
            {Object.entries(menuData.postresMenuInfantil).map(([nombre, postre], index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, selectedPostre?.nombre === nombre && styles.selectedButton]}
                onPress={() => handlePostreSelect({ nombre, ...postre })}
              >
                <Text style={styles.buttonText}>{`${nombre}`}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsPostreModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}


