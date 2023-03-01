import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from '~/styles/color';
import Label from '~/component/Label';
import Input from '~/component/Input';
import Button from '~/component/Button';

const BoardingInfo = () => {
  const [location, setLocation] = useState('서울특별시');
  const [line, setLine] = useState('2호선');
  const [trainNumber, setTrainNumber] = useState('12345');
  const [doorNumber, setDoorNumber] = useState('6789');
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.title}>
        {'탑승 중인 지하철 정보를\n정확히 입력해주세요'}
      </Text>

      <View style={styles.infoContainer}>
        <Label title={`탑승 지하철 및 호선`} isValidate={true} />
        <View style={styles.wrapper}>
          <Input
            value={location}
            setValue={setLocation}
            style={{ marginRight: 10 }}
            disabled={true}
          />
          <Input value={line} setValue={setLine} disabled={true} />
        </View>

        <Label title={`열차고유번호`} isValidate={true} hasDescription={true} />
        <View style={styles.wrapper}>
          <Input value={trainNumber} setValue={setTrainNumber} />
        </View>

        <Label title={`출입문 번호`} />
        <View style={styles.wrapper}>
          <Input value={doorNumber} setValue={setDoorNumber} />
        </View>
        <View style={styles.button}>
          <Button title={`다음으로`} />
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  infoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 60,
    justifyContent: 'flex-start',
  },
  wrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    marginTop: 40,
  },
});
