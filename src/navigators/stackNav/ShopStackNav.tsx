import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Shop from '~/screens/Shop';

export type ShopStackParamList = {
  Shop: undefined;
};

export type ShopProps = NativeStackScreenProps<ShopStackParamList, 'Shop'>;

const Stack = createStackNavigator<ShopStackParamList>();

const ShopStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator:
          Platform.OS === 'android'
            ? CardStyleInterpolators.forFadeFromBottomAndroid
            : CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Shop"
        options={{
          headerShown: false,
        }}
        component={Shop}
      />
    </Stack.Navigator>
  );
};

export default ShopStackNav;

const styles = StyleSheet.create({});
