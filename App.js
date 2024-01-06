import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './src/screens/ListScreen';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import QrScreen from './src/screens/QrScreen';
import RegisterScreen from './src/screens/RegisterScreen';
  const Stack = createNativeStackNavigator();

  function App() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen name="List" component={ListScreen} options={{headerTitle: 'Attendance'}}/>
            <Stack.Screen name='Scan' component={QrScreen} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name='Register' component={RegisterScreen} options={{headerTitle: 'Add New Student'}}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
  
  export default App;
