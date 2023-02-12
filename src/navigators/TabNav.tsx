import { Image, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStackNav from '~/navigators/stackNav/HomeStackNav';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import FindStackNav from '~/navigators/stackNav/FindStacknav';
import MyStackNav from '~/navigators/stackNav/MyStackNav';
import ChatStackNav from '~/navigators/stackNav/ChatStackNav';
import ShopStackNav from '~/navigators/stackNav/ShopStackNav';
import theme from '~/styles/color';

type RootStackParamList = {
  HomeStackNav: undefined;
  ChatStackNav: undefined;
  FindStackNav: undefined;
  ShopStackNav: undefined;
  MyStackNav: { userId: string };
};

export type HomeStackNavProps = NativeStackScreenProps<
  RootStackParamList,
  'HomeStackNav'
>;

const Tabs = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          // fontFamily: "SUIT-Regular",
        },

        headerStyle: { backgroundColor: theme.color.black },
        headerTitleStyle: { color: theme.color.white, fontWeight: '900' },
        // tabBarHideOnKeyboard: true,

        tabBarStyle: {
          position: 'absolute',
          height: 100,
          paddingTop: 20,

          backgroundColor: theme.color.main,
          // borderTopLeftRadius: 30,
          // borderTopRightRadius: 30,
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
          headerTitle: 'Home',
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
        name="ChatStackNav"
        component={ChatStackNav}
        options={{
          headerTitle: 'Chat',
          tabBarLabel: ({ focused }) => (
            <Text style={styles(focused).labelStyle}>CHAT</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: 35, height: 35, marginBottom: 5 }}
              source={focused ? chat : blankChat}
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
      marginBottom: 28,
    },
  });
