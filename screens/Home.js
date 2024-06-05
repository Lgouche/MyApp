import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome6, Entypo } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import styles from "../src/styles";

export default function Home(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Al Gusto'); }}>
        <MaterialCommunityIcons name="taco" size={24} color="white" />
        <Text style={styles.buttonText}>Al Gusto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Clasicos'); }}>
        <FontAwesome6 name="fire-flame-simple" size={24} color="white" />
        <Text style={styles.buttonText}>Clásicos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Golden'); }}>
        <MaterialCommunityIcons name="gold" size={24} color="white" />
        <Text style={styles.buttonText}>Golden</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Especiales'); }}>
        <FontAwesome5 name="star" size={24} color="white" />
        <Text style={styles.buttonText}>Especiales</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Bebidas'); }}>
        <MaterialCommunityIcons name="food-fork-drink" size={24} color="white" />
        <Text style={styles.buttonText}>Bebidas</Text>
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
  );
}


