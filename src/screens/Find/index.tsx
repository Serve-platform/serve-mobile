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
import { useRecoilState } from 'recoil';
import { modalState } from '~/recoil/atoms';
import InfiniteTrain from '@components/InfiniteTrain';
import TextLoopTicker from '@components/TextLoopTicker';
import SeatSelector from '@components/SeatSelector';
import { useMutation, useQuery } from 'react-query';
import {
  getSeatBySeatId,
  patchSeatBySeatId,
  StateType,
  TrainSeatsType,
} from '~/api';

const Index = ({}: FindProps) => {
  const navigation = useNavigation<FindStackNavProps>();
  const { foundUsers, onGetUsersForScanStart, onScanStop } = useBluetooth();
  const [onFind, setOnFind] = useState(false);

  const [seatIdForDeal, setSeatIdForDeal] = useState(0);
  const [isAcceptDeal, setIsAcceptDeal] = useState(false);

  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const toggleFind = async () =>
    onFind ? onScanStop() : onGetUsersForScanStart();

  const patchSeatBySeatIdMutation = useMutation(
    'patchSeatBySeatId',
    ({ seatId, state }: { seatId: number; state: StateType }) =>
      patchSeatBySeatId(seatId, state),
  );

  const getSeatId = (item: UserProp) => item.ownerSeat[0].id;
  // item.ownerSeat.filter(seat => seat.state === 1)[0].id;

  const openRequestModal = (item: UserProp) => {
    setModalOpen({
      isOpen: true,
      onPressText: 'request',
      onCancelText: 'close',
      onPress: () => request(item),
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
            content={item.locationinfo}
          />
          <SeatSelector seatId={getSeatId(item)} />
        </>
      ),
    });
  };
  const request = (item: UserProp) => {
    const seatId = getSeatId(item);
    patchSeatBySeatIdMutation.mutate({
      seatId: seatId,
      state: 2,
    });

    setIsAcceptDeal(true);
    setSeatIdForDeal(seatId);

    setModalOpen({
      isOpen: true,
      onCancelText: 'cancel',
      children: (
        <>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: theme.color.black,
            }}>
            Requesting concessions from
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.color.black,
            }}>
            {item.nickName}
          </Text>
          <InfiniteTrain />
        </>
      ),
    });
  };

  useQuery<TrainSeatsType, Error>(
    ['getSeatBySeatId', isAcceptDeal],
    async () => {
      if (seatIdForDeal > 0) {
        const res = await getSeatBySeatId(seatIdForDeal);
        return res;
      }
    },
    {
      onSuccess: (data: any) => {
        if (data.state === 3 && seatIdForDeal > 0 && isAcceptDeal) {
          setIsAcceptDeal(false);
          setModalOpen({
            isOpen: true,
            onPressText: 'confirm',
            onCancelText: 'decline',
            onPress: moveQrScan,
            children: (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: theme.color.black,
                  }}>
                  {data.owner.nickName}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: theme.color.black,
                  }}>
                  accept concession request
                </Text>
                <TextLoopTicker
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    backgroundColor: theme.color.black,
                  }}
                  content={data.owner.locationinfo}
                />
                <Text
                  style={{
                    marginBottom: 30,
                    fontSize: 14,
                    color: theme.color.black,
                  }}>
                  move to {data.owner.nickName}'s seat
                </Text>
              </>
            ),
          });
        }
      },
      refetchInterval: 1000,
      enabled: !!isAcceptDeal,
    },
  );

  const moveQrScan = () => {
    setModalOpen({ ...modalOpen, isOpen: false });
    navigation.navigate('QrScan');
  };

  return (
    <View style={styles.container}>
      {foundUsers.length > 0 ? (
        <ScrollView>
          {foundUsers.map((item: UserProp, i) => (
            <View key={`found-${i}-${item.nickName}`} style={styles.wrapper}>
              <View style={styles.wrapper}>
                <Text style={styles.image}>{item.image}</Text>
                <View style={styles.info}>
                  <Text style={styles.nickName}>{item.nickName}</Text>
                  <Text style={styles.locationInfo}>{item.locationinfo}</Text>
                </View>
              </View>
              {item.ownerSeat.length > 0 && (
                <Button
                  title={`check seat >`}
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
  locationInfo: {
    fontSize: 14,
    color: theme.color.white,
  },
  dragButton: {
    marginTop: 200,
  },
});
