import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '~/styles/color';
import { useNavigation } from '@react-navigation/native';
import { ConfirmDealByPasswordProps } from '@navigators/GlobalNav';
import { remove } from '@assets/icons';

const ConfirmDealByPassword = () => {
  const navigation = useNavigation<ConfirmDealByPasswordProps>();
  const [password, setPassword] = useState('');

  const putPassword = (flag: string) => {
    setPassword(
      flag === 'remove' ? password.slice(0, -1) : password.concat(flag),
    );
  };

  useEffect(() => {
    if (password.length === 6) {
      // @ts-ignore
      navigation.navigate('StoreStackNav');
    }
  }, [password]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>비밀번호를 입력하세요</Text>

        <View style={styles.markWrapper}>
          {Array(password.length).fill(
            <Text
              style={[
                styles.mark,
                {
                  backgroundColor: theme.color.white,
                },
              ]}></Text>,
          )}
          {Array(6 - password.length).fill(<Text style={styles.mark}></Text>)}
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 60,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => putPassword('1')}>
            <Text style={styles.number}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => putPassword('2')}>
            <Text style={styles.number}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => putPassword('3')}>
            <Text style={styles.number}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => putPassword('4')}>
            <Text style={styles.number}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => putPassword('5')}>
            <Text style={styles.number}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => putPassword('6')}>
            <Text style={styles.number}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => putPassword('7')}>
            <Text style={styles.number}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => putPassword('8')}>
            <Text style={styles.number}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => putPassword('9')}>
            <Text style={styles.number}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noBorderButton}>
            <Text style={styles.number}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => putPassword('0')}>
            <Text style={styles.number}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.noBorderButton}
            onPress={() => putPassword('remove')}>
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={remove}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmDealByPassword;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  wrapper: {
    marginTop: 80,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: theme.color.white,
  },
  markWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    color: theme.color.white,
  },
  mark: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: theme.color.white,
    borderStyle: 'solid',
    borderRadius: 12,
    width: 24,
    height: 24,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.color.white,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.color.main,
    borderStyle: 'solid',
    borderRadius: 37,
    width: 74,
    height: 74,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBorderButton: {
    borderRadius: 37,
    width: 74,
    height: 74,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 26,
    color: theme.color.main,
    fontWeight: 'bold',
  },
});
