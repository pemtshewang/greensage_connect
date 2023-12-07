import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
    // gradient
    color: "#fff"
  },
  icon: {
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
  },
  input: {
    borderColor: "#000",
    borderWidth: 1,
  },
  button: {
    width: 150, // Set width as needed
    height: 50, // Set height as needed
    borderWidth: 1, // Border width
    backgroundColor: "#10670F",
    borderColor: '#000', // Border color
    borderBottomLeftRadius: 20, // Border radius
    borderBottomRightRadius: 20, // Border radius
  }
});


export { HomeStyles, PasswordInputStyles, ButtonStyle, LoginStyles };
