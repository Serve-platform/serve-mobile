import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import {
  PERMISSIONS,
  request,
  requestMultiple,
} from 'react-native-permissions';
import BleManager from 'react-native-ble-manager';
import BLEAdvertiser from 'react-native-ble-advertiser';

const SERVICE_UUID = '25AE1441-05D3-4C5B-8281-93D4E07420CF';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Home = () => {
  const [list, setList] = useState([]);
  const peripherals = new Map();
  useEffect(() => {
    const permission = async () => {
      const result = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
      ]);

      if (result['android.permission.BLUETOOTH_CONNECT']) {
        BleManager.start({ showAlert: false }).then(() => {
          console.log('Module initialized');
        });
      }
    };
    permission();

    const discover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );

    const disconnect = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );

    return () => {
      console.log('unmount');
      discover.remove();
      disconnect.remove();
    };
  }, []);

  const scan = () => {
    BleManager.scan([SERVICE_UUID], 5, true, {
      reportDelay: 0,
      scanMode: 2,
      matchMode: 1,
      numberOfMatches: 1,
    }).then(scanResult => {
      console.log(scanResult, 'scanResult');
      // Success code
      console.log('Scan started');
    });
  };

  const enableBluetooth = () => {
    if (Platform.OS === 'android') {
      BleManager.enableBluetooth()
        .then(() => {
          // Success code
          console.log('The bluetooth is already enabled or the user confirm');
        })
        .catch(error => {
          // Failure code
          console.log('The user refuse to enable bluetooth');
        });
    }
  };

  const getPeripheral = () => {
    BleManager.getConnectedPeripherals([SERVICE_UUID]).then(results => {
      // Success code
      console.log('Connected peripherals: ' + results.length);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        //@ts-ignore
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        //@ts-ignore
        setList(Array.from(peripherals.values()));
      }
    });
  };

  const connect = () => {
    BleManager.connect(SERVICE_UUID)
      .then(() => {
        // Success code
        console.log('Connected');
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };

  const disconnect = () => {
    //@ts-ignore
    BleManager.disconnect(list[0].id)
      .then(() => {
        // Success code
        console.log('Disconnected');
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };

  const stop = () => {
    BleManager.stopScan().then(() => {
      // Success code
      console.log('Scan stopped');
    });
  };

  const handleDiscoverPeripheral = (peripheral: any) => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    //@ts-ignore
    setList(Array.from(peripherals.values()));
  };

  const handleDisconnectedPeripheral = (data: any) => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      //@ts-ignore
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  };

  const advertise = () => {
    BLEAdvertiser.setCompanyId(0x00e0);
    BLEAdvertiser.broadcast(SERVICE_UUID, [], {}) // The service UUID and additional manufacturer data.
      .then(success => console.log('Broadcasting Successful', success))
      .catch(error => console.log('Broadcasting Error', error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginBottom: 80 }}>
        {list.map((item, index) => (
          <View
            style={{ marginBottom: 10, backgroundColor: 'black' }}
            key={index}>
            <Text style={{ color: 'white' }}>{JSON.stringify(item)}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: 'orange',
          }}
          onPress={advertise}>
          <Text style={{ textAlign: 'center' }}>advertise</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 100,
            marginTop: 50,
            backgroundColor: 'orange',
          }}
          onPress={enableBluetooth}>
          <Text style={{ textAlign: 'center' }}>enableBluetooth</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: 'orange',
            marginTop: 50,
          }}
          onPress={getPeripheral}>
          <Text style={{ textAlign: 'center' }}>getPeripheral</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: 'orange',
            marginTop: 50,
          }}
          onPress={scan}>
          <Text style={{ textAlign: 'center' }}>scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: 'orange',
            marginTop: 50,
          }}
          onPress={stop}>
          <Text style={{ textAlign: 'center' }}>stop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: 'orange',
            marginTop: 50,
          }}
          onPress={connect}>
          <Text style={{ textAlign: 'center' }}>connect</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: 'orange',
            marginTop: 50,
          }}
          onPress={disconnect}>
          <Text style={{ textAlign: 'center' }}>disConnect</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'black',
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 100,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Home;
