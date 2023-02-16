import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import theme from '~/styles/color';
import { onboarding } from '~/assets/images';
import { downArrow } from '~/assets/icons';
import { GlobalProps } from '../navigators/GlobalNav';
import OnModal from '~/component/Home/OnModal';
import OffModal from '~/component/Home/OffModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Home = ({ navigation }: GlobalProps) => {
  const [onServe, setOnServe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [OnmodalVisible, setOnModalVisible] = useState(false);
  const moveAnim = useRef(new Animated.Value(-2)).current;
  const [qrData, setQrData] = useState('');

  const moveOn = () => {
    Animated.timing(moveAnim, {
      toValue: 92,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  const moveQr = () => {
    setOnModalVisible(!OnmodalVisible);
    navigation.navigate('QrScan');
  };

  const address__ = AsyncStorage.getItem('Address');
  const balance__ = 1;
  const apiUrl = `http://ec2-3-35-25-21.ap-northeast-2.compute.amazonaws.com:3000/api/users/createQr?address=${address__}&balance=${balance__}`;

  console.log(onServe, modalVisible, OnmodalVisible, 'modalVisible');

  async function postData(): Promise<void> {
    axios
      .get(apiUrl)
      .then(response => {
        setQrData(response.data.result);
        console.log(qrData, 'qrdata');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  const moveQrCode = () => {
    setModalVisible(!modalVisible);
    postData();
    navigation.navigate('QrScreen', {
      qrData: qrData,
    });
  };
  const moveOff = async () => {
    Animated.timing(moveAnim, {
      toValue: -2,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (onServe) {
      moveOn();
    } else {
      moveOff();
    }
  }, [onServe]);

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 30,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.title}>
            Hi,
            <Text style={{ color: theme.color.main }}> Wendy!</Text>
          </Text>
          <Text
            style={{
              marginTop: 14,
              color: theme.color.white,
              fontWeight: '500',
            }}>
            Lv1
          </Text>
        </View>

        <View
          style={{
            width: 46,
            height: 46,
            borderWidth: 1,
            borderColor: theme.color.main,
            borderRadius: 46,
          }}
        />
      </View>
      <Image
        source={onboarding}
        style={{
          marginVertical: 24,
          alignSelf: 'center',
          width: 206,
          height: 199,
        }}
      />
      {/* 탑승 정보 */}
      <View style={styles.boardInfo}>
        <View
          style={{
            position: 'absolute',
            top: -18,
            borderWidth: 1,
            borderColor: theme.color.main,
            borderRadius: 20,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: theme.color.black,
          }}>
          <Text style={{ color: theme.color.main, fontWeight: '700' }}>
            Enter Boarding Info.
          </Text>
        </View>
        <Text style={{ fontSize: 20, color: theme.color.white }}>
          탑승 정보 입력
        </Text>
      </View>

      {/* SERVE 드래그 버튼 */}
      <View style={styles.dragContainer}>
        <>
          <Pressable
            onPress={() => {
              setOnServe(!onServe);
              onServe
                ? setModalVisible(!modalVisible)
                : setOnModalVisible(!OnmodalVisible);
            }}>
            <Animated.View
              style={[
                styles.dragEnableButton,
                {
                  left: -2,
                  backgroundColor: onServe
                    ? theme.color.main
                    : theme.color.black,
                  transform: [{ translateY: moveAnim }],
                },
              ]}>
              <Text
                style={[
                  styles.dragEnableText,
                  {
                    color: onServe ? theme.color.black : theme.color.main,
                  },
                ]}>
                {onServe ? 'On SERVE' : 'Off SERVE'}
              </Text>
            </Animated.View>
          </Pressable>
          <View style={[styles.dragDisableButton, { top: -2, left: -2 }]}>
            <Text style={styles.dragDisableText}>Drag to cancel</Text>
          </View>
          <Image
            source={downArrow}
            style={{
              width: 24,
              height: 24,
              zIndex: -1,
              alignSelf: 'center',
              transform: [{ rotate: onServe ? '180deg' : '0deg' }],
            }}
          />
          <View style={[styles.dragDisableButton, { bottom: -2, left: -2 }]}>
            <Text style={styles.dragDisableText}>Drag to SERVE</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <OffModal offModalData={moveQrCode} modalVisible={modalVisible} />
              <OnModal onModalData={moveQr} modalVisible={OnmodalVisible} />
            </View>
          </View>
        </>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: theme.color.white,
  },
  boardInfo: {
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: theme.color.grayscale.D9D9D9,
    backgroundColor: 'rgba(245, 245, 245, 0.4)',
    paddingVertical: 18,
    alignItems: 'center',
  },
  dragContainer: {
    marginTop: 38,
    alignSelf: 'center',
    width: Dimensions.get('window').width - 90,
    height: 164,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.color.main,
    borderStyle: 'dashed',
  },
  dragEnableButton: {
    // position: 'absolute',
    width: Dimensions.get('window').width - 90,
    borderWidth: 2,
    borderColor: theme.color.main,
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 15,
  },
  dragDisableButton: {
    position: 'absolute',
    width: Dimensions.get('window').width - 90,
    borderWidth: 2,
    borderColor: 'rgba(239, 255, 55, 0.3)',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    borderStyle: 'dashed',
    zIndex: -1,
  },
  dragEnableText: {
    fontSize: 26,
    fontWeight: '700',
  },
  dragDisableText: {
    color: 'rgba(239, 255, 55, 0.3)',
    fontSize: 26,
    fontWeight: '700',
  },
});
