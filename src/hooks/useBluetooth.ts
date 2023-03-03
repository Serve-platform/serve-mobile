import { NativeEventEmitter, NativeModules } from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import {
  advertiseStart,
  advertiseStop,
  scanStart,
  scanStop,
} from 'react-native-ble-phone-to-phone';
import { getTradeUser, getUsers } from '~/api';
import { useEffect, useState } from 'react';

import { UserProp } from '~/types';
import { useMutation } from 'react-query';

const useBluetooth = () => {
  const [foundUuids, setFoundUuids] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    // 권한
    const permission = async () => {
      const result = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
      ]);

      if (result['android.permission.BLUETOOTH_CONNECT']) {
        console.log('Module initialized');
      }
    };
    permission().then();

    // 이벤트 리스터
    const eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser);
    eventEmitter.addListener('foundUuid', data => {
      console.log('> data : ', data);
      const newList = new Set([...foundUuids, data.uuid]);
      // @ts-ignore
      setFoundUuids([...newList]);
    });
    eventEmitter.addListener('error', message =>
      console.log('> error : ', message),
    );
    eventEmitter.addListener('log', message =>
      console.log('> log : ', message),
    );
  }, []);

  useEffect(() => {
    onGetUserByUuid();
  }, [foundUuids]);

  // 전체 사용자 목록
  const { mutate: getUsersMutate } = useMutation(
    async () => {
      const { data } = await getUsers();
      return data;
    },
    {
      onSuccess: data => {
        const uuids = data.map((item: UserProp) => item.uuid);
        onScanStart(uuids.join());
      },
      onError: () => {},
    },
  );
  const onGetUsersForScanStart = () => {
    getUsersMutate();
  };

  // 받은 uuids로 사용자 정보 조회
  const { mutate: getUserByUuidMutate } = useMutation(
    async () => {
      const { result } = await getTradeUser(foundUuids);
      return result;
    },
    {
      onSuccess: data => {
        console.log('> getUserByUuidMutate data : ', data);
        setFoundUsers(data);
      },
      onError: () => {},
    },
  );
  const onGetUserByUuid = () => {
    foundUuids.map(uuid => getUserByUuidMutate(uuid));
  };

  // 자리 양도하기 위한 advertise start
  const onAdvertiseStart = (uuid: string) => {
    advertiseStart(uuid);
  };

  // 자리 양도하기 위한 advertise stop
  const onAdvertiseStop = () => {
    advertiseStop();
  };

  // 자리 양도받기 위해 내릴 사람 찾기 start
  const onScanStart = (uuidsToString: string) => {
    scanStart(uuidsToString);

    setTimeout(() => {
      onScanStop();
    }, 10000);
  };

  // 자리 양도받기 위해 내릴 사람 찾기 stop
  const onScanStop = () => {
    scanStop();
  };

  return {
    foundUuids,
    setFoundUuids,
    foundUsers,
    onAdvertiseStart,
    onAdvertiseStop,
    onGetUsersForScanStart,
    onScanStop,
  };
};

export default useBluetooth;
