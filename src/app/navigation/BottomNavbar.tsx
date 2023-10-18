import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { CartScreen } from '../screens/Cart';
import { BarcodeScanner } from '../screens/BarcodeScanner';
import { ROUTES } from './routes';

const Tab = createMaterialBottomTabNavigator();

export function BottomNavBar() {
  return (
    <Tab.Navigator initialRouteName={ROUTES.BarcodeScanner}>
      <Tab.Screen
        name={ROUTES.BarcodeScanner}
        component={BarcodeScanner}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='qrcode'
              color={color}
              size={26}
              style={styles.iconBtn}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.Cart}
        component={CartScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='cart'
              color={color}
              size={26}
              style={styles.iconBtn}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    flex: 1,
  },
});
