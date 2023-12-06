import CustomStatusBar from './components/Statusbar';
import { StyleSheet, Text, View } from 'react-native';
import { HomeStyles } from './styles/styles';
import PasswordInput from './components/PasswordInput';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={HomeStyles.container}>
        <Text>Working or</Text>
        <CustomStatusBar style='auto' />
        <PasswordInput width='50%' />
        <Text>Working or</Text>
      </View>
    </NativeBaseProvider>
  );
}

