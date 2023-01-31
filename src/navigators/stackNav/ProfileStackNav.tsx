import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import Home from '~/screens/Home';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Profile from '~/screens/Profile';

type RootStackParamList = {
  Profile: undefined;
  // Detail: { userId: string };
};

export type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

const Stack = createStackNavigator<RootStackParamList>();

const ProfileStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator:
          Platform.OS === 'android'
            ? CardStyleInterpolators.forFadeFromBottomAndroid
            : CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNav;

const styles = StyleSheet.create({});
