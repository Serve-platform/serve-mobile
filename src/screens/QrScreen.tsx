import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { GlobalProps } from '../navigators/GlobalNav';
import { close } from '~/assets/icons';
import { useRoute } from '@react-navigation/native';

const QrScreen = ({ navigation }: GlobalProps) => {
  let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  const route = useRoute();
  const qrInfo = (route!.params! as any).qrData;
  console.log(qrInfo, 'qrInfo');
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
