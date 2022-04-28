import { Appbar,Menu } from 'react-native-paper';
import {useState } from 'react';

/* 
Integrate AppBar with react-navigation.
https://callstack.github.io/react-native-paper/integrate-app-bar-with-react-navigation.html
*/
export default function Navigationbar({route, navigation}) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // Check if title is passed as parameter.
  const title = route?.params ? route.params.title : 'Chat app';
  const showBack = route?.params?.showBack ? route.params.showBack : false;
  const backRoute = route?.params?.backRoute ? route.params.backRoute : '';

  return (
    <Appbar.Header>
      {showBack ? <Appbar.BackAction onPress={() => navigation.navigate(backRoute)} /> : null}
      <Appbar.Content title={title} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={  
        <Appbar.Action
          icon="dots-vertical"
          color='#fff'
          onPress={openMenu}
        /> 
        }
        >
        <Menu.Item onPress={() => {console.log('Groups')}} title="Groups" />
        <Menu.Item onPress={() => {console.log('Settings')}} title="Settings" />
        <Menu.Item onPress={() => {console.log('Logout')}} title="Logout" />
      </Menu>
    </Appbar.Header>   
  );
}