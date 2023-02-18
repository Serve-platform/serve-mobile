import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import My from '~/screens/My';

type RootStackParamList = {
  My: undefined;
  // Detail: { userId: string };
};

export type MyProps = NativeStackScreenProps<RootStackParamList, 'My'>;

const Stack = createStackNavigator<RootStackParamList>();

const MyStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator:
          Platform.OS === 'android'
            ? CardStyleInterpolators.forFadeFromBottomAndroid
            : CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="My"
        options={{
          headerShown: false,
        }}
        component={My}
      />
    </Stack.Navigator>
  );
};

export default MyStackNav;

const styles = StyleSheet.create({});
