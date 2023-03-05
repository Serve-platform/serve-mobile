import {
  CardStyleInterpolators,
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { Image, Platform, TouchableOpacity } from 'react-native';
import { backArrow, close } from '~/assets/icons';

import BoardingInfo from '~/screens/Home/BoardingInfo';
import ConfirmDeal from '@screens/Find/ConfirmDeal';
import ConfirmDealByPassword from '@screens/Find/ConfirmDealByPassword';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QrScan from '~/screens/QrScan';
import QrScreen from '~/screens/QrScreen';
import React from 'react';
import SelectSeatInfo from '~/screens/Home/SelectSeatInfo';
import SignUp from '~/screens/onBoard/SignUp';
import TabNavigator from '~/navigators/TabNav';
import TransferModal from '~/screens/TransferModal';
import { seatIdState } from '~/recoil/atoms';
import theme from '~/styles/color';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';

export type GlobalStackParamList = {
  SignUp: undefined;
  TabNav: undefined;
  QrScreen: { seatId: number };
  QrScan: undefined;
  TransferModal: undefined;
  BoardingInfo: undefined;
  ConfirmDeal: { value: any };
  ConfirmDealByPassword: { seatId: number; address: string; balance: string };
  SelectSeatInfo: undefined;
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
export type BoardingInfoProps = StackNavigationProp<
  GlobalStackParamList,
  'BoardingInfo'
>;
export type ConfirmDealProps = StackNavigationProp<
  GlobalStackParamList,
  'ConfirmDeal'
>;
export type ConfirmDealByPasswordProps = StackNavigationProp<
  GlobalStackParamList,
  'ConfirmDealByPassword'
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
  const setSeatId = useSetRecoilState(seatIdState);
  const navigation = useNavigation<BoardingInfoProps>();
  const navigationConfirmDeal = useNavigation<ConfirmDealProps>();
  const navigationConfirmDealByPassword =
    useNavigation<ConfirmDealByPasswordProps>();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            height: 80,
            backgroundColor: theme.color.black,
          },
          cardStyle: { backgroundColor: theme.color.black },
          headerTitleStyle: {
            fontSize: 16,
            color: theme.color.white,
            fontWeight: '900',
          },
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
            headerTitle: 'Enter boarding information',
            headerLeft: () => (
              <TouchableOpacity
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                style={{ marginLeft: 30 }}
                onPress={() => navigation.goBack()}>
                <Image
                  style={{
                    width: 16,
                    height: 16,
                  }}
                  source={close}
                />
              </TouchableOpacity>
            ),
          }}
          component={BoardingInfo}
        />
        <Stack.Screen
          name="SelectSeatInfo"
          options={{
            headerTitle: 'Enter boarding information',
            headerLeft: () => (
              <TouchableOpacity
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                style={{ marginLeft: 30 }}
                onPress={() => {
                  setSeatId(null);
                  navigation.goBack();
                }}>
                <Image
                  style={{
                    width: 16,
                    height: 16,
                  }}
                  source={backArrow}
                />
              </TouchableOpacity>
            ),
          }}
          component={SelectSeatInfo}
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
        <Stack.Screen
          name="ConfirmDeal"
          options={{
            headerTitle: 'confirm',
            headerLeft: () => (
              <TouchableOpacity
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                style={{ marginLeft: 30 }}
                onPress={() => {
                  navigationConfirmDeal.goBack();
                }}>
                <Image
                  style={{
                    width: 16,
                    height: 16,
                  }}
                  source={close}
                />
              </TouchableOpacity>
            ),
          }}
          component={ConfirmDeal}
        />
        <Stack.Screen
          name="ConfirmDealByPassword"
          options={{
            headerTitle: 'configm',
            headerLeft: () => (
              <TouchableOpacity
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                style={{ marginLeft: 30 }}
                onPress={() => {
                  navigationConfirmDealByPassword.goBack();
                }}>
                <Image
                  style={{
                    width: 16,
                    height: 16,
                  }}
                  source={close}
                />
              </TouchableOpacity>
            ),
          }}
          component={ConfirmDealByPassword}
        />
      </Stack.Navigator>
    </>
  );
};

export default GlobalNav;
