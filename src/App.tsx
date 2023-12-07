import CustomStatusBar from './components/Statusbar';
import { Text, View } from 'react-native';
import { HomeStyles } from './styles/styles';
import PasswordInput from './components/PasswordInput';
import TextInput from './components/TextInput';
import { NativeBaseProvider } from 'native-base';
import { Button } from 'native-base';
import { ButtonStyle } from './styles/styles';
import Login from './screens/Auth/login';
import GreenhouseStatus from './components/GreenhouseStatus';
export default function App() {
  return (
    <NativeBaseProvider>
      <View style={HomeStyles.container}>
        <GreenhouseStatus type='valve'>Home</GreenhouseStatus>
      </View>
      <CustomStatusBar style='inverted' />
    </NativeBaseProvider>
  );
}

