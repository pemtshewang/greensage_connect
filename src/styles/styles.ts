import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
  container: {
    flex:1,
    margin: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderColor: '#10670F',
    borderWidth: 2
    
  },
});

const PasswordInputStyles = StyleSheet.create({
  input: {
    margin: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderColor: '#10670F',
    borderWidth: 2
  }
});

const ButtonStyle = StyleSheet.create({
  register: {
    height: "auto",
    margin: 12,
    borderWidth: 3,
    borderColor: '#f00',
    color: '#f00'
  }
})

const InputTextStyle = StyleSheet.create({
  input: {
    margin: 12,
    borderColor: 'red',
    borderWidth: 1,
    width:300,
    height: 40,
    color: 'black',
    textAlign: "left"
  }
})
const FinalButonStyle = StyleSheet.create({
  buttons:{
    color: '#10670F',
    backgroundColor: '#10670F'
  }
})

export { HomeStyles, PasswordInputStyles, ButtonStyle, InputTextStyle, FinalButonStyle };
