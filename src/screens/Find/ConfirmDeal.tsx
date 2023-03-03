import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from '~/components/Button';
import theme from '~/styles/color';
import { close } from '~/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { ConfirmDealProps } from '@navigators/GlobalNav';

const ConfirmDeal = () => {
  const navigation = useNavigation<ConfirmDealProps>();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.image}></Text>
        <Text style={styles.nickName}>다정한 수박</Text>
        <Text style={styles.text}>에게</Text>
        <Text style={styles.seat}>3 Seat</Text>
        <Text style={styles.text}>를 전송합니다.</Text>

        <Button
          title={`CONFIRM`}
          type={'yellow'}
          style={styles.button}
          onPress={() => navigation.navigate('ConfirmDealByPassword')}
        />

        <TouchableOpacity
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={close}
            style={{
              width: 12,
              height: 12,
            }}
          />
          <Text style={styles.cancel}> 취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmDeal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  wrapper: {
    marginTop: 100,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: theme.color.gray,
  },
  nickName: {
    marginTop: 10,
    fontSize: 20,
    color: theme.color.white,
    fontWeight: 'bold',
  },
  seat: {
    marginTop: 30,
    fontSize: 20,
    color: theme.color.white,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    color: theme.color.white,
  },
  button: {
    marginTop: 100,
    width: '100%',
  },
  cancel: {
    marginLeft: 10,
    fontSize: 14,
    color: theme.color.white,
  },
});
