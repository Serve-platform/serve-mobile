import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Find from '~/screens/Find';
import theme from '~/styles/color';

type RootStackParamList = {
  Find: undefined;
};

export type FindProps = NativeStackScreenProps<RootStackParamList, 'Find'>;

const Stack = createStackNavigator<RootStackParamList>();

const FindStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.color.black },
        cardStyleInterpolator:
          Platform.OS === 'android'
            ? CardStyleInterpolators.forFadeFromBottomAndroid
            : CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Find"
        options={{
          headerShown: false,
        }}
        component={Find}
      />
    </Stack.Navigator>
  );
};

export default FindStackNav;

const styles = StyleSheet.create({});
