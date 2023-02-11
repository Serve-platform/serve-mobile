import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Wallet from 'ethereumjs-wallet';
import Logo from '../../assets/icons/logo.png';
import { GlobalProps } from '~/navigators/GlobalNav';

const SignUp = ({ navigation }: GlobalProps) => {
  const [privateKey, setPrivateKey] = useState<string>();
  const [address, setAddress] = useState<string>();
  console.log(privateKey, address, 'check wallet');
  const generateWallet = () => {
    const wallet = Wallet.generate();
    setPrivateKey('0x' + wallet.getPrivateKey().toString('hex'));
    setAddress('0x' + wallet.getAddress().toString('hex'));
    navigation.navigate('TabNav');
  };
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#000000',
        height: '100%',
      }}>
      <View style={{ height: 550 }}>
        <Image
          resizeMode="contain"
          source={Logo}
          style={{
            width: 270,
            height: 150,
            top: 210,
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          width: 300,
          height: 60,
          backgroundColor: '#D9D9D9',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={generateWallet}>
        <Text style={{ color: '#ABABAB' }}>새 지갑 만들기</Text>
      </TouchableOpacity>
      {/* {privateKey && (
        <View>
          <Text>Private Key: {privateKey}</Text>
          <Text>Address: {address}</Text>
        </View>
      )} */}
    </View>
  );
};

export default SignUp;
