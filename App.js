import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider} from 'react-native-paper';
import Login from './screens/Login';
import Registration from './screens/Registration';
import Home from './screens/Home';
import Users from './screens/Users';
import Messages from './screens/Messages';
import Navigationbar from './components/Navigationbar';
import { StatusBar } from 'expo-status-bar';
import theme from './styles/Theme'; 

//const STORAGE_KEY = '@user_key';

export default function App() {
  const Stack = createStackNavigator();

  return (
   <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar backgroundColor='#fff' />
        <Stack.Navigator 
          initialRouteName='Login'
          screenOptions={{
            header: (props) =>  <Navigationbar {...props}/>,
          }}
        >
          <Stack.Screen 
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name='Registration'
            component={Registration}
          />
          <Stack.Screen 
            name="Home"
            component={Home}
          />
          <Stack.Screen 
            name="Users"
            component={Users}
          />
          <Stack.Screen 
            name="Messages"
            component={Messages}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}


