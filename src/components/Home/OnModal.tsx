import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { avatar } from '~/assets/icons';

interface OffModalProps {
  onModalData: () => void;
  modalVisible: boolean;
}

const OnModal = ({ onModalData, modalVisible }: OffModalProps) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View
          style={{
            top: 150,
            width: 320,
            height: 290,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            left: 50,
            borderRadius: 20,
          }}>
          <View style={{ top: 50, alignItems: 'center' }}>
            <Text
              style={{
                color: '#000000',
                fontWeight: '700',
                fontSize: 20,
              }}>
              Nick Name
            </Text>
            <Text style={{ fontWeight: '600', fontSize: 14 }}>
              의 양보 요청 수락
            </Text>
            <Text style={{ fontWeight: '600', fontSize: 14, top: 30 }}>
              ~~의 좌석으로 이동하세요
            </Text>
          </View>
          <View style={{ position: 'absolute', bottom: 250 }}>
            <Image
              source={avatar}
              style={{
                width: 80,
                height: 80,
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              top: 100,
              backgroundColor: '#EFFF37',
              width: 275,
              height: 50,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: 'black',
            }}
            onPress={() => onModalData()}>
            <Text style={{ fontSize: 18 }}>거래하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ top: 120 }} onPress={() => {}}>
            <Text>거절</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default OnModal;
