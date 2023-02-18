import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import theme from '~/styles/color';
import { CompositeNavigationProp } from '@react-navigation/native';
import { GlobalStackParamList } from '~/navigators/GlobalNav';

import Home from '~/screens/Home/Home';
import { TabParamList } from '~/navigators/TabNav';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type HomeStackParamList = {
  Home: undefined;
};

export type HomeStackNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'HomeStackNav'>,
  StackNavigationProp<GlobalStackParamList>
>;

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNav = () => {
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
        name="Home"
        options={{
          headerTitle: 'Home',
          headerLeft: () => null,
        }}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNav;

const styles = StyleSheet.create({});
