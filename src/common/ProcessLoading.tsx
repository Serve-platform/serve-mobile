import { View, Text, Modal } from 'react-native';
import React, { useState } from 'react';

const ProcessLoading = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={{}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ width: 200, height: 100 }}>
          <Text>ProcessLoading</Text>
        </View>
      </Modal>
    </View>
  );
};

export default ProcessLoading;
