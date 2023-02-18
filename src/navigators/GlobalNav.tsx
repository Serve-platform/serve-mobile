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
import BoardingInfo from '~/screens/Home/BoardingInfo';

export type GlobalStackParamList = {
  SignUp: undefined;
  TabNav: undefined;
  QrScreen: { qrData: string };
  QrScan: undefined;
  TransferModal: undefined;
  BoardingInfo: undefined;
};

export type SignUpProps = NativeStackScreenProps<
  GlobalStackParamList,
  'SignUp'
>;
export type TabNavProps = NativeStackScreenProps<
  GlobalStackParamList,
  'TabNav'
>;

export type SinUpProps = NativeStackScreenProps<GlobalStackParamList, 'SignUp'>;

export type GlobalProps = NativeStackScreenProps<
  GlobalStackParamList,
  'TabNav'
>;
export type BoardingInfoProps = NativeStackScreenProps<
  GlobalStackParamList,
  'BoardingInfo'
>;
export type QrScreenProps = NativeStackScreenProps<
  GlobalStackParamList,
  'QrScreen'
>;
export type QrScanProps = NativeStackScreenProps<
  GlobalStackParamList,
  'QrScan'
>;
export type TransferModalProps = NativeStackScreenProps<
  GlobalStackParamList,
  'TransferModal'
>;

const Stack = createStackNavigator<GlobalStackParamList>();

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
          name="BoardingInfo"
          options={{
            headerShown: false,
          }}
          component={BoardingInfo}
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
