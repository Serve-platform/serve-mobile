import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { modalState, seatIdState } from '~/recoil/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DragButton from '~/components/DragButton';
import { HomeStackNavProps } from '~/navigators/stackNav/HomeStackNav';
import TextLoopTicker from '~/components/TextLoopTicker';
import { getQrSvg } from '~/api';
import { onboarding } from '~/assets/images';
import theme from '~/styles/color';
import useBluetooth from '~/hooks/useBluetooth';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';

const Home = () => {
  const navigation = useNavigation<HomeStackNavProps>();
  const setModalOpen = useSetRecoilState(modalState);
  const [onServe, setOnServe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [onModalVisible, setOnModalVisible] = useState(false);

  const [qrData, setQrData] = useState('');
  const [nickName, setNickName] = useState('');

  const { onAdvertiseStart, onAdvertiseStop } = useBluetooth();

  const seatId = useRecoilState(seatIdState);

  const moveQr = () => {
    setOnModalVisible(!onModalVisible);
    navigation.navigate('QrScan');
  };
  const balance = 1;
  const token = 'abc';

  const getQrSvgQuery = useQuery(
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

  const moveQrCode = () => {
    setModalVisible(!modalVisible);
    const qrSvg = getQrSvgQuery.data;
    setQrData(qrSvg);
    navigation.navigate('QrScreen', {
      qrData: qrSvg,
    });
  };

  const onAdvertise = async () => {
    // setModalOpen({
    //   onPress: () => {},
    //   onCancelText: '거절',
    //   onPressText: '거래하기',
    //   children: (
    //     <>
    //       <View style={{ alignItems: 'center' }}>
    //         <Text
    //           style={{
    //             color: theme.color.black,
    //             fontWeight: '700',
    //             fontSize: 20,
    //             marginTop: 20,
    //           }}>
    //           Nick Name
    //         </Text>
    //         <Text
    //           style={{
    //             color: theme.color.black,
    //             fontWeight: '600',
    //             fontSize: 14,
    //           }}>
    //           의 양보 요청 수락
    //         </Text>
    //         <Text
    //           style={{
    //             color: theme.color.black,
    //             fontWeight: '600',
    //             fontSize: 14,
    //           }}>
    //           ~~의 좌석으로 이동하세요
    //         </Text>
    //       </View>
    //       <View style={{ position: 'absolute', bottom: 250 }}>
    //         <Image
    //           source={avatar}
    //           style={{
    //             width: 80,
    //             height: 80,
    //           }}
    //         />
    //       </View>
    //     </>
    //   ),
    //   isOpen: true,
    // });

    if (!onServe) {
      const uuid = await AsyncStorage.getItem('uuid');
      uuid && onAdvertiseStart(uuid);
    } else {
      onAdvertiseStop();
    }
  };

  const getNickName = async () => {
    const nickName = (await AsyncStorage.getItem('nickName')) || '';
    setNickName(nickName);
  };

  useEffect(() => {
    getNickName().then();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 30,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.title}>
            Hi,
            <Text style={{ color: theme.color.main }}> {nickName}!</Text>
          </Text>
          <Text
            style={{
              marginTop: 14,
              color: theme.color.white,
              fontWeight: '500',
            }}>
            Lv1
          </Text>
        </View>

        <View
          style={{
            width: 46,
            height: 46,
            borderWidth: 1,
            borderColor: theme.color.main,
            borderRadius: 46,
          }}
        />
      </View>
      <Image
        source={onboarding}
        style={{
          marginVertical: 24,
          alignSelf: 'center',
          width: (206 / 360) * Dimensions.get('window').width,
          height: (206 / 760) * Dimensions.get('window').height,
        }}
      />
      {/* 탑승 정보 */}
      <Pressable
        onPress={() => {
          onServe ? null : navigation.navigate('BoardingInfo');
        }}>
        <View
          style={{
            position: 'absolute',
            top: -18,
            alignSelf: 'center',
            zIndex: 2,
            borderWidth: 1,
            borderColor: theme.color.main,
            borderRadius: 20,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: theme.color.black,
          }}>
          <Text style={{ color: theme.color.main, fontWeight: '700' }}>
            {onServe ? 'Edit' : 'Enter'} Boarding Info.
          </Text>
        </View>
        {onServe ? (
          <TextLoopTicker
            style={{
              backgroundColor: onServe
                ? theme.color.black
                : 'rgba(245, 245, 245, 0.4)',
            }}
            content="서울메트로 2호선 3386열차 3호칸 탑승 중adasdfsdffadfadf"
          />
        ) : (
          <View style={styles.boardInfo}>
            <Text
              style={{
                fontSize: 20,
                color: theme.color.white,
              }}>
              탑승 정보 입력
            </Text>
          </View>
        )}
      </Pressable>

      <DragButton
        onPress={onAdvertise}
        isOn={onServe}
        setIsOn={(serve: boolean) => setOnServe(serve)}
        type={'serve'}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: theme.color.white,
  },
  boardInfo: {
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: theme.color.grayscale.D9D9D9,
    paddingVertical: 18,
    alignItems: 'center',
  },
});
