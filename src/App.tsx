import CustomStatusBar from './components/Statusbar';
import { Text, View } from 'react-native';
import { HomeStyles } from './styles/styles';
import PasswordInput from './components/PasswordInput';
import TextInput from './components/TextInput';
import { NativeBaseProvider } from 'native-base';
import { Button } from 'native-base';
import { ButtonStyle } from './styles/styles';
export default function App() {
  return (
    <NativeBaseProvider>
      <View style={HomeStyles.container}>
        <Text>Working or</Text>
        <CustomStatusBar style='auto' />
        <PasswordInput width='50%' />
        <Button style={ButtonStyle.register}> </Button>
        <Text>Working or</Text>
        <TextInput placeholder='Email' width="1" />
      </View>
    </NativeBaseProvider>
  );
}

