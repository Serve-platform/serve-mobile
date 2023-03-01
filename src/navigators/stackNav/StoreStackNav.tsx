import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Store from '@screens/Store';
import theme from '@styles/color';

export type StoreStackParamList = {
  Store: undefined;
};

export type StoreProps = NativeStackScreenProps<StoreStackParamList, 'Store'>;

const Stack = createStackNavigator<StoreStackParamList>();

const StoreStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.color.black },
        headerTitleStyle: { color: theme.color.white, fontWeight: '900' },
        cardStyle: { backgroundColor: theme.color.black },
        cardStyleInterpolator:
          Platform.OS === 'android'
            ? CardStyleInterpolators.forFadeFromBottomAndroid
            : CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Store"
        options={{
          headerShown: false,
        }}
        component={Store}
      />
    </Stack.Navigator>
  );
};

export default StoreStackNav;

const styles = StyleSheet.create({});
