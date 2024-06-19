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
  const [selectedSalsas, setSelectedSalsas] = useState([]);
  const [selectedExtra, setSelectedExtra] = useState(null);
  const [selectedGratin, setSelectedGratin] = useState(null);
  const [isSummary, setIsSummary] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [selectedMenuSize, setSelectedMenuSize] = useState(null);
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExtraQuestionVisible, setIsExtraQuestionVisible] = useState(false);
  const [isExtraModalVisible, setIsExtraModalVisible] = useState(false);
  const [isGratinQuestionVisible, setIsGratinQuestionVisible] = useState(false);
  const [isGratinModalVisible, setIsGratinModalVisible] = useState(false);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isGratinado,setIsGratinado] = useState(false);
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
    let updatedSalsas = [...selectedSalsas];
    if (updatedSalsas.includes(salsa)) {
      updatedSalsas = updatedSalsas.filter(s => s !== salsa);
    } else if (updatedSalsas.length < 2) {
      updatedSalsas.push(salsa);
    }
    setSelectedSalsas(updatedSalsas);
    if (updatedSalsas.length === 2) {
      setIsExtraQuestionVisible(true);
    }
  };

  const handleExtraOptionSelect = (option) => {
    setIsExtraQuestionVisible(false);
    if (option === 'yes') {
      setIsExtraModalVisible(true);
    } else {
      setIsGratinQuestionVisible(true);
    }
  };

  const handleExtraSelect = (extra) => {
    setSelectedExtra(extra);
    setIsExtraModalVisible(false);
    setIsGratinQuestionVisible(true);
  };

  const handleGratinOptionSelect = (option) => {
    setIsGratinQuestionVisible(false);
    if (option === 'yes') {
      setIsGratinModalVisible(true);
      setIsGratinado(true);
    } else {
      setExpandedSection('menu');
      setIsGratinado(false);
    }
  };

  const handleGratinSelect = (gratin) => {
    setSelectedGratin(gratin);
    setIsGratinModalVisible(false);
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
    const extraPrice = selectedExtra ? parseFloat(selectedExtra.precio.replace('€', '')) : 0;
    const gratinPrice = selectedGratin ? parseFloat(menuData.alGusto.gratinar[selectedTalla].precio.replace('€', '')) : 0;
    const gratinadoPrice = selectedGratin ? parseFloat(selectedGratin.precio.replace('€', '')) : 0;
    
    console.log(tallaPrice + " "+ basePrice+ " "+menuPrice+ " "+extraPrice+ " "+gratinPrice+ " "+gratinadoPrice);
    return tallaPrice + basePrice + menuPrice + extraPrice + gratinPrice + gratinadoPrice;
    setSelectedGratin
    
  };

  const handleAccept = () => {
    const nuevoResumen = {
      Tipo: 'Al Gusto',
      Talla: selectedTalla,
      Carnes: selectedCarnes,
      Base: selectedBase,
      Salsas: selectedSalsas,
      Extra: selectedExtra ? selectedExtra.nombre : null,
      Gratin: selectedGratin ? selectedGratin.nombre : null,
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
    setSelectedSalsas([]);
    setSelectedExtra(null);
    setSelectedGratin(null);
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
    setSelectedSalsas([]);
    setSelectedExtra(null);
    setSelectedGratin(null);
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
            {menuData.alGusto.extras.map((extra, index) => (
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
        visible={isGratinQuestionVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsGratinQuestionVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>¿Deseas gratinar tu taco?</Text>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleGratinOptionSelect('yes')}>
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => handleGratinOptionSelect('no')}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isGratinModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsGratinModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Extra de gratinzacion:</Text>
            {Object.entries(menuData.alGusto.gratinadoProductos).map(([nombre, gratin], index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, selectedGratin && selectedGratin.nombre === nombre && styles.selectedButton]}
                onPress={() => handleGratinSelect({ nombre, ...gratin })}
              >
                <Text style={styles.buttonText}>{`${nombre.charAt(0).toUpperCase() + nombre.slice(1)} - Precio: ${gratin.precio}`}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsGratinModalVisible(false)}>
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
              <Text style={styles.sectionTitle}>Selecciona 2 Salsas:</Text>
              {menuData.alGusto.salsas.map((salsa, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, selectedSalsas.includes(salsa) && styles.selectedButton]}
                  onPress={() => handleSalsaSelect(salsa)}
                >
                  <Text style={styles.buttonText}>{salsa}</Text>
                </TouchableOpacity>
              ))}
              {selectedSalsas.length < 2 && (
                <Text style={styles.warningText}>Por favor, selecciona 2 salsas.</Text>
              )}
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
          <Text style={styles.summaryText}>{'->'} Salsas:</Text>
          {selectedSalsas.map((salsa, index) => (
            <Text key={index} style={styles.baseText}>{'-'} {salsa}</Text>
          ))}
          {selectedExtra && (
            <>
              <Text style={styles.summaryText}>{'->'} Extra:</Text>
              <Text style={styles.baseText}>{'-'} {selectedExtra.nombre}</Text>
            </>
          )}
          {selectedGratin && (
            <>
              <Text style={styles.summaryText}>{'->'} Gratinado:</Text>
              <Text style={styles.baseText}>{'-'} {selectedGratin.nombre}</Text>
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
