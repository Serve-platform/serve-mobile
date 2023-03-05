import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { useEffect, useRef } from 'react';

import { downArrow } from '~/assets/icons';
import theme from '~/styles/color';

interface DragButtonPropType {
  onPress: () => void;
  isOn: boolean;
  setIsOn: (serve: boolean) => void;
  type: 'serve' | 'find';
  style?: ViewStyle;
  disabled?: boolean;
}

const DragButton = ({
  onPress,
  isOn,
  setIsOn,
  type,
  style,
  disabled,
}: DragButtonPropType) => {
  const moveAnim = useRef(new Animated.Value(-2)).current;
  const typeUpperCase = type.toUpperCase();

  const moveOn = () => {
    Animated.timing(moveAnim, {
      toValue: 92,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const moveOff = () => {
    Animated.timing(moveAnim, {
      toValue: -2,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isOn) {
      moveOn();
    } else {
      moveOff();
    }
  }, [isOn]);

  return (
    <View style={[styles.dragContainer, style]}>
      <>
        <Pressable
          onPress={() => {
            if (disabled) {
              Alert.alert('Insert Boarding Info');
              return;
            }
            onPress();
            setIsOn(!isOn);
          }}>
          <Animated.View
            style={[
              styles.dragEnableButton,
              {
                left: -2,
                backgroundColor: isOn ? theme.color.main : theme.color.black,
                transform: [{ translateY: moveAnim }],
              },
            ]}>
            <Text
              style={[
                styles.dragEnableText,
                {
                  color: isOn ? theme.color.black : theme.color.main,
                },
              ]}>
              {isOn ? `On ${typeUpperCase}` : `Off ${typeUpperCase}`}
            </Text>
          </Animated.View>
        </Pressable>
        <View style={[styles.dragDisableButton, { top: -2, left: -2 }]}>
          <Text style={styles.dragDisableText}>Drag to cancel</Text>
        </View>
        <Image
          source={downArrow}
          style={{
            width: 24,
            height: 24,
            zIndex: -1,
            alignSelf: 'center',
            transform: [{ rotate: isOn ? '180deg' : '0deg' }],
          }}
        />
        <View style={[styles.dragDisableButton, { bottom: -2, left: -2 }]}>
          <Text style={styles.dragDisableText}>Drag to {typeUpperCase}</Text>
        </View>
      </>
    </View>
  );
};

export default DragButton;

const styles = StyleSheet.create({
  dragContainer: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 90,
    height: 164,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.color.main,
    borderStyle: 'dashed',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  dragEnableButton: {
    width: Dimensions.get('window').width - 90,
    borderWidth: 2,
    borderColor: theme.color.main,
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 15,
  },
  dragDisableButton: {
    position: 'absolute',
    width: Dimensions.get('window').width - 90,
    borderWidth: 2,
    borderColor: 'rgba(239, 255, 55, 0.3)',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    borderStyle: 'dashed',
    zIndex: -1,
  },
  dragEnableText: {
    fontSize: 26,
    fontWeight: '700',
  },
  dragDisableText: {
    color: 'rgba(239, 255, 55, 0.3)',
    fontSize: 26,
    fontWeight: '700',
  },
});
