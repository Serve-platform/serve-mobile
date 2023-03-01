import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { FindProps } from '~/navigators/stackNav/FindStacknav';
import useBluetooth from '~/hooks/useBluetooth';
import { UserProp } from '~/types/users';
import theme from '@styles/color';
import Button from '~/component/Button';

const Find = ({}: FindProps) => {
  const { foundUsers, onGetUsersForScanStart, onScanStop } = useBluetooth();

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
                isSmall={true}
                style={{ right: 0 }}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        // TODO 공통 컴포넌트 사용
        <View>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: 'skyblue',
            }}
            onPress={onGetUsersForScanStart}>
            <Text style={{ textAlign: 'center' }}>onScanStart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 150,
              backgroundColor: 'skyblue',
            }}
            onPress={onScanStop}>
            <Text style={{ textAlign: 'center' }}>onScanStop</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Find;

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
});
