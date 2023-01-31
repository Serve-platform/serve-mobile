import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import Home from '~/screens/Home';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Feed from '~/screens/Feed';

type RootStackParamList = {
  Feed: undefined;
  // Detail: { userId: string };
};

export type FeedProps = NativeStackScreenProps<RootStackParamList, 'Feed'>;

const Stack = createStackNavigator<RootStackParamList>();

const FeedStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator:
          Platform.OS === 'android'
            ? CardStyleInterpolators.forFadeFromBottomAndroid
            : CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Feed"
        options={{
          headerShown: false,
        }}
        component={Feed}
      />
    </Stack.Navigator>
  );
};

export default FeedStackNav;

const styles = StyleSheet.create({});
