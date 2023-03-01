import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import theme from '~/styles/color';

type Props = {
  title: string;
  isValidate?: boolean;
  hasDescription?: boolean;
};
const Label = ({ title, isValidate, hasDescription }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
        {isValidate && <Text style={styles.validate}> *</Text>}
      </Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  title: {
    fontSize: 14,
    color: theme.color.white,
    textAlign: 'left',
  },
  validate: {
    fontSize: 14,
    color: theme.color.red,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    color: theme.color.white,
    textAlign: 'right',
  },
});
