import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import React from 'react';
import TextTicker from 'react-native-text-ticker';
import theme from '~/styles/color';

interface TextLoopTickerPropType {
  content: string;
  style?: ViewStyle;
}

const TextLoopTicker = ({ content, style }: TextLoopTickerPropType) => {
  return (
    <View style={[styles.container, style]}>
      <TextTicker
        scroll
        style={{
          fontSize: 20,
          color: theme.color.white,
        }}
        duration={5000}
        loop
        bounce={false}>
        {content}
      </TextTicker>
    </View>
  );
};

export default TextLoopTicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: theme.color.main,
    backgroundColor: theme.color.black,
    paddingVertical: 18,
    alignItems: 'center',
  },
});
