import { StyleSheet, Text, View } from 'react-native';

import { BoardingInfoProps } from '~/navigators/GlobalNav';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Label from '~/components/Label';
import React from 'react';
import { boardInfoState } from '~/recoil/atoms';
import { getTrainInfo } from '~/api';
import theme from '~/styles/color';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

const BoardingInfo = () => {
  const navigation = useNavigation<BoardingInfoProps>();
  const [boardInfo, setBoardInfo] = useRecoilState(boardInfoState);

  useQuery('getTrainInfo', getTrainInfo, {
    onSuccess: data => {
      setBoardInfo({
        doorNumber: data.doorNumber,
        trainUuid: data.trainUuid,
        trainLocation: data.trainLocation,
        trainLine: data.trainLine,
      });
    },
  });

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.title}>
        {'탑승 중인 지하철 정보를\n정확히 입력해주세요'}
      </Text>

      <View style={styles.infoContainer}>
        <Label title={`탑승 지하철 및 호선`} isValidate={true} />
        <View style={styles.wrapper}>
          <Input
            value={boardInfo.trainLocation}
            setValue={(value: string) =>
              setBoardInfo({ ...boardInfo, trainLocation: value })
            }
            style={{ marginRight: 10 }}
            disabled={true}
          />
          <Input
            value={boardInfo.trainLine}
            setValue={(value: string) =>
              setBoardInfo({
                ...boardInfo,
                trainLine: value,
              })
            }
            disabled={true}
          />
        </View>

        <Label title={`열차고유번호`} isValidate={true} hasDescription={true} />
        <View style={styles.wrapper}>
          <Input
            keyboardType={'number-pad'}
            value={boardInfo.trainUuid}
            setValue={(value: string) =>
              setBoardInfo({ ...boardInfo, trainUuid: value })
            }
          />
        </View>

        <Label title={`출입문 번호`} />
        <View style={styles.wrapper}>
          <Input
            keyboardType={'number-pad'}
            value={boardInfo.doorNumber}
            setValue={(value: string) =>
              setBoardInfo({ ...boardInfo, doorNumber: value })
            }
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={boardInfo.doorNumber === '' || boardInfo.trainUuid === ''}
            onPress={() => navigation.navigate('SelectSeatInfo')}
            title={`다음으로`}
          />
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
