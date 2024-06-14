import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome6, Entypo } from '@expo/vector-icons';

export default function Home(props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.column}>
        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Al Gusto'); }}>
          <MaterialCommunityIcons name="taco" size={24} color="white" />
          <Text style={styles.buttonText}>Al Gusto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Graten'); }}>
          <MaterialCommunityIcons name="taco" size={24} color="white" />
          <Text style={styles.buttonText}>Graten</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Clasicos'); }}>
          <FontAwesome6 name="fire-flame-simple" size={24} color="white" />
          <Text style={styles.buttonText}>Clásicos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Golden'); }}>
          <MaterialCommunityIcons name="gold" size={24} color="white" />
          <Text style={styles.buttonText}>Golden</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Entrantes'); }}>
          <FontAwesome5 name="star" size={24} color="white" />
          <Text style={styles.buttonText}>Entrantes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Bebidas'); }}>
          <MaterialCommunityIcons name="food-fork-drink" size={24} color="white" />
          <Text style={styles.buttonText}>Bebidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Vegetarianos'); }}>
          <MaterialCommunityIcons name="food-fork-drink" size={24} color="white" />
          <Text style={styles.buttonText}>Vegetarianos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Postres'); }}>
          <MaterialCommunityIcons name="food-fork-drink" size={24} color="white" />
          <Text style={styles.buttonText}>Postres</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('MenuInfantil'); }}>
          <MaterialCommunityIcons name="food-fork-drink" size={24} color="white" />
          <Text style={styles.buttonText}>M. Infantil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Resumenes'); }}>
          <Entypo name="text-document" size={24} color="white" />
          <Text style={styles.buttonText}>Resúmenes</Text>
          {props.resumenes.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{props.resumenes.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
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
  column: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ajustar al ancho total del contenedor
  },
  button: {
    backgroundColor: '#895232',
    margin: 10,
    padding: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%', // Ancho del botón (ajustable según el número de columnas)
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
