import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import {
  FindProps,
  FindStackNavProps,
} from '@navigators/stackNav/FindStacknav';
import useBluetooth from '~/hooks/useBluetooth';
import { UserProp } from '~/types';
import theme from '@styles/color';
import Button from '@components/Button';
import DragButton from '@components/DragButton';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from '~/recoil/atoms';
import InfiniteTrain from '@components/InfiniteTrain';
import TextLoopTicker from '@components/TextLoopTicker';
import SeatSelector from '@components/SeatSelector';

const Index = ({}: FindProps) => {
  const navigation = useNavigation<FindStackNavProps>();
  const { foundUsers, onGetUsersForScanStart, onScanStop } = useBluetooth();
  const [onFind, setOnFind] = useState(false);

  const toggleFind = async () =>
    onFind ? onScanStop() : onGetUsersForScanStart();

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  // const [modalOpen] = useRecoilState(modalState);
  // const setModalOpen = useSetRecoilState(modalState);

  const openRequestModal = (item: UserProp) => {
    setModalOpen({
      isOpen: true,
      onPressText: '요청하기',
      onCancelText: '닫기',
      onPress: request,
      children: (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.color.black,
            }}>
            {item.nickName}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.color.black,
            }}>
            3 Seat
          </Text>
          <TextLoopTicker
            style={{
              marginTop: 10,
              marginBottom: 30,
              backgroundColor: theme.color.black,
            }}
            content={item.transAcc}
          />
          <SeatSelector
            seatId={item.seats.filter(seat => seat.state === 1)[0].id}
          />
        </>
      ),
    });
  };
  const request = () => {
    // state 1을 2로 patch
    // setModalOpen({ ...modalOpen, isOpen: false });
    setModalOpen({
      isOpen: true,
      onCancelText: '취소',
      children: (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.color.black,
            }}>
            item.nickName
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: theme.color.black,
            }}>
            에게 양보 요청 중
          </Text>
          <InfiniteTrain />
        </>
      ),
    });
  };

  const confirmDeal = () => {
    // state 1을 2로 patch
    setModalOpen({
      isOpen: true,
      onPressText: '거래하기',
      onCancelText: '거절',
      onPress: moveQrScan,
      children: (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.color.black,
            }}>
            item.nickName
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: theme.color.black,
            }}>
            의 양보 요청 수락
          </Text>
          <TextLoopTicker
            style={{
              marginTop: 10,
              marginBottom: 10,
              backgroundColor: theme.color.black,
            }}
            content="서울메트로 2호선 3386열차 3호칸 탑승 중adasdfsdffadfadf"
          />
          <Text
            style={{
              marginBottom: 30,
              fontSize: 14,
              color: theme.color.black,
            }}>
            다정한수박의 좌석으로 이동하세요
          </Text>
        </>
      ),
    });
  };

  const moveQrScan = () => {
    setModalOpen({ ...modalOpen, isOpen: false });
    navigation.navigate('QrScan');
  };

  return (
    <View style={styles.container}>
      <Text>Find</Text>

      {foundUsers.length > 0 ? (
        <ScrollView>
          {foundUsers.map((item: UserProp, i) => (
            <View key={`found-${i}-${item.nickName}`} style={styles.wrapper}>
              <View style={styles.wrapper}>
                <Text style={styles.image}>{item.image}</Text>
                <View style={styles.info}>
                  <Text style={styles.nickName}>{item.nickName}</Text>
                  <Text style={styles.transArr}>{item.transAcc}</Text>
                </View>
              </View>
              {item.seats.length > 0 && (
                <Button
                  title={`좌석보기 >`}
                  type={`small`}
                  style={{ right: 0 }}
                  onPress={() => openRequestModal(item)}
                />
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <DragButton
          onPress={toggleFind}
          isOn={onFind}
          setIsOn={(is: boolean) => setOnFind(is)}
          type={'find'}
          style={styles.dragButton}
        />
      )}
      {/*<ScrollView>*/}
      {/*  <View style={styles.wrapper}>*/}
      {/*    <View style={styles.wrapper}>*/}
      {/*      <Text style={styles.image}></Text>*/}
      {/*      <View style={styles.info}>*/}
      {/*        <Text style={styles.nickName}>asdfadsfa</Text>*/}
      {/*        <Text style={styles.transArr}>3333</Text>*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*    <Button*/}
      {/*      title={`좌석보기 >`}*/}
      {/*      type={`small`}*/}
      {/*      style={{ right: 0 }}*/}
      {/*      onPress={openRequestModal}*/}
      {/*    />*/}
      {/*  </View>*/}
      {/*</ScrollView>*/}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  wrapper: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.color.gray,
  },
  info: {
    marginLeft: 18,
    justifyContent: 'space-around',
  },
  nickName: {
    fontSize: 14,
    color: theme.color.main,
    fontWeight: 'bold',
  },
  transArr: {
    fontSize: 14,
    color: theme.color.white,
  },
  dragButton: {
    marginTop: 200,
  },
});
