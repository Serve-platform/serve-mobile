import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';

import React from 'react';
import theme from '~/styles/color';

type Props = {
  value?: string | number;
  setValue?: (v: string) => void;
  disabled?: boolean;
  style?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
};
const Input = ({
  value,
  setValue,
  disabled = false,
  style,
  keyboardType,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      {disabled ? (
        <Text style={styles.disabled}>{value}</Text>
      ) : (
        <TextInput
          keyboardType={keyboardType}
          defaultValue={value?.toString()}
          onChangeText={setValue}
          style={styles.input}
          placeholder={`입력하세요`}
          placeholderTextColor={`#fff`}
        />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontSize: 14,
    color: theme.color.white,
    borderColor: theme.color.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  disabled: {
    fontSize: 14,
    color: theme.color.white,
    borderColor: theme.color.gray,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    textAlign: 'left',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
