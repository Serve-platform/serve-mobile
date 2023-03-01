import FindStackNav, {
  FindStackParamList,
} from '~/navigators/stackNav/FindStacknav';
import HomeStackNav, {
  HomeStackParamList,
} from '~/navigators/stackNav/HomeStackNav';
import { Image, StyleSheet, Text } from 'react-native';
import MyStackNav, { MyStackParamList } from '~/navigators/stackNav/MyStackNav';
import ShopStackNav, {
  ShopStackParamList,
} from '~/navigators/stackNav/ShopStackNav';
import {
  blankChat,
  blankFind,
  blankHome,
  blankMy,
  blankShop,
  chat,
  find,
  home,
  my,
  shop,
} from '~/assets/icons';

import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from '~/styles/color';

export type TabParamList = {
  HomeStackNav: NavigatorScreenParams<HomeStackParamList>;
  FindStackNav: NavigatorScreenParams<FindStackParamList>;
  ShopStackNav: NavigatorScreenParams<ShopStackParamList>;
  MyStackNav: NavigatorScreenParams<MyStackParamList>;
};

const Tabs = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          // fontFamily: "SUIT-Regular",
        },

        headerStyle: { backgroundColor: theme.color.black },
        headerTitleStyle: { color: theme.color.white, fontWeight: '900' },

        tabBarStyle: {
          // position: 'absolute',
          height: 80,
          paddingTop: 20,
          paddingBottom: 20,

          backgroundColor: theme.color.main,
          shadowOffset: {
            width: 10,
            height: 8,
          },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 24,
        },
      }}>
      <Tabs.Screen
        name="HomeStackNav"
        component={HomeStackNav}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text style={styles(focused).labelStyle}>HOME</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 35, height: 35, marginBottom: 5 }}
              source={focused ? home : blankHome}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="FindStackNav"
        component={FindStackNav}
        options={{
          headerTitle: 'Find',
          tabBarLabel: ({ focused }) => (
            <Text style={styles(focused).labelStyle}>Find</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 35, height: 35, marginBottom: 5 }}
              source={focused ? find : blankFind}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ShopStackNav"
        component={ShopStackNav}
        options={{
          headerTitle: 'Shop',
          tabBarLabel: ({ focused }) => (
            <Text style={styles(focused).labelStyle}>Shop</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 35, height: 35, marginBottom: 5 }}
              source={focused ? shop : blankShop}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="MyStackNav"
        component={MyStackNav}
        options={{
          headerTitle: 'My',
          tabBarLabel: ({ focused }) => (
            <Text style={styles(focused).labelStyle}>MY</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 35, height: 35, marginBottom: 5 }}
              source={focused ? my : blankMy}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;

const styles = (focused: boolean) =>
  StyleSheet.create({
    labelStyle: {
      fontSize: 14,
      backgroundColor: 'transparent',
      color: theme.color.black,
      fontWeight: focused ? '900' : '600',
      // marginBottom: 28,
    },
  });
