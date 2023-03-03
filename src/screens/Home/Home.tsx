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
import {
  boardInfoState,
  isWatchState,
  modalState,
  seatIdState,
} from '~/recoil/atoms';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

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
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [isWatch, setIsWatch] = useRecoilState(isWatchState);
  const boardInfo = useRecoilValue(boardInfoState);
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
    ({ seatIdProp, state }: { seatIdProp: number; state: StateType }) =>
      patchSeatBySeatId(seatIdProp, state),
    {
      onSuccess: () => {
        // @ts-ignore
        navigation.navigate('QrScreen', { seatId: seatId });
      },
    },
  );

  useQuery<TrainSeatsType, Error>(
    ['getSeatBySeatId'],
    async () => {
      if (seatId) {
        const res = await getSeatBySeatId(seatId);
        return res;
      }
    },
    {
      onSuccess: (data: any) => {
        if (data.state === 2 && seatId && isWatch) {
          setModalOpen({
            isOpen: true,
            onPress: () => {
              setIsWatch(false);
              setModalOpen({ ...modalOpen, isOpen: false });
              patchSeatBySeatIdMutation.mutate({
                seatIdProp: seatId,
                state: 3,
              });
            },
            onPressText: '수락하기',
            onCancelText: '거절',
            children: (
              <View>
                <Text
                  style={{
                    color: theme.color.black,
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {data.bookUser.nickName}
                </Text>
                <Text
                  style={{
                    color: theme.color.black,
                    textAlign: 'center',
                    marginBottom: 20,
                  }}>
                  의 양보요청
                </Text>
              </View>
            ),
          });
        }
      },
      refetchInterval: 1000,
      enabled: isWatch!! && onServe!!,
    },
  );

  const onAdvertise = async () => {
    if (!onServe) {
      const uuid = await AsyncStorage.getItem('uuid');
      uuid && onAdvertiseStart(uuid);
    } else {
      onAdvertiseStop();
    }
  };

  const getNickName = async () => {
    const nickNameState = (await AsyncStorage.getItem('nickName')) || '';
    setNickName(nickNameState);
    console.log('> account?.address ');
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
            content={`${boardInfo.trainLocation}메트로 ${boardInfo.trainLine}호선 ${boardInfo.trainUuid}열차 ${boardInfo.doorNumber}호칸 탑승 중`}
          />
        ) : (
          <View style={styles.boardInfo}>
            <Text
              style={{
                fontSize: 20,
                color: theme.color.white,
              }}>
              {isWatch
                ? `${boardInfo.trainLocation}메트로 ${boardInfo.trainLine}호선 ${boardInfo.trainUuid}열차 ${boardInfo.doorNumber}호칸 탑승 중`
                : '탑승 정보 입력'}
            </Text>
          </View>
        )}
      </Pressable>

      <DragButton
        disabled={boardInfo.trainUuid === ''}
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
