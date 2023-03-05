import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GetTrainSeatAllType,
  StateType,
  TrainSeatsType,
  getTrainSeatAll,
  patchSeatBySeatId,
} from '~/api';
import React, { useState } from 'react';
import {
  boardInfoState,
  isWatchState,
  modalState,
  seatIdState,
} from '~/recoil/atoms';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Button from '~/components/Button';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import SeatButton from '~/components/SeatButton';
import SeatSelector from '~/components/SeatSelector';
import theme from '~/styles/color';
import { upArrow } from '~/assets/icons';
import { useNavigation } from '@react-navigation/native';

const SelectSeatInfo = () => {
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const boardInfo = useRecoilValue(boardInfoState);
  const setIsWatch = useSetRecoilState(isWatchState);
  const [seatId, seatSetId] = useRecoilState(seatIdState);
  const scaleAni = new Animated.Value(1);

  const [seatButtonLeftState, setSeatButtonLeftState] = useState<
    (TrainSeatsType & { isClick: boolean })[]
  >([]);

  const [seatButtonRightState, setSeatButtonRightState] = useState<
    (TrainSeatsType & { isClick: boolean })[]
  >([]);

  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: scaleAni },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  useQuery<GetTrainSeatAllType, Error>('getTrainSeatAll', getTrainSeatAll, {
    onSuccess: data => {
      setSeatButtonLeftState(
        data.seats.slice(0, 27).map(e => ({ ...e, isClick: false })),
      );
      setSeatButtonRightState(
        data.seats
          .slice(27, data.seats.length)
          .map(e => ({ ...e, isClick: false })),
      );
    },
  });

  const patchSeatBySeatIdMutation = useMutation(
    'patchSeatBySeatId',
    ({ seatIdProp, state }: { seatIdProp: number; state: StateType }) =>
      patchSeatBySeatId(seatIdProp, state),
  );

  const changeButtonState = (
    direction: 'left' | 'right',
    clickIndex: number,
  ) => {
    if (direction === 'left') {
      setSeatButtonRightState(
        seatButtonRightState.map(e => ({ ...e, isClick: false })),
      );
      setSeatButtonLeftState(
        seatButtonLeftState.map((v, buttonIdx) => {
          if (buttonIdx === clickIndex) {
            seatSetId(v.id);
            return { ...v, isClick: true };
          }
          return { ...v, isClick: false };
        }),
      );
    }
    if (direction === 'right') {
      setSeatButtonLeftState(
        seatButtonLeftState.map(e => ({ ...e, isClick: false })),
      );
      setSeatButtonRightState(
        seatButtonRightState.map((v, buttonIdx) => {
          if (buttonIdx === clickIndex) {
            seatSetId(v.id);
            return { ...v, isClick: true };
          }
          return { ...v, isClick: false };
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Please select your seat information correctly
      </Text>

      <PinchGestureHandler
        onGestureEvent={onZoomEvent}
        onHandlerStateChange={() => {}}>
        <Animated.View
          style={[styles.seatWrapper, { transform: [{ scale: scaleAni }] }]}>
          <View>
            {React.Children.toArray(
              seatButtonLeftState.map((v, i) => {
                if (i === 2 || i === 9 || i === 16 || i === 23) {
                  return (
                    <>
                      <SeatButton
                        isClick={v.isClick}
                        disabled={v.state != 0}
                        setIsClick={(clickIndex: number) =>
                          changeButtonState('left', clickIndex)
                        }
                        index={i}
                      />
                      <View style={{ marginBottom: 10 }} />
                    </>
                  );
                }
                return (
                  <SeatButton
                    isClick={v.isClick}
                    disabled={v.state != 0}
                    setIsClick={(clickIndex: number) =>
                      changeButtonState('left', clickIndex)
                    }
                    index={i}
                  />
                );
              }),
            )}
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={upArrow}
              style={{ marginBottom: 8, width: 21, height: 30 }}
            />
            <Text style={{ fontSize: 18, color: theme.color.white }}>
              Train direction
            </Text>
          </View>
          <View>
            {React.Children.toArray(
              seatButtonRightState.map((v, i) => {
                if (i === 2 || i === 9 || i === 16 || i === 23) {
                  return (
                    <>
                      <SeatButton
                        isClick={v.isClick}
                        disabled={v.state != 0}
                        setIsClick={(clickIndex: number) =>
                          changeButtonState('right', clickIndex)
                        }
                        index={i}
                      />
                      <View style={{ marginBottom: 10 }} />
                    </>
                  );
                }
                return (
                  <SeatButton
                    isClick={v.isClick}
                    disabled={v.state != 0}
                    setIsClick={(clickIndex: number) =>
                      changeButtonState('right', clickIndex)
                    }
                    index={i}
                  />
                );
              }),
            )}
          </View>
        </Animated.View>
      </PinchGestureHandler>
      <Button
        onPress={() =>
          setModalOpen({
            isOpen: true,
            onPressText: 'Yes.',
            onCancelText: 'Insert again',
            onPress: () => {
              seatButtonLeftState.forEach(e => {
                if (e.isClick) {
                  seatSetId(e.id);
                  patchSeatBySeatIdMutation.mutate({
                    seatIdProp: e.id,
                    state: 1,
                  });
                }
              });

              seatButtonRightState.forEach(e => {
                if (e.isClick) {
                  seatSetId(e.id);
                  patchSeatBySeatIdMutation.mutate({
                    seatIdProp: e.id,
                    state: 1,
                  });
                }
              });

              setIsWatch(true);
              setModalOpen({ ...modalOpen, isOpen: false });
              navigation.goBack();
              navigation.goBack();
            },
            isBackCancel: true,
            children: (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: theme.color.black,
                  }}>
                  Check Boarding Info
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: theme.color.black,
                    textAlign: 'center',
                    lineHeight: 21,
                    marginVertical: 25,
                  }}>
                  {`${boardInfo.trainLocation}Train ${boardInfo.trainLine}line\n${boardInfo.trainUuid} platform near no.${boardInfo.doorNumber}`}
                </Text>
                <SeatSelector seatId={seatId ?? 0} />
              </>
            ),
          })
        }
        disabled={
          seatButtonLeftState.every(e => !e.isClick) &&
          seatButtonRightState.every(e => !e.isClick)
        }
        title={'complete'}
      />
    </View>
  );
};

export default SelectSeatInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    fontSize: 20,
    color: theme.color.white,
    textAlign: 'center',
  },
  seatWrapper: {
    flexDirection: 'row',
    marginVertical: 40,
    width: Dimensions.get('window').width - 200,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
});
