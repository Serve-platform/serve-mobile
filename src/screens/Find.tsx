import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    NativeModules,
    Platform,
    ScrollView,
    View,
    NativeEventEmitter,
    Button,
} from 'react-native';
import { FindProps } from '~/navigators/stackNav/FindStacknav';
import useBluetooth from '~/hooks/useBluetooth'

const Find = ({}: FindProps) => {
    const { foundUsers, onAdvertiseStart, onAdvertiseStop, onGetUsersForScanStart, onScanStop } = useBluetooth();

  return (
    <View>
      <Text>Find</Text>


        <ScrollView>
            {foundUsers.map((item, index) => (
                <View
                    style={{ marginBottom: 5, backgroundColor: 'black' }}
                    key={index}>
                    <Text style={{ color: 'white' }}>{JSON.stringify(item)}</Text>
                </View>
            ))}
        </ScrollView>

        <TouchableOpacity
            style={{
                height: 50,
                backgroundColor: "pink",
            }}
            onPress={onAdvertiseStart}
        >
            <Text style={{ textAlign: "center" }}>
                Advertise Start
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                height: 50,
                backgroundColor: "pink",
            }}
            onPress={onAdvertiseStop}
        >
            <Text style={{ textAlign: "center" }}>
                Advertise Stop
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                height: 50,
                backgroundColor: "skyblue",
            }}
            onPress={onGetUsersForScanStart}
        >
            <Text style={{ textAlign: "center" }}>
                onScanStart
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                height: 150,
                backgroundColor: "skyblue",
            }}
            onPress={onScanStop}
        >
            <Text style={{ textAlign: "center" }}>
                onScanStop
            </Text>
        </TouchableOpacity>
    </View>
  );
};

export default Find;

const styles = StyleSheet.create({});
