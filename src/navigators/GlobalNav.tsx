import { Platform } from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import TabNavigator from '~/navigators/TabNav';
import SignUp from '~/screens/onBoard/SignUp';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QrScreen from '~/screens/QrScreen';
import QrScan from '~/screens/QrScan';
import TransferModal from '~/screens/TransferModal';
type RootStackParamList = {
  SignUp: undefined;
  TabNav: undefined;
  QrScreen: undefined;
  QrScan: undefined;
  TransferModal: undefined;
};

export type GlobalProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUp',
  'TabNav',
  'QrScreen',
  'QrScan',
  'TransferModal'
>;

const Stack = createStackNavigator<RootStackParamList>();

const GlobalNav = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator:
            Platform.OS === 'android'
              ? CardStyleInterpolators.forFadeFromBottomAndroid
              : CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TabNav"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="QrScreen"
          component={QrScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="QrScan"
          component={QrScan}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TransferModal"
          component={TransferModal}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default GlobalNav;
