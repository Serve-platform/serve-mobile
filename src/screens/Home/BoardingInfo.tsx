import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BoardingInfoProps } from '~/navigators/GlobalNav';
import theme from '~/styles/color';

const BoardingInfo = ({}: BoardingInfoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {'탑승 중인 지하철 정보를\n정확히 입력해주세요'}
      </Text>
    </View>
  );
};

export default BoardingInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    fontSize: 20,
    color: theme.color.white,
    textAlign: 'center',
  },
});
