import CustomStatusBar from './components/Statusbar';
import { Text, View } from 'react-native';
import { HomeStyles } from './styles/styles';
import PasswordInput from './components/PasswordInput';
import TextInput from './components/TextInput';
import { NativeBaseProvider } from 'native-base';
import { Button } from 'native-base';
import { ButtonStyle } from './styles/styles';
import GreenhouseStatus from './components/GreenhouseStatus';
import SingleNews from './components/SingleNews';
export default function App() {
  return (
    <NativeBaseProvider>
      <View style={HomeStyles.container}>
        <CustomStatusBar style='auto' />
        <GreenhouseStatus type='exhaust_fan' > </GreenhouseStatus>
        <SingleNews />
      </View>
    </NativeBaseProvider>
  );
}

