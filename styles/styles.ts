import { AlignCenter } from "lucide-react-native";
import { Center } from "native-base";
import { StyleSheet } from "react-native";
import GreenHouse from '../app/GreenHouse/data';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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

const notification = StyleSheet.create({
  testStyle: {
    padding:15,
    width:'100%',
      color:'#000',
      fontSize: 30,
      textAlign:'center',
      fontWeight:'bold',
      paddingLeft:100
  },
  itemstyle: {
    flex:1,
    width: '100%',
    height: '100%',
    padding: 15,
    backgroundColor: '#AA9B9B',
    marginBottom:2,
    marginLeft: 5,
    marginEnd: 5,
    borderWidth: 2,
    borderColor:'black',
    borderRadius:20
    
  },
  imagestyle: {
    width: '100%',
    height:'100%',
    borderRadius:50,
  },
  imageView: {
    width:60,
    height: 60,
    borderRadius: 20 / 2,

    
  }
})
const ButtonStyle = StyleSheet.create({
  register: {
    height: "auto",
    margin: 12,
    borderWidth: 3,
    borderColor: '#f00',
    color: '#f00'
  }
})
const inputText = StyleSheet.create({
  input: {
    borderRadius: 15
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
    borderColor: '#000', // Border color
    borderBottomLeftRadius: 20, // Border radius
    borderBottomRightRadius: 20, // Border radius
    // not pressed background color to green
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
  },
  inputField: {
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: "column",
    rowGap: 10,
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
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#10670F',
    width: 150,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
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
  },
  selecStyle: {
    borderColor: '#000',
    borderWidth: 1.7,
    borderRadius:5,
    
  }

});

const GreenHouseContainerStyles = StyleSheet.create({
  addButton:{
    paddingEnd:10
  }
});

export { HomeStyles, PasswordInputStyles, ButtonStyle, LoginStyles, RegisterStyles, notification, GreenHouseContainerStyles };
