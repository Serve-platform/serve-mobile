import { Image, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { QrScreenProps } from '~/navigators/GlobalNav';
import React, { useEffect, useState } from 'react';
import { close } from '~/assets/icons';
import theme from '~/styles/color';
import { useRoute } from '@react-navigation/native';

const QrScreen = ({ navigation }: QrScreenProps) => {
  const { params } = useRoute();
  // @ts-ignore
  const seatId = JSON.parse(params?.seatId);

  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    nickName: '',
    address: '',
    balance: '',
    seatId: seatId,
  });

  const onSetData = async () => {
    const nickName = (await AsyncStorage.getItem('nickName')) || '';
    const address = (await AsyncStorage.getItem('Address')) || '';
    const balance = '3';

    setData({
      nickName: nickName,
      address: address,
      balance: balance,
      seatId: seatId,
    });
    setShow(true);
  };

  useEffect(() => {
    onSetData().then();
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'black',
      }}>
      <TouchableOpacity
        style={{ position: 'absolute', left: 30, top: 30 }}
        onPress={() => navigation.goBack()}>
        <Image source={close} style={{ width: 15, height: 15 }} />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: theme.color.main,
          width: 280,
          height: 280,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {show && <QRCode value={JSON.stringify(data)} size={260} />}
      </View>

      <Text style={{ marginTop: 40, color: theme.color.white }}>
        QR 코드를 제시하세요
      </Text>
    </View>
  );
};

export default QrScreen;
