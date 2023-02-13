import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Chat from '~/screens/Chat';
import Shop from '~/screens/Shop';

type RootStackParamList = {
  Shop: undefined;
  // Detail: { userId: string };
};

export type ShopProps = NativeStackScreenProps<RootStackParamList, 'Shop'>;

const Stack = createStackNavigator<RootStackParamList>();

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
