import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity , ScrollView} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome6, Entypo } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import styles from "../src/styles";
import { StackRouter } from '@react-navigation/native';

export default function Home(props) {
  return (
    <ScrollView>

    
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
      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Graten'); }}>
        
        <Text style={styles.buttonText}>Graten</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Vegetarianos'); }}>
        
        <Text style={styles.buttonText}>Vegetarianos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('MenuInfantil'); }}>
        
        <Text style={styles.buttonText}>Menu Infantil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Entrantes'); }}>
        
        <Text style={styles.buttonText}>Entrantes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Postres'); }}>
        
        <Text style={styles.buttonText}>Postres</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}


