import CustomStatusBar from './components/Statusbar';
import { StyleSheet, Text, View } from 'react-native';
import { HomeStyles } from './styles/styles';

export default function App() {
  return (
    <View style={HomeStyles.container}>
      <Text>AMC Greenhouse starting</Text>
      <CustomStatusBar style='auto' />
    </View>
  );
}

