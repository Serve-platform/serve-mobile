import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CameraScreen } from 'react-native-camera-kit';
import { QrScanProps } from '~/navigators/GlobalNav';

const QrScan = ({ navigation }: QrScanProps) => {
  const onSuccess = (e: any) => {
    console.log(e.data);
  };
  const [flashMode, setFlashMode] = useState('off');
  const [qrCode, setQRCode] = useState(null);
  const onBarcodeScan = (event: any) => {
    const data = event.nativeEvent.codeStringValue;
    setQRCode(data);
    console.log(data);
  };
  useEffect(() => {
    if (qrCode) {
      console.log('QR Code Scanned', qrCode);
      navigation.navigate('TransferModal');
    }
  }, [qrCode]);

  return (
    <View>
      <View style={{ width: 100, height: 100 }}>
        {/*@ts-ignore*/}
        <CameraScreen
          onReadCode={onBarcodeScan}
          showFrame={true}
          frameColor={'#00FF00'}
          scanBarcode={true}
          laserColor={'#FF3D00'}
        />
      </View>
    </View>
  );
};

export default QrScan;

const styles = StyleSheet.create({
  cameraContainer: {
    height: '100%',
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
