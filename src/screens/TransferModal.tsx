import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { close } from '~/assets/icons';
import { TransferModalProps } from '~/navigators/GlobalNav';

const TransferModal = ({ navigation }: TransferModalProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'black',
      }}>
      <TouchableOpacity
        style={{ position: 'absolute', left: 30, top: 30 }}
        onPress={() => navigation.goBack()}>
        <Image source={close} style={{ width: 15, height: 15 }} />
      </TouchableOpacity>
      <View
        style={{
          width: 310,
          height: 310,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>~를 전송합니다</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#EFFF37',
            width: 300,
            height: 65,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: 'black', fontSize: 26, fontWeight: '700' }}>
            CONFIRM
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransferModal;
