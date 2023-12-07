import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
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
  },
  link: {
    fontWeight: "bold",
    color: "#fff",
  },
  linkView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    gap: 7,
  }
});
const RegisterStyles = StyleSheet.create({
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
    backgroundColor: "red",
    borderColor: '#000', // Border color
    borderBottomLeftRadius: 20, // Border radius
    borderBottomRightRadius: 20, // Border radius
  },
  link: {
    fontWeight: "bold",
    color: "#fff",
  },
  linkView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    gap: 7,
  }
});


export { HomeStyles, PasswordInputStyles, ButtonStyle, LoginStyles, RegisterStyles };
