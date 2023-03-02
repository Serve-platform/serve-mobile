import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import {
  FindProps,
  FindStackNavProps,
} from '@navigators/stackNav/FindStacknav';
import useBluetooth from '~/hooks/useBluetooth';
import { UserProp } from '~/types/users';
import theme from '@styles/color';
import Button from '@components/Button';
import DragButton from '@components/DragButton';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from '~/recoil/atoms';
import InfiniteTrain from '@components/InfiniteTrain';

const Index = ({}: FindProps) => {
  const navigation = useNavigation<FindStackNavProps>();
  const { foundUsers, onGetUsersForScanStart, onScanStop } = useBluetooth();
  const [onFind, setOnFind] = useState(false);

  const toggleFind = async () =>
    onFind ? onScanStop() : onGetUsersForScanStart();

  const [modalOpen] = useRecoilState(modalState);
  const setModalOpen = useSetRecoilState(modalState);

  const openRequestModal = () => {
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
            item.nickName
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.color.black,
            }}>
            3 Seat
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: theme.color.black,
              textAlign: 'center',
              lineHeight: 21,
              marginVertical: 25,
            }}>
            {'서울지하철 2호선\n7236 열차 3-2 출입문 근처'}
          </Text>
        </>
      ),
    });
  };
  const request = () => {
    // state 1을 2로 patch
    // setModalOpen({ ...modalOpen, isOpen: false });
    setModalOpen({
      isOpen: true,
      onPressText: '',
      onCancelText: '취소',
      onPress: () => {
        return false;
      },
      children: (
        <View>
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
        </View>
      ),
    });
  };

  // navigation.navigate('ConfirmDeal');

  return (
    <View style={styles.container}>
      <Text>Find</Text>

      {/*{foundUsers.length > 0 ? (*/}
      {/*  <ScrollView>*/}
      {/*    {foundUsers.map((item: UserProp, i) => (*/}
      {/*      <View key={`found-${i}-${item.nickName}`} style={styles.wrapper}>*/}
      {/*        <View style={styles.wrapper}>*/}
      {/*          <Text style={styles.image}>{item.image}</Text>*/}
      {/*          <View style={styles.info}>*/}
      {/*            <Text style={styles.nickName}>{item.nickName}</Text>*/}
      {/*            <Text style={styles.transArr}>{item.transAcc}</Text>*/}
      {/*          </View>*/}
      {/*        </View>*/}
      {/*        <Button*/}
      {/*          title={`좌석보기 >`}*/}
      {/*          type={`small`}*/}
      {/*          style={{ right: 0 }}*/}
      {/*        />*/}
      {/*      </View>*/}
      {/*    ))}*/}
      {/*  </ScrollView>*/}
      {/*) : (*/}
      {/*  <DragButton*/}
      {/*    onPress={toggleFind}*/}
      {/*    isOn={onFind}*/}
      {/*    setIsOn={(is: boolean) => setOnFind(is)}*/}
      {/*    type={'find'}*/}
      {/*    style={styles.dragButton}*/}
      {/*  />*/}
      {/*)}*/}
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.wrapper}>
            <Text style={styles.image}></Text>
            <View style={styles.info}>
              <Text style={styles.nickName}>asdfadsfa</Text>
              <Text style={styles.transArr}>3333</Text>
            </View>
          </View>
          <Button
            title={`좌석보기 >`}
            type={`small`}
            style={{ right: 0 }}
            onPress={openRequestModal}
          />
        </View>
      </ScrollView>
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
