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

const Find = ({}: FindProps) => {
  const { foundUsers, onGetUsersForScanStart, onScanStop } = useBluetooth();

  return (
    <View>
      <Text>Find</Text>

      <ScrollView>
        {foundUsers.map((item, index) => (
          <View
            style={{ marginBottom: 5, backgroundColor: 'blue' }}
            key={index}>
            <Text style={{ color: 'white' }}>{JSON.stringify(item)}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView>
        {foundUsers.map((item: UserProp, index) => (
          <View
            style={{ marginBottom: 5, backgroundColor: 'black' }}
            key={index}>
            <Text style={{ color: 'white' }}>{item.image}</Text>
            <Text style={{ color: 'white' }}>{item.nickName}</Text>
            <Text style={{ color: 'white' }}>{item.transAcc}</Text>
            <Text style={{ color: 'white' }}>좌석보기 {`>`}</Text>
          </View>
        ))}
      </ScrollView>

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
  );
};

export default Find;

const styles = StyleSheet.create({});
