import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { QrScanProps } from '~/navigators/GlobalNav';
import theme from '@styles/color';
import { Camera, CameraType } from 'react-native-camera-kit';

const QrScan = ({ navigation }: QrScanProps) => {
  const onBarCodeRead = (event: any) => {
    console.log(
      '> event.nativeEvent.codeStringValue : ',
      event.nativeEvent.codeStringValue,
    );
    navigation.navigate('ConfirmDeal');
    // setScaned(true)
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 180,
          width: 300,
          height: 300,
        }}>
        <Text
          style={{
            marginBottom: 20,
            textAlign: 'center',
            color: theme.color.white,
          }}>
          QR코드를 스캔해주세요
        </Text>
        <Camera
          style={{ flex: 1 }}
          ref={null}
          cameraType={CameraType.Back}
          scanBarcode
          showFrame={true}
          laserColor="rgba(0, 0, 0, 0)"
          frameColor="rgba(0, 0, 0, 0)"
          surfaceColor="rgba(0, 0, 0, 0)"
          onReadCode={onBarCodeRead}
        />
      </View>
    </View>
  );
};

export default QrScan;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notAuthorizedText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  buttonTouchable: {
    padding: 16,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  marker: {
    borderColor: '#FFF',
    borderRadius: 10,
    borderWidth: 2,
  },
  topView: {
    flex: 0,
    height: '40%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomView: {
    flex: 0,
    height: '60%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
