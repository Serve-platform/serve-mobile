import { Image, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import TabNavigator from '~/navigators/TabNav';
import SignUp from '~/screens/onBoard/SignUp';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QrScreen from '~/screens/QrScreen';
import QrScan from '~/screens/QrScan';
import TransferModal from '~/screens/TransferModal';
import BoardingInfo from '~/screens/Home/BoardingInfo';
import theme from '~/styles/color';
import { close } from '~/assets/icons';
import { useNavigation } from '@react-navigation/native';
import ConfirmDeal from '@screens/Find/ConfirmDeal';
import ConfirmDealByPassword from '@screens/Find/ConfirmDealByPassword';

export type GlobalStackParamList = {
  SignUp: undefined;
  TabNav: undefined;
  QrScreen: { qrData: string };
  QrScan: undefined;
  TransferModal: undefined;
  BoardingInfo: undefined;
  ConfirmDeal: undefined;
  ConfirmDealByPassword: undefined;
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
          headerTitleStyle: { color: theme.color.white, fontWeight: '900' },
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
            headerTitle: '탑승정보 입력',
            headerLeft: () => (
              <TouchableOpacity
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                style={{ marginLeft: 30 }}
                onPress={() => {
                  navigation.goBack();
                  console.log('close');
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
        <Stack.Screen
          name="ConfirmDeal"
          options={{
            headerTitle: '거래하기',
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
            headerTitle: '거래하기',
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
