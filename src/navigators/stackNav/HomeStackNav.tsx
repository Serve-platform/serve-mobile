import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackScreenProps,
} from '@react-navigation/stack';
import React from 'react';
import Home from '~/screens/Home';
import theme from '~/styles/color';
import { CompositeScreenProps } from '@react-navigation/native';
import { TabParamList } from '~/navigators/TabNav';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { GlobalStackParamList } from '~/navigators/GlobalNav';

export type HomeStackParamList = {
  Home: undefined;
};

export type HomeStackNavProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'HomeStackNav'>,
  StackScreenProps<GlobalStackParamList>
>;

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNav = () => {
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
        name="Home"
        options={{
          headerShown: false,
        }}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNav;

const styles = StyleSheet.create({});
