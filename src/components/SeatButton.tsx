import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import theme from '~/styles/color';

interface SeatButtonPropType {
  buttonStyle?: ViewStyle;
  buttonBackground?: string;
  index: number;
  isClick: boolean;
  setIsClick: (index: number) => void;
}
const SeatButton = ({
  isClick,
  setIsClick,
  buttonStyle,
  index,
  buttonBackground = theme.color.black,
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
      onPress={() => setIsClick(index)}
      disabled={disableSeatButton()}
      style={[
        styles.seatButton,
        buttonStyle,
        {
          backgroundColor: disableSeatButton()
            ? theme.color.disable
            : isClick
            ? theme.color.main
            : buttonBackground,
        },
      ]}
    />
  );
};

export default SeatButton;

const styles = StyleSheet.create({
  seatButton: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: theme.color.white,
  },
});
