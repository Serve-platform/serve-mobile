import { StyleSheet, Text, ViewStyle, TouchableOpacity } from 'react-native';
import React from 'react';
import theme from '~/styles/color';

type Props = {
  title: string;
  clickEvent?: () => void;
  style?: ViewStyle;
};
const Input = ({ title, clickEvent, style }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => (clickEvent ? clickEvent : null)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
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
});
