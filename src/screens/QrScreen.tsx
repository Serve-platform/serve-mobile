import { Image, Text, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { QrScreenProps } from '~/navigators/GlobalNav';
import React from 'react';
import { close } from '~/assets/icons';
import { getQrSvg } from '~/api';
import { useQuery } from 'react-query';
import { useRoute } from '@react-navigation/native';

const QrScreen = ({ navigation }: QrScreenProps) => {
  let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  const route = useRoute();
  const qrInfo = (route!.params! as any).qrData;

  const balance = 1;
  const token = 'abc';

  useQuery(
    ['getQrSvg', token],
    async () => {
      const address = await AsyncStorage.getItem('Address');

      if (address) {
        const result = await getQrSvg({
          address,
          balance,
        });
        return result;
      }
    },
    { enabled: !!token },
  );

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
          backgroundColor: '#EFFF37',
          width: 310,
          height: 310,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <QRCode
          value="Just some string value"
          logo={{ uri: base64Logo }}
          logoSize={30}
          logoBackgroundColor="transparent"
        />
      </View>
    </View>
  );
};

export default QrScreen;
