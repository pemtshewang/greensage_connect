import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "native-base";
import { TouchableOpacity } from "react-native";

class Profile extends Component{
  render() {
    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={{padding:10, width:'100%',backgroundColor:'#000',height:180}}>
            <TouchableOpacity>
              <Image source={require('../../assets/arrow.png')}
              style={{width:25, height:25}}></Image>
              
              <View></View>
            </TouchableOpacity>
            
          </View>
          <View style={{alignItems:'center'}}>
                <Image source= {require('../../assets/profile.png')} style={{width:160, height:160, borderRadius:100, marginTop:-70}}></Image>
                <Text style={{fontSize:25, fontWeight:'bold',padding:10}}> Name </Text>
          </View>
          <View style={{
            alignSelf:'center',
            flexDirection:'row', 
            justifyContent:'center', 
            backgroundColor:'#fff',
            width:'90%',
            padding: 20,
            paddingBottom:22,
            borderRadius:10,
            shadowOpacity: 100,
            elevation:20,
            marginTop:20

        }}>
            <Image source={require('../../assets/Phone.png')} style={{width:30,  height:30}}></Image>
            <Text style={{fontSize:15,marginLeft:10, fontWeight:'bold'}}>Phone Number</Text>
          </View>
          <View style={{
            alignSelf:'center',
            flexDirection:'row', 
            justifyContent:'center', 
            backgroundColor:'#fff',
            width:'90%',
            padding: 20,
            paddingBottom:22,
            borderRadius:10,
            shadowOpacity: 100,
            elevation:20,
            marginTop:20

        }}>
            <Image source={require('../../assets/id.png')} style={{width:30,  height:30}}></Image>
            <Text style={{fontSize:15,marginLeft:10, fontWeight:'bold'}}>Identity Card</Text>
          </View>
          <View style={{
            alignSelf:'center',
            flexDirection:'row', 
            justifyContent:'center', 
            backgroundColor:'#fff',
            width:'90%',
            padding: 20,
            paddingBottom:22,
            borderRadius:10,
            shadowOpacity: 100,
            elevation:20,
            marginTop:20

        }}>
            <Image source={require('../../assets/location.png')} style={{width:30,  height:30}}></Image>
            <Text style={{fontSize:15,marginLeft:10,fontWeight:'bold'}}>Dzongkhag</Text>
          </View>
          <TouchableOpacity style={{
            alignSelf:'center',
            flexDirection:'row', 
            justifyContent:'center', 
            backgroundColor:'#fff',
            width:'90%',
            padding: 20,
            paddingBottom:22,
            borderRadius:10,
            shadowOpacity: 100,
            elevation:20,
            marginTop:20,
            marginBottom:30

        }}>
            <Image source={require('../../assets/password.png')} style={{width:30,  height:30}}></Image>
            <Text style={{fontSize:15,marginLeft:10,fontWeight:'bold'}}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            alignSelf:'center',
            flexDirection:'row', 
            justifyContent:'center', 
            backgroundColor:'#000',
            width:'90%',
            padding:20 ,
            paddingBottom:22,
            borderRadius:10,
            shadowOpacity: 100,
            elevation:20,
            marginBottom:40,

        }}>
            <Text style={{fontSize:15,color:'#fff',marginLeft:10, fontWeight:'bold'}}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
    
  }
  export default Profile;

// export default function Profile() {
//   return (
//     <Text>
//         Profil Pages
//     </Text>
//   );
// }