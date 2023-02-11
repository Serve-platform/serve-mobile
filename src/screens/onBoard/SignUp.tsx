import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Wallet from 'ethereumjs-wallet';
import Logo from '../../assets/icons/logo.png';
import { GlobalProps } from '~/navigators/GlobalNav';
import { TonClient } from '@eversdk/core';
import { libReactNative } from '@eversdk/lib-react-native';

const SignUp = ({ navigation }: GlobalProps) => {
  TonClient.useBinaryLibrary(libReactNative);
  const [privateKey, setPrivateKey] = useState<string>();
  const [address, setAddress] = useState<string>();

  const Tonclient = new TonClient({
    network: {
      server_address:
        'https://mainnet.evercloud.dev/f3c39a48169e4efb9f61ff63e23acae9',
      endpoints: [
        'https://mainnet.evercloud.dev/f3c39a48169e4efb9f61ff63e23acae9/graphql',
      ],
      message_retries_count: 3,
      message_processing_timeout: 40000,
      wait_for_timeout: 40000,
      access_key: 'd11f2d50681c4a0fa4576dcf93be4de1',
    },
  });

  // ton wallet generate
  const creatTonWallet = async () => {
    const { secret } = await Tonclient.crypto.generate_random_sign_keys();
    const address_ = (
      await Tonclient.net.query_collection({
        collection: 'accounts',
        filter: { id: { eq: `0x${secret}` } },
        result: 'id',
      })
    ).result[0].id;
    console.log(address_, 'address');
  };
  //eth wallet generate
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

      <TouchableOpacity
        style={{
          width: 300,
          height: 60,
          backgroundColor: '#D9D9D9',
          alignItems: 'center',
          justifyContent: 'center',
          top: 10,
        }}
        onPress={creatTonWallet}>
        <Text style={{ color: '#ABABAB' }}>새 톤 네트워크지갑 만들기</Text>
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
