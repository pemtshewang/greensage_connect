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
    height: "auto",
    margin: 12,
    borderWidth: 3,
    borderColor: '#f00',
    color: '#f00'
  }
})

export { HomeStyles, PasswordInputStyles, ButtonStyle };
