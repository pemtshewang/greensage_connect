import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PasswordInputStyles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 3,
    borderColor: "#000",
  }
});

const ButtonStyle = StyleSheet.create({
  register: {
    height: 40,
    margin: 12,
    borderWidth: 3,
    borderColor: '#0000',
    color: 'red'
  }
})

export { HomeStyles, PasswordInputStyles, ButtonStyle };
