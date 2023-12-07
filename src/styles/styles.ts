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


export {InputTextStyle, FinalButonStyle, HomeStyles, PasswordInputStyles, ButtonStyle, LoginStyles };

