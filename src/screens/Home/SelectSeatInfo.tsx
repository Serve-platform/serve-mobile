import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  HandlerStateChangeEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import React, { useState } from 'react';

import Button from '~/components/Button';
import { modalState } from '~/recoil/atoms';
import theme from '~/styles/color';
import { upArrow } from '~/assets/icons';
import { useSetRecoilState } from 'recoil';

const SelectSeatInfo = () => {
  const setModalOpen = useSetRecoilState(modalState);
  const scaleAni = new Animated.Value(1);
  const N = 27;
  let seatButtonLeft: boolean[];
  let setButtonRight: boolean[];
  (seatButtonLeft = []).length = N;
  const [seatButtonLeftState, setSeatButtonLeftState] = useState(
    seatButtonLeft.fill(false),
  );

  (setButtonRight = []).length = N;
  const [seatButtonRightState, setSeatButtonRightState] = useState(
    setButtonRight.fill(false),
  );

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

  const onZoomStateChange = (
    event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>,
  ) => {
    // if (event.nativeEvent.oldState === State.ACTIVE) {
    //   Animated.spring(scaleAni, {
    //     toValue: 1,
    //     useNativeDriver: true,
    //   }).start();
    // }
  };

  const changeButtonState = (
    direction: 'left' | 'right',
    clickIndex: number,
  ) => {
    if (direction === 'left') {
      setSeatButtonRightState(seatButtonRightState.fill(false));
      setSeatButtonLeftState(
        seatButtonLeftState.map((_, buttonIdx) => {
          if (buttonIdx === clickIndex) {
            return true;
          }
          return false;
        }),
      );
    }
    if (direction === 'right') {
      setSeatButtonLeftState(seatButtonLeftState.fill(false));
      setSeatButtonRightState(
        seatButtonRightState.map((_, buttonIdx) => {
          if (buttonIdx === clickIndex) {
            return true;
          }
          return false;
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>좌석 정보을 정확히 선택해주세요</Text>

      <PinchGestureHandler
        onGestureEvent={onZoomEvent}
        onHandlerStateChange={onZoomStateChange}>
        <Animated.View
          style={[styles.seatWrapper, { transform: [{ scale: scaleAni }] }]}>
          <View>
            {React.Children.toArray(
              seatButtonLeftState.map((v, i) => {
                if (i === 2 || i === 9 || i === 16 || i === 23) {
                  return (
                    <>
                      <SeatButton
                        isClick={v}
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
                    isClick={v}
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
                        isClick={v}
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
                    isClick={v}
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
            onPress: () => {},
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
              </>
            ),
          })
        }
        disabled={
          seatButtonLeftState.every(e => !e) &&
          seatButtonRightState.every(e => !e)
        }
        title={'선택완료'}
      />
    </View>
  );
};

interface SeatButtonPropType {
  buttonStyle?: ViewStyle;
  index: number;
  isClick: boolean;
  setIsClick: (index: number) => void;
}
const SeatButton = ({
  isClick,
  setIsClick,
  buttonStyle,
  index,
}: SeatButtonPropType) => {
  const disableSeatButton = () => {
    return (
      index === 0 ||
      index === 1 ||
      index === 2 ||
      index === 24 ||
      index === 25 ||
      index === 26
    );
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setIsClick(index);
      }}
      disabled={disableSeatButton()}
      style={[
        styles.seatButton,
        buttonStyle,
        {
          backgroundColor: disableSeatButton()
            ? theme.color.disable
            : isClick
            ? theme.color.main
            : theme.color.black,
        },
      ]}
    />
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
  seatButton: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: theme.color.white,
  },
});
