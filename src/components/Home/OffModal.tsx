import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { avatar } from '~/assets/icons';

interface OffModalProps {
  offModalData: () => void;
  modalVisible: boolean;
}

const OffModal = ({ offModalData, modalVisible }: OffModalProps) => {
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
              a request for concession
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
            onPress={() => offModalData()}>
            <Text style={{ fontSize: 18 }}>confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ top: 120 }} onPress={() => {}}>
            <Text>decline</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default OffModal;
