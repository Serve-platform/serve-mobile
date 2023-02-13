import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Chat from '~/screens/Chat';

type RootStackParamList = {
  Chat: undefined;
  // Detail: { userId: string };
};

export type ChatProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const Stack = createStackNavigator<RootStackParamList>();

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
