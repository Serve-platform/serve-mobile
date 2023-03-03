import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  StateType,
  TrainSeatsType,
  getSeatBySeatId,
  patchSeatBySeatId,
} from '~/api';
import { isWatchState, modalState, seatIdState } from '~/recoil/atoms';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DragButton from '~/components/DragButton';
import { HomeStackNavProps } from '~/navigators/stackNav/HomeStackNav';
import TextLoopTicker from '~/components/TextLoopTicker';
import { onboarding } from '~/assets/images';
import theme from '~/styles/color';
import useBluetooth from '~/hooks/useBluetooth';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation<HomeStackNavProps>();
  const setModalOpen = useSetRecoilState(modalState);
  const [isWatch, setIsWatch] = useRecoilState(isWatchState);
  const [onServe, setOnServe] = useState(false);
  const [onModalVisible, setOnModalVisible] = useState(false);

  const [nickName, setNickName] = useState('');

  const { onAdvertiseStart, onAdvertiseStop } = useBluetooth();

  const seatId = useRecoilValue(seatIdState);

  const moveQr = () => {
    setOnModalVisible(!onModalVisible);
    navigation.navigate('QrScan');
  };

  const patchSeatBySeatIdMutation = useMutation(
    'patchSeatBySeatId',
    ({ seatId, state }: { seatId: number; state: StateType }) =>
      patchSeatBySeatId(seatId, state),
    {
      onSuccess: () => {
        // todo qr화면으로 이동 (유저이름, 지갑 address, balance값 전송해야됨)
        navigation.navigate('QrScreen', { qrData: 'username' });
      },
    },
  );

  useQuery<TrainSeatsType, Error>(
    ['getSeatBySeatId', isWatch],
    async () => {
      if (seatId) {
        const res = await getSeatBySeatId(seatId);
        console.log('> res : ', res);
        return res;
      }
    },
    {
      onSuccess: data => {
        if (data.state === 2 && seatId && isWatch) {
          // if (seatId && isWatch) {
          setModalOpen({
            isOpen: true,
            onPress: () => {
              patchSeatBySeatIdMutation.mutate({ seatId: seatId, state: 3 });
            },
            onPressText: '수락하기',
            onCancelText: '거절',
            children: (
              <View>
                <Text></Text>
                <Text>의 양보요청</Text>
              </View>
            ),
          });
        }
      },
      enabled: isWatch!!,
    },
  );

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
