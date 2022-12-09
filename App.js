import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/navigation';
import { store } from './store';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default props => 
<Provider store={store}>
<NativeBaseProvider>
<Navigation />
</NativeBaseProvider>
</Provider>

