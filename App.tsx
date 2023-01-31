import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import GlobalNav from '~/navigators/GlobalNav';

const App = () => {
  return (
    <NavigationContainer>
      <GlobalNav />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
