import { StyleSheet, Text, View } from 'react-native';

import Button from '~/components/Button';
import React from 'react';
import { StoreProps } from '@navigators/stackNav/StoreStackNav';
import theme from '@styles/color';

const Store = ({}: StoreProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.image} />
        <View style={styles.wallet}>
          <Button title={`내 지갑 정보`} type={`white`} />
        </View>
        <Text style={styles.balance}>
          잔액 <Text style={styles.coins}>47205</Text> Seat
        </Text>
      </View>

      <Button title={`전환하기`} type={`yellow`} style={styles.button} />
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
    marginTop: 140,
    backgroundColor: theme.color.white,
    borderColor: theme.color.main,
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.color.black,
    height: 240,
  },
  image: {
    position: 'absolute',
    top: -110,
    width: 200,
    height: 200,
    backgroundColor: theme.color.black,
    borderColor: theme.color.main,
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: 15,
    color: theme.color.black,
  },
  wallet: {
    position: 'absolute',
    top: -150,
    width: 200,
    marginTop: 200,
  },
  balance: {
    fontSize: 14,
    marginTop: 150,
    color: theme.color.black,
  },
  coins: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 40,
    color: theme.color.black,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 40,
  },
});
