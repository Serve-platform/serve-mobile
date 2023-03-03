import { Image, StyleSheet, View, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { railroad, train } from '~/assets/icons';

const railroadWidth = 200;
const trainWidth = 50;
const trainDuration = 3000;

const InfiniteTrain = () => {
  const [trainPos, setTrainPos] = useState(new Animated.Value(-trainWidth));
  const [value2, setValue2] = useState(-150);

  const makeAnimation = (currentValue: any, value: number) => {
    return Animated.timing(currentValue, {
      toValue: 100,
      duration: trainDuration,
      useNativeDriver: true,
    });
  };

  const doLoop = (animation: any) => animation(trainPos, value2).start();

  useEffect(() => {
    trainPos.addListener(({ value }) => {
      if (value === 100) {
        trainPos.setValue(-150);
        doLoop(makeAnimation);
      }
      setValue2(value);
    });
    doLoop(makeAnimation);

    return () => trainPos.removeAllListeners();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [
            {
              translateX: trainPos,
            },
          ],
        }}>
        <Image source={train} style={[styles.train]} />
      </Animated.View>
      <Image
        source={railroad}
        style={{
          width: railroadWidth,
          height: 10,
          marginTop: 25,
        }}
      />
    </View>
  );
};

export default InfiniteTrain;

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  train: {
    position: 'absolute',
    width: 50,
    height: 22,
  },
});
