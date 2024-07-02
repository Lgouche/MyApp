import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from "../src/styles";
import { sendData } from './components/sendData';

import * as FileSystem from 'expo-file-system';
import RNPrint from 'react-native-print';
import { PDFDocument, PDFPage } from 'react-native-pdf-lib';


const groupResumenes = (resumenes) => {
  const grouped = {};

  resumenes.forEach((resumen) => {
    const key = JSON.stringify(resumen);
    if (grouped[key]) {
      grouped[key].count += 1;
    } else {
      grouped[key] = { ...resumen, count: 1 };
    }
  });

  return Object.values(grouped);
};

export default function Resumenes({ resumenes = [], setResumenes }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [pedido, setPedido] = useState(null);
  const [mostrarFin, setMostrarFin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const total = resumenes.reduce((acc, resumen) => acc + parseFloat(resumen.Precio), 0);
    setTotalPrice(total.toFixed(2));
  }, [resumenes]);

  const handleDeletePress = (index) => {
    if (resumenes.length === 1) {
      setSelectedIndex(index);
      setIsModalVisible(true);
    } else {
      const updatedResumenes = [...resumenes];
      updatedResumenes.splice(index, 1);
      setResumenes(updatedResumenes);
    }
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
    if (!tableNumber) {
        Alert.alert('Error', 'Introduce el número de mesa');
        return;
      }
    try {
      sendData(resumenes,pedido,tableNumber, setLoading);
      console.log('El pedido es para ',pedido,' for table number or person:', tableNumber);
      console.log('Order details:', resumenes);
      
      
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Fallo catastrofico en algun lado, a buscar');
    } finally {
      setTableNumber('');
      setIsTableModalVisible(false);
      setResumenes([]);
      setIsButtonDisabled(false);
      
      
    }
  };

  const handleTableModalCancel = () => {
    setIsTableModalVisible(false);
    setMostrarFin(false);
    setTableNumber('');
  };
    const tipoPedido = (tipo) => {
      setPedido(tipo);
      setMostrarFin(true);

    }

  const groupedResumenes = groupResumenes(resumenes);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Resúmenes de Pedidos</Text>
      {groupedResumenes.length === 0 ? (
        <Text style={styles.noSummaryText}>No hay resúmenes de pedidos.</Text>
      ) : (
        <>
          {groupedResumenes.map((resumen, index) => (
            <CollapsibleItem key={index} resumen={resumen} index={index} handleDeletePress={handleDeletePress} handleDuplicatePress={handleDuplicatePress} />
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
          {!mostrarFin && (
            <View style={styles.modalContent}>
              <Text style={styles.sectionTitle}>Seleccione una opción</Text>
              <View style={styles.bebidaButtons}>
                <TouchableOpacity style={[styles.button, styles.llevarButton]} onPress={() => { tipoPedido('tomar') }} >
                  <Text style={styles.buttonText}>TOMAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.tomarButton]} onPress={() => { tipoPedido('llevar') }}>
                  <Text style={styles.buttonText}>LLEVAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {mostrarFin && (
            <View style={styles.modalContent}>
              <Text style={styles.sectionTitle}>{pedido === 'llevar' ? 'Introduce un Nombre' : 'Introduce el número de mesa'}</Text>

              <TextInput
                style={styles.input}
                value={tableNumber}
                onChangeText={setTableNumber}
                keyboardType={pedido === 'llevar' ? "default" : "numeric"}
                placeholder={pedido === 'llevar' ? "Manolo, Luis, ...." : "Numero de stick"}
                placeholderTextColor="#ccc"
              />
              <View style={styles.bebidaButtons}>
                <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleTableModalAccept} disabled={isButtonDisabled}>
                  <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleTableModalCancel} disabled={isButtonDisabled}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>

            </View>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

function CollapsibleItem({ resumen, index, handleDeletePress, handleDuplicatePress }) {
  const [open, setOpen] = useState(false);
  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(!open);
  };

  return (
    <TouchableOpacity style={styles.summary} onPress={onPress} activeOpacity={1}>
      <View style={styles.row}>
        <Text style={styles.textTitleTipe}>{resumen.Tipo} {resumen.count > 1 ? `(x${resumen.count})` : ''}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation();
            handleDeletePress(index);
          }}
        >
          <MaterialIcons name="close" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.duplicateButton}
          onPress={(e) => {
            e.stopPropagation();
            handleDuplicatePress(index);
          }}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {open && (
        <View>
          <ResumenContent resumen={resumen} />
        </View>
      )}
    </TouchableOpacity>
  );
}

function ResumenContent({ resumen }) {
  return (
    <>
      {resumen.Tipo === 'Al Gusto' ? (
        <>
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
          <Text style={styles.summaryText}>{'->'} Nombre: </Text>
          <Text style={styles.baseText}>{'-'} {resumen.Nombre}</Text>
        </>
      ) : resumen.Tipo === 'Menu Infantil' ? (
        <>
          <Text style={styles.summaryText}>{'->'} Opción 1: </Text>
          <Text style={styles.baseText}>{'-'} {resumen.Opcion1}</Text>
          <Text style={styles.summaryText}>{'->'} Opción 2: </Text>
          <Text style={styles.baseText}>{'-'} {resumen.Opcion2}</Text>
        </>
      ) : resumen.Tipo === 'Postres' || resumen.Tipo === 'Entrantes' ? (
        <>
          <Text style={styles.summaryText}>{'->'} Nombre: </Text>
          <Text style={styles.baseText}>{'-'} {resumen.Nombre}</Text>
        </>
      ) : resumen.Tipo === 'Al Gusto Graten' ? (
        <>
          <Text style={styles.summaryText}>{'->'} Carne: </Text>
          <Text style={styles.baseText}>{'-'} {resumen.Carne}</Text>
          {resumen.Extra && (
            <>
              <Text style={styles.summaryText}>{'->'} Extra:</Text>
              <Text style={styles.baseText}>{'-'} {resumen.Extra}</Text>
            </>
          )}
        </>
      ) : (
        <>
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
    </>
  );
}
