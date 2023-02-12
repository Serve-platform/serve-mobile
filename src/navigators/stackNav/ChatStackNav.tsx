import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Chat from '~/screens/Chat';

export type ChatStackParamList = {
  Chat: undefined;
};

export type ChatProps = NativeStackScreenProps<ChatStackParamList, 'Chat'>;

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator:
          Platform.OS === 'android'
            ? CardStyleInterpolators.forFadeFromBottomAndroid
            : CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Chat"
        options={{
          headerShown: false,
        }}
        component={Chat}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNav;

const styles = StyleSheet.create({});
