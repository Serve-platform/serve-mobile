import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import SeatButton from '~/components/SeatButton';
import { backArrow } from '~/assets/icons';
import theme from '~/styles/color';

const SeatSelector = () => {
  const N = 27;
  let seatButtonTop: boolean[];
  let setButtonBottom: boolean[];
  (seatButtonTop = []).length = N;
  const [seatButtonTopState, setSeatButtonTopState] = useState(
    seatButtonTop.fill(false),
  );

  (setButtonBottom = []).length = N;
  const [seatButtonBottomState, setSeatButtonBottomState] = useState(
    setButtonBottom.fill(false),
  );

  const changeButtonState = (
    direction: 'top' | 'bottom',
    clickIndex: number,
  ) => {
    if (direction === 'top') {
      setSeatButtonBottomState(seatButtonBottomState.fill(false));
      setSeatButtonTopState(
        seatButtonTopState.map((_, buttonIdx) => {
          if (buttonIdx === clickIndex) {
            return true;
          }
          return false;
        }),
      );
    }
    if (direction === 'bottom') {
      setSeatButtonTopState(seatButtonTopState.fill(false));
      setSeatButtonBottomState(
        seatButtonBottomState.map((_, buttonIdx) => {
          if (buttonIdx === clickIndex) {
            return true;
          }
          return false;
        }),
      );
    }
  };

  // todo 클릭된 좌석 상태를 가져와야함

  return (
    <ScrollView horizontal style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          {React.Children.toArray(
            seatButtonTopState.map((v, i) => {
              if (i === 2 || i === 9 || i === 16 || i === 23) {
                return (
                  <>
                    <SeatButton
                      buttonBackground={theme.color.white}
                      buttonStyle={{ borderColor: theme.color.black }}
                      isClick={v}
                      setIsClick={(clickIndex: number) =>
                        changeButtonState('top', clickIndex)
                      }
                      index={i}
                    />
                    <View style={{ marginRight: 10 }} />
                  </>
                );
              }
              return (
                <SeatButton
                  buttonBackground={theme.color.white}
                  buttonStyle={{ borderColor: theme.color.black }}
                  isClick={v}
                  setIsClick={(clickIndex: number) =>
                    changeButtonState('top', clickIndex)
                  }
                  index={i}
                />
              );
            }),
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 15,
          }}>
          <Image
            source={backArrow}
            style={{
              width: 11,
              height: 11,
              marginRight: 5,
              tintColor: theme.color.black,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: theme.color.black,
            }}>
            열차 진행방향
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 40 }}>
          {React.Children.toArray(
            seatButtonBottomState.map((v, i) => {
              if (i === 2 || i === 9 || i === 16 || i === 23) {
                return (
                  <>
                    <SeatButton
                      buttonBackground={theme.color.white}
                      buttonStyle={{ borderColor: theme.color.black }}
                      isClick={v}
                      setIsClick={(clickIndex: number) =>
                        changeButtonState('bottom', clickIndex)
                      }
                      index={i}
                    />
                    <View style={{ marginRight: 10 }} />
                  </>
                );
              }
              return (
                <SeatButton
                  buttonBackground={theme.color.white}
                  buttonStyle={{ borderColor: theme.color.black }}
                  isClick={v}
                  setIsClick={(clickIndex: number) =>
                    changeButtonState('bottom', clickIndex)
                  }
                  index={i}
                />
              );
            }),
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SeatSelector;

const styles = StyleSheet.create({
  container: {},
});
