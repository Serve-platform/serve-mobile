import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { StoreProps } from '@navigators/stackNav/StoreStackNav';
import theme from '@styles/color';
import Button from '~/component/Button';

const Store = ({}: StoreProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </View>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  wrapper: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

// box-sizing: border-box;
//
// position: absolute;
// width: 300px;
// height: 218px;
// left: 45px;
// top: 250px;
//
// background: #FFFFFF;
// border: 3px solid #EFFF37;
// border-radius: 20px;
