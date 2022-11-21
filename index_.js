import { AppRegistry, Platform } from 'react-native';
import App from './App';
import NativeTest from './NativeTest';

AppRegistry.registerComponent('ftrntemplate', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('ft_rn_template', { rootTag });
}
