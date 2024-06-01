import { StatusBar } from 'expo-status-bar';
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

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
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
          component={Home}
          options={{
            title: 'Home',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' },
            headerLeft: () => null,  // Elimina el botón de volver
            gestureEnabled: false,   // Deshabilita el gesto de volver
          }}
        />
        <Stack.Screen
          name="Al Gusto"
          component={AlGusto}
          options={{
            title: 'Al Gusto',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' },
          }}
        /><Stack.Screen
          name="Clasicos"
          component={Clasicos}
          options={{
            title: 'Clasicos',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' }
          }}
        /><Stack.Screen
          name="Golden"
          component={Golden}
          options={{
            title: 'Golden',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' }
          }}
        /><Stack.Screen
          name="Especiales"
          component={Especiales}
          options={{
            title: 'Especiales',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' }
          }}
        /><Stack.Screen
          name="Bebidas"
          component={Bebidas}
          options={{
            title: 'Bebidas',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D57C48' }
          }}
        />
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
