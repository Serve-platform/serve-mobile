import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from '~/components/Button';
import theme from '~/styles/color';
import { close } from '~/assets/icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ConfirmDealProps } from '@navigators/GlobalNav';

const ConfirmDeal = () => {
  const navigation = useNavigation<ConfirmDealProps>();
  const { params } = useRoute();
  // @ts-ignore
  const data = JSON.parse(params?.value);
  const address = data.address.substring(0, 7) + '...' + data.address.slice(-5);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.image}></Text>
        <Text style={styles.nickName}>{data.nickName}</Text>
        <Text style={styles.text}>
          (<Text style={styles.address}>{address}</Text>) 에게
        </Text>
        <Text style={styles.seat}>{data.balance} Seat</Text>
        <Text style={styles.text}>를 전송합니다.</Text>

        <Button
          title={`CONFIRM`}
          type={'yellow'}
          style={styles.button}
          onPress={() =>
            navigation.navigate('ConfirmDealByPassword', {
              seatId: data.seatId,
              address: data.address,
              balance: data.balance,
            })
          }
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
  address: {
    color: theme.color.blue,
    fontSize: 14,
  },
});
