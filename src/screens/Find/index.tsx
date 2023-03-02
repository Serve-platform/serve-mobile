import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import {
  FindProps,
  FindStackNavProps,
} from '@navigators/stackNav/FindStacknav';
import useBluetooth from '~/hooks/useBluetooth';
import { UserProp } from '~/types/users';
import theme from '@styles/color';
import Button from '@components/Button';
import DragButton from '@components/DragButton';
import { useNavigation } from '@react-navigation/native';

const Index = ({}: FindProps) => {
  const navigation = useNavigation<FindStackNavProps>();
  const { foundUsers, onGetUsersForScanStart, onScanStop } = useBluetooth();
  const [onFind, setOnFind] = useState(false);

  const toggleFind = async () =>
    onFind ? onScanStop() : onGetUsersForScanStart();

  // navigation.navigate('ConfirmDeal');

  return (
    <View>
      <Text>Find</Text>

      {foundUsers.length > 0 ? (
        <ScrollView>
          {foundUsers.map((item: UserProp, i) => (
            <View key={`found-${i}-${item.nickName}`} style={styles.wrapper}>
              <View style={styles.wrapper}>
                <Text style={styles.image}>{item.image}</Text>
                <View style={styles.info}>
                  <Text style={styles.nickName}>{item.nickName}</Text>
                  <Text style={styles.transArr}>{item.transAcc}</Text>
                </View>
              </View>
              <Button
                title={`좌석보기 >`}
                type={`small`}
                style={{ right: 0 }}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <DragButton
          onPress={toggleFind}
          isOn={onFind}
          setIsOn={(is: boolean) => setOnFind(is)}
          type={'find'}
          style={styles.dragButton}
        />
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  wrapper: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.color.gray,
  },
  info: {
    marginLeft: 18,
    justifyContent: 'space-around',
  },
  nickName: {
    fontSize: 14,
    color: theme.color.main,
    fontWeight: 'bold',
  },
  transArr: {
    fontSize: 14,
    color: theme.color.white,
  },
  dragButton: {
    marginTop: 200,
  },
});
