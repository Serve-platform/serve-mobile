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
import {
  HandlerStateChangeEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import React, { useState } from 'react';
import { modalState, seatIdState } from '~/recoil/atoms';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Button from '~/components/Button';
import SeatButton from '~/components/SeatButton';
import SeatSelector from '~/components/SeatSelector';
import theme from '~/styles/color';
import { upArrow } from '~/assets/icons';
import { useNavigation } from '@react-navigation/native';

const SelectSeatInfo = () => {
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [seatId, seatSetId] = useRecoilState(seatIdState);
  const scaleAni = new Animated.Value(1);

  const [seatButtonLeftState, setSeatButtonLeftState] = useState<
    TrainSeatsType[]
  >([]);

  const [seatButtonRightState, setSeatButtonRightState] = useState<
    TrainSeatsType[]
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
    ({ seatId, state }: { seatId: number; state: StateType }) =>
      patchSeatBySeatId(seatId, state),
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
      <Text style={styles.title}>좌석 정보을 정확히 선택해주세요</Text>

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
              열차 진행방향
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
            onPressText: '네 맞습니다.',
            onCancelText: '다시 입력',
            onPress: () => {
              seatButtonLeftState.forEach(e => {
                if (e.isClick) {
                  seatSetId(e.state);
                  patchSeatBySeatIdMutation.mutate({
                    seatId: e.id,
                    state: 1,
                  });
                }
              });

              seatButtonRightState.forEach(e => {
                if (e.isClick) {
                  seatSetId(e.state);
                  patchSeatBySeatIdMutation.mutate({
                    seatId: e.id,
                    state: 1,
                  });
                }
              });

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
                  탑승정보를 확인해주세요
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
                <SeatSelector seatId={seatId} />
              </>
            ),
          })
        }
        disabled={
          seatButtonLeftState.every(e => !e.isClick) &&
          seatButtonRightState.every(e => !e.isClick)
        }
        title={'선택완료'}
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
