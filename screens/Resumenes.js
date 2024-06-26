import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import RNPrint from 'react-native-print';
import { PDFDocument, PDFPage } from 'react-native-pdf-lib';

export default function Resumenes({ resumenes = [], setResumenes }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const total = resumenes.reduce((acc, resumen) => acc + parseFloat(resumen.Precio), 0);
    setTotalPrice(total.toFixed(2));
  }, [resumenes]);

  const handleDeletePress = (index) => {
    setSelectedIndex(index);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    const updatedResumenes = [...resumenes];
    updatedResumenes.splice(selectedIndex, 1);
    setResumenes(updatedResumenes);
    setIsModalVisible(false);
    setSelectedIndex(null);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setSelectedIndex(null);
  };

  const handleDuplicatePress = (index) => {
    const duplicateResumen = { ...resumenes[index] };
    setResumenes([...resumenes, duplicateResumen]);
  };

  const handleConfirmAll = () => {
    setIsTableModalVisible(true);
  };

  const handleTableModalAccept = async () => {
    setIsButtonDisabled(true);
    try {
      if (!tableNumber) {
        Alert.alert('Error', 'Introduce el número de mesa');
        return;
      }

      

      console.log('Order confirmed for table number:', tableNumber);
      console.log('Order details:', resumenes);

      // Reset the table number and close the modal
      setTableNumber('');
      setIsTableModalVisible(false);

      // Clear all summaries
      setResumenes([]);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Hubo un problema al generar el PDF');
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleTableModalCancel = () => {
    setIsTableModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Resúmenes de Pedidos</Text>
      {resumenes.length === 0 ? (
        <Text style={styles.noSummaryText}>No hay resúmenes de pedidos.</Text>
      ) : (
        <>
          {resumenes.map((resumen, index) => (
            <View key={index} style={styles.summary}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePress(index)}
              >
                <MaterialIcons name="close" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.duplicateButton}
                onPress={() => handleDuplicatePress(index)}
              >
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
              {resumen.Tipo === 'Al Gusto' ? (
                <>
                  <Text style={styles.textTitleTipe}>Al Gusto</Text>
                  <Text style={styles.summaryText}>{'->'} Talla: </Text>
                  <Text style={styles.baseText}>{'-'} {resumen.Talla}</Text>
                  <Text style={styles.summaryText}>{'->'} Carnes:</Text>
                  {resumen.Carnes && resumen.Carnes.map((carne, i) => (
                    <Text key={i} style={styles.carnesText}>{'-'} {carne}</Text>
                  ))}
                  <Text style={styles.summaryText}>{'->'} Base:</Text>
                  <Text style={styles.baseText}>{'-'} {resumen.Base}</Text>
                  <Text style={styles.summaryText}>{'->'} Salsas:</Text>
                  {resumen.Salsas && resumen.Salsas.map((salsa, i) => (
                    <Text key={i} style={styles.baseText}>{'-'} {salsa}</Text>
                  ))}
                  {resumen.Extra && (
                    <>
                      <Text style={styles.summaryText}>{'->'} Extra:</Text>
                      <Text style={styles.baseText}>{'-'} {resumen.Extra}</Text>
                    </>
                  )}
                  {resumen.Gratin && (
                    <>
                      <Text style={styles.summaryText}>{'->'} Gratinado:</Text>
                      <Text style={styles.baseText}>{'-'} {resumen.Gratin}</Text>
                    </>
                  )}
                </>
              ) : resumen.Tipo === 'Bebida' ? (
                <>
                  <Text style={styles.textTitleTipe}>Bebida</Text>
                  <Text style={styles.summaryText}>{'->'} Nombre: </Text>
                  <Text style={styles.baseText}>{'-'} {resumen.Nombre}</Text>
                </>
              ) : resumen.Tipo === 'Menu Infantil' ? (
                <>
                  <Text style={styles.textTitleTipe}>Menú Infantil</Text>
                  <Text style={styles.summaryText}>{'->'} Opción 1: </Text>
                  <Text style={styles.baseText}>{'-'} {resumen.Opcion1}</Text>
                  <Text style={styles.summaryText}>{'->'} Opción 2: </Text>
                  <Text style={styles.baseText}>{'-'} {resumen.Opcion2}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.textTitleTipe}>{resumen.Tipo}</Text>
                  <Text style={styles.summaryText}>{'->'} Nombre: </Text>
                  <Text style={styles.baseText}>{'-'} {resumen.Nombre}</Text>
                  <Text style={styles.summaryText}>{'->'} Descripción: </Text>
                  <Text style={styles.baseText}>{'-'} {resumen.Descripcion}</Text>
                </>
              )}
              {resumen.Menu && (
                <>
                  <Text style={styles.summaryText}>{'->'} Menú:</Text>
                  <Text style={styles.baseText}>{'-'} Tamaño: {resumen.Menu.Tamaño}</Text>
                  <Text style={styles.baseText}>{'-'} Bebida: {resumen.Menu.Bebida}</Text>
                </>
              )}
              <Text style={styles.summaryText}>{'->'} Precio: {resumen.Precio}€</Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAll}>
              <MaterialIcons name="check" size={24} color="white" />
              <Text style={styles.buttonText}> {totalPrice}€</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>¿Estás seguro de que deseas eliminar este pedido?</Text>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleConfirmDelete}>
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelDelete}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isTableModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleTableModalCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Seleccione una opción</Text>
            <TouchableOpacity style={[styles.button, styles.llevarButton]} >
              <Text style={styles.buttonText}>TOMAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.tomarButton]} >
              <Text style={styles.buttonText}>LLEVAR</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Introduce el número de mesa</Text>
            <TextInput
              style={styles.input}
              value={tableNumber}
              onChangeText={setTableNumber}
              keyboardType="numeric"
              placeholder="Número de mesa"
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleTableModalAccept} disabled={isButtonDisabled}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleTableModalCancel} disabled={isButtonDisabled}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  noSummaryText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 20,
  },
  summary: {
    backgroundColor: '#895232',
    margin: 10,
    padding: 20,
    width: '85%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 12,
    padding: 2,
  },
  duplicateButton: {
    position: 'absolute',
    top: 10,
    right: 40,
    backgroundColor: 'blue',
    borderRadius: 12,
    padding: 2,
  },
  summaryText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  textTitleTipe: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  carnesText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
    alignSelf: 'flex-end',
  },
  baseText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
    alignSelf: 'flex-end',
  },
  totalContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    marginTop: 10,
    padding: 10,
    width: '50%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 9,
    alignSelf: 'center',
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
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    color: '#000',
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
  llevarButton: {
    backgroundColor: '#9703b8',
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
    justifyContent: 'center',
  },
  tomarButton: {
    backgroundColor: '#bf6ed1',
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
    justifyContent: 'center',
  },
});
