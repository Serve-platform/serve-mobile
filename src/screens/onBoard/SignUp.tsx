import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Wallet from 'ethereumjs-wallet';
import Logo from '~/assets/icons/logo.png';
import kakao from '~/assets/icons/kakao.png';
import onboarding from '~/assets/images/onboarding.png';
import walletIcon from '~/assets/icons/wallet.png';
import theme from '~/styles/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignUpProps } from '~/navigators/GlobalNav';

const SignUp = ({ navigation }: SignUpProps) => {
  const [privateKey, setPrivateKey] = useState<string>();
  const [privateKey_1, setPrivateKey_2] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [address_1, setAddress_2] = useState<string>();

  const generateWallet = () => {
    const wallet = Wallet.generate();
    setPrivateKey('0x' + wallet.getPrivateKey().toString('hex'));
    AsyncStorage.setItem(
      'PrivateKey',
      '0x' + wallet.getPrivateKey().toString('hex'),
    );
    setAddress('0x' + wallet.getAddress().toString('hex'));
    AsyncStorage.setItem('Address', '0x' + wallet.getAddress().toString('hex'));
    AsyncStorage.setItem('userCheck', '1');
    navigation.navigate('TabNav');
  };
  const generateWallet_2 = () => {
    const wallet = Wallet.generate();
    setPrivateKey_2('0x' + wallet.getPrivateKey().toString('hex'));
    AsyncStorage.setItem(
      'PrivateKey2',
      '0x' + wallet.getPrivateKey().toString('hex'),
    );
    setAddress_2('0x' + wallet.getAddress().toString('hex'));
    AsyncStorage.setItem(
      'Address2',
      '0x' + wallet.getAddress().toString('hex'),
    );
    AsyncStorage.setItem('userCheck', '2');
    navigation.navigate('TabNav');
  };

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.color.black,
        paddingHorizontal: 20,
      }}>
      <Image
        resizeMode="contain"
        source={Logo}
        style={{
          marginTop: 120,
          width: 270,
          height: 150,
        }}
      />

      <Image
        resizeMode="contain"
        source={onboarding}
        style={{
          width: 244,
          height: 236,
        }}
      />

      <View style={{ width: '100%' }}>
        <TouchableOpacity
          style={{
            marginTop: 10,
            paddingVertical: 16,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.color.white,
            display: 'flex',
            flexDirection: 'row',
          }}
          onPress={generateWallet}>
          <Image
            resizeMode="contain"
            source={walletIcon}
            style={{
              marginRight: 15,
              width: 24,
              height: 24,
            }}
          />
          <Text
            style={{
              color: theme.color.white,
              fontSize: 17,
              fontWeight: '500',
            }}>
            유저1로 시작하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10,
            paddingVertical: 16,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.color.white,
            display: 'flex',
            flexDirection: 'row',
          }}
          onPress={generateWallet_2}>
          <Image
            resizeMode="contain"
            source={walletIcon}
            style={{
              marginRight: 15,
              width: 24,
              height: 24,
            }}
          />
          <Text
            style={{
              color: theme.color.white,
              fontSize: 17,
              fontWeight: '500',
            }}>
            유저 2로 시작하기
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: theme.color.white }}>© Team Serve</Text>
    </View>
  );
};

export default SignUp;
