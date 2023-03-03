/**
 * @format
 */

import './global.js';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppHoc from './AppHoc';
import './shim.js'; // 추가된 코드

AppRegistry.registerComponent(appName, () => AppHoc);

/**
 * @format
 */
