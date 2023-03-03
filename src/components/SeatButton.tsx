import { StyleSheet, ViewStyle } from 'react-native';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import theme from '~/styles/color';

interface SeatButtonPropType {
  buttonStyle?: ViewStyle;
  buttonBackground?: string;
  index: number;
  isClick: boolean;
  disabled?: boolean;
  setIsClick: (index: number) => void;
}
const SeatButton = ({
  isClick,
  disabled,
  setIsClick,
  buttonStyle,
  index,
  buttonBackground = theme.color.black,
}: SeatButtonPropType) => {
  return (
    <TouchableOpacity
      onPress={() => setIsClick(index)}
      disabled={disabled}
      style={[
        styles.seatButton,
        buttonStyle,
        {
          backgroundColor: disabled
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
