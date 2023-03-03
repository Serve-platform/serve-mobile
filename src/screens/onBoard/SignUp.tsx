import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Wallet from 'ethereumjs-wallet';
import Logo from '~/assets/icons/logo.png';
// import kakao from '~/assets/icons/kakao.png';
import onboarding from '~/assets/images/onboarding.png';
import walletIcon from '~/assets/icons/wallet.png';
import theme from '~/styles/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignUpProps } from '~/navigators/GlobalNav';

const SignUp = ({ navigation }: SignUpProps) => {
  const [privateKey, setPrivateKey] = useState<string>();
  const [address, setAddress] = useState<string>();

  const generateWallet = () => {
    const wallet = Wallet.generate();
    setPrivateKey('0x' + wallet.getPrivateKey().toString('hex'));
    AsyncStorage.setItem(
      'PrivateKey',
      '0x' + wallet.getPrivateKey().toString('hex'),
    );
    setAddress('0x' + wallet.getAddress().toString('hex'));
    AsyncStorage.setItem('Address', '0x' + wallet.getAddress().toString('hex'));
    navigation.navigate('TabNav');
  };

  const onLogin1 = async () => {
    AsyncStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjZmMDg2NzAtZmZkZi00MGViLTkwNjctNzhiOWFlNmU3OTE5Iiwibmlja05hbWUiOiLquYDrj4TtmIQiLCJpYXQiOjE2Nzc2ODM5MjF9.a_Vg9l5Qi3_poqecNcQjjqJX7GuCI3CBDWmDcm7m1tU',
    );
    AsyncStorage.setItem('nickName', '김도현');
    AsyncStorage.setItem('uuid', '26f08670-ffdf-40eb-9067-78b9ae6e7919');
    navigation.navigate('TabNav');
  };

  const onLogin2 = () => {
    AsyncStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMzQyNzMwZDEtOTIyMS00ZGEwLWFiOGItYmJkN2RhMDdjYTYyIiwibmlja05hbWUiOiLslYTsnbTsnKAiLCJpYXQiOjE2Nzc2ODM5NTJ9.xlEXyk2200KDsW-FF7jys94adZwZpvGt-JfAX8IzGu8',
    );
    AsyncStorage.setItem('nickName', '아이유');
    AsyncStorage.setItem('uuid', '342730d1-9221-4da0-ab8b-bbd7da07ca62');
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
        {/*<TouchableOpacity*/}
        {/*  style={{*/}
        {/*    paddingVertical: 16,*/}
        {/*    borderRadius: 5,*/}
        {/*    alignItems: 'center',*/}
        {/*    justifyContent: 'center',*/}
        {/*    backgroundColor: '#FEE500',*/}
        {/*    display: 'flex',*/}
        {/*    flexDirection: 'row',*/}
        {/*  }}*/}
        {/*  onPress={() => {}}>*/}
        {/*  <Image*/}
        {/*    resizeMode="contain"*/}
        {/*    source={kakao}*/}
        {/*    style={{*/}
        {/*      marginRight: 15,*/}
        {/*      width: 20,*/}
        {/*      height: 19,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <Text*/}
        {/*    style={{*/}
        {/*      color: theme.color.black,*/}
        {/*      fontSize: 17,*/}
        {/*      fontWeight: '500',*/}
        {/*    }}>*/}
        {/*    카카오톡으로 시작하기*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}

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
          onPress={onLogin1}>
          <Text
            style={{
              color: theme.color.white,
              fontSize: 17,
              fontWeight: '500',
            }}>
            사용자1(김도현)
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
          onPress={onLogin2}>
          <Text
            style={{
              color: theme.color.white,
              fontSize: 17,
              fontWeight: '500',
            }}>
            사용자2(아이유)
          </Text>
        </TouchableOpacity>

        {/*<TouchableOpacity
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
            지갑 연동하기
          </Text>
        </TouchableOpacity>*/}
      </View>

      <Text style={{ color: theme.color.white }}>© Team Serve</Text>
    </View>
  );
};

export default SignUp;
