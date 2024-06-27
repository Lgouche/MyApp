import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import menuData from '../menuData';
import styles from "../src/styles";

export default function Bebidas({ navigation, resumenes, setResumenes }) {
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [isSummary, setIsSummary] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tam, setTam] = useState(null);

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
  const tamBebida = (tam) => {
    if (tam == 'grande') {
      setTam(tam);
      console.log(tam);
    } if (tam == 'normal') {
      setTam(tam);
      console.log(tam);
    }
  };
  const getBebidasByCategory = (category) => {
    return menuData.bebidas.filter(bebida => bebida.categoria === category);
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
          <Text style={styles.sectionTitle}>Selecciona el tamaño :</Text>
          <View style={styles.bebidaButtons}>
            <TouchableOpacity style={[styles.button, styles.buttonMini]}
              onPress={() => tamBebida('normal')}
            >
              <Text style={styles.buttonText}>Tamaño Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonMini]}
              onPress={() => tamBebida('grande')}
            >
              <Text style={styles.buttonText}>Tamaño Grande</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Selecciona una Bebida:</Text>
          {tam && getBebidasByCategory(tam).map((bebida, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, selectedBebida === bebida.nombre && styles.selectedButton]}
              onPress={() => handleBebidaSelect(bebida)}
            >
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


