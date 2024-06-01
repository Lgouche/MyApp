import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
//Iconos
import { MaterialCommunityIcons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';


export default function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="taco" size={24} color="white" />
        <Text style={styles.buttonText}>Al Gusto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="fire-flame-simple" size={24} color="white" />
        <Text style={styles.buttonText}>Clasicos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="gold" size={24} color="white" />
        <Text style={styles.buttonText}>Golden</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome5 name="star" size={24} color="white" />
        <Text style={styles.buttonText}>Especiales</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="food-fork-drink" size={24} color="white" />
        <Text style={styles.buttonText}>Bebidas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D57C48',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
