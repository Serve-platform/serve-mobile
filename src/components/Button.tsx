import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import React from 'react';
import theme from '~/styles/color';

type Props = {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  type?: 'default' | 'small' | 'yellow' | 'white';
};
const Button = ({
  disabled,
  title,
  onPress,
  style,
  type = 'default',
}: Props) => {
  const button = () => {
    switch (type) {
      case 'small':
        return <Text style={styles.small}>{title}</Text>;
      case 'yellow':
        return <Text style={styles.yellow}>{title}</Text>;
      case 'white':
        return <Text style={styles.white}>{title}</Text>;
      default:
        return (
          <Text
            style={[
              styles.default,
              {
                borderColor: disabled ? theme.color.disable : theme.color.white,
                color: disabled ? theme.color.disable : theme.color.white,
              },
            ]}>
            {title}
          </Text>
        );
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress}>
      {button()}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {},
  default: {
    fontSize: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    borderRightWidth: 4,
    borderBottomWidth: 6,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  small: {
    fontSize: 12,
    color: theme.color.white,
    borderColor: theme.color.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  yellow: {
    fontSize: 20,
    backgroundColor: theme.color.main,
    color: theme.color.black,
    borderColor: theme.color.black,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    borderRightWidth: 4,
    borderBottomWidth: 6,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  white: {
    fontSize: 20,
    backgroundColor: theme.color.white,
    color: theme.color.black,
    borderColor: theme.color.black,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    borderRightWidth: 4,
    borderBottomWidth: 6,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
