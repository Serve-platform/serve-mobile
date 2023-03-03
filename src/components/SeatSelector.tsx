import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import SeatButton from '~/components/SeatButton';
import { backArrow } from '~/assets/icons';
import theme from '~/styles/color';

const SeatSelector = ({ seatId }: { seatId: number }) => {
  const N = 27;
  let seatButtonTop: boolean[];
  let setButtonBottom: boolean[];
  (seatButtonTop = []).length = N;
  (setButtonBottom = []).length = N;

  const [seatButtonTopState, setSeatButtonTopState] = useState(
    seatButtonTop.fill(false),
  );

  const [seatButtonBottomState, setSeatButtonBottomState] = useState(
    setButtonBottom.fill(false),
  );

  useEffect(() => {
    setSeatButtonTopState(
      seatButtonTopState.fill(false).map((_, i) => {
        if (i + 1 === seatId) {
          return true;
        }
        return false;
      }),
    );

    setSeatButtonBottomState(
      seatButtonBottomState.fill(false).map((_, i) => {
        if (i + 1 === seatId - 27) {
          return true;
        }
        return false;
      }),
    );
  }, [seatId]);

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
                      setIsClick={() => {}}
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
                  setIsClick={() => {}}
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
                      setIsClick={() => {}}
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
                  setIsClick={() => {}}
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
