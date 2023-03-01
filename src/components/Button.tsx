import { StyleSheet, Text, ViewStyle, TouchableOpacity } from 'react-native';
import React from 'react';
import theme from '~/styles/color';

type Props = {
  title: string;
  clickEvent?: () => void;
  style?: ViewStyle;
  type?: 'default' | 'small' | 'yellow';
};
const Button = ({ title, clickEvent, style, type = 'default' }: Props) => {
  const button = () => {
    switch (type) {
      case 'small':
        return <Text style={styles.small}>{title}</Text>;
      case 'yellow':
        return <Text style={styles.yellow}>{title}</Text>;
      default:
        return <Text style={styles.default}>{title}</Text>;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => (clickEvent ? clickEvent : null)}>
      {button()}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {},
  default: {
    fontSize: 20,
    color: theme.color.white,
    borderColor: theme.color.white,
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
});
