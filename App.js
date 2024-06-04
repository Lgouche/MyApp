import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import Registro from './screens/Registro';
import AlGusto from './screens/AlGusto';
import Clasicos from './screens/Clasicos';
import Golden from './screens/Golden';
import Especiales from './screens/Especiales';
import Bebidas from './screens/Bebidas';
import Resumenes from './screens/Resumenes';

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    const [resumenes, setResumenes] = React.useState([]);

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          options={{
            title: 'Home',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' },
            headerLeft: () => null,  // Elimina el botón de volver
            gestureEnabled: false,   // Deshabilita el gesto de volver
          }}
        >
          {props => <Home {...props} resumenes={resumenes} />}
        </Stack.Screen>
        <Stack.Screen
          name="Al Gusto"
          options={{
            title: 'Al Gusto',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' },
          }}
        >
          {props => <AlGusto {...props} resumenes={resumenes} setResumenes={setResumenes} />}
        </Stack.Screen>
        <Stack.Screen
          name="Clasicos"
          options={{
            title: 'Clasicos',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' }
          }}
        >
          {props => <Clasicos {...props} resumenes={resumenes} setResumenes={setResumenes} />}
        </Stack.Screen>
        <Stack.Screen
          name="Golden"
          options={{
            title: 'Golden',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' }
          }}
        >
          {props => <Golden {...props} resumenes={resumenes} setResumenes={setResumenes} />}
        </Stack.Screen>
        <Stack.Screen
          name="Especiales"
          options={{
            title: 'Especiales',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' }
          }}
        >
          {props => <Especiales {...props} resumenes={resumenes} setResumenes={setResumenes} />}
        </Stack.Screen>
        <Stack.Screen
          name="Bebidas"
          options={{
            title: 'Bebidas',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' }
          }}
        >
          {props => <Bebidas {...props} resumenes={resumenes} setResumenes={setResumenes} />}
        </Stack.Screen>
        <Stack.Screen
          name="Resumenes"
          options={{
            title: 'Resúmenes',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' }
          }}
        >
          {props => <Resumenes {...props} resumenes={resumenes} setResumenes={setResumenes} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
