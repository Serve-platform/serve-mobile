import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Find from '~/screens/Find';
import theme from '~/styles/color';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@navigators/TabNav';
import { GlobalStackParamList } from '@navigators/GlobalNav';

export type FindStackParamList = {
  Find: undefined;
};

export type FindStackNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'FindStackNav'>,
  StackNavigationProp<GlobalStackParamList>
>;

export type FindProps = NativeStackScreenProps<FindStackParamList, 'Find'>;

const Stack = createStackNavigator<FindStackParamList>();

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
