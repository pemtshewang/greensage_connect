import CustomStatusBar from './components/Statusbar';
import { Text, View } from 'react-native';
import { HomeStyles } from './styles/styles';
import PasswordInput from './components/PasswordInput';
import TextInput from './components/TextInput';
import { NativeBaseProvider } from 'native-base';
import { Button } from 'native-base';
import { ButtonStyle } from './styles/styles';
import Register from './screens/Auth/register';
import Login from './screens/Auth/login';

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={HomeStyles.container}>
        <Login />
      </View>
    </NativeBaseProvider>
  );
}

