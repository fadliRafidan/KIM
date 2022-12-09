import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Logo from '../assets/logo/logoKIM.svg'

import Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import InputField from '../components/InputField'
import Styles from '../utils/Styles'
import axios from 'axios'
import URL from '../../global.json'
import CustomButton from '../components/CustomButton'
import Loading from '../components/Loading'
export default function RegisterScreen({navigation}) {

  const [username, setUsername] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const config = {
    headers: {
      'Accept': 'application/json',
    'Content-Type' : 'application/json'
    },
  };

  const _Register = async () => {

    setLoading(true);
    let user = {
      name: username,
      email: email,
      whatsapp: whatsapp,
      password:password,
      password_confirmation: confirmPassword
    }

if(password === confirmPassword && username.length !== 0){
      axios
        .post(URL.baseURL + 'register', user, config)
        .then(res => {
          console.log(res.status);
          if (res.status) {
            console.log('post success ', res.status);
            setLoading(false);
            let iniOtp = JSON.stringify(res.data.user)
            // setOtp(iniOtp)
            navigation.navigate('RegisterSuccess',{
              user: iniOtp
            })
          }
          
        })
        .catch(err => {
          console.log(err);
          alert("Email dan nomor Whatsapp suda terdaftar")
          setLoading(false);
        });
    } else {
      alert('Inputan harus diisi');
      setLoading(false);
    }
  };



  // console.log(username, whatsapp, email, password, confirmPassword);

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: 'white' }}>
     {loading ? (
                <Loading />
            ) : null}
    <ScrollView vertical={true} >
    <View style={{ flex:1, justifyContent:'flex-start', alignItems:'flex-start', paddingHorizontal:20 }}>
    <Logo width={100} height={100} marginTop={100}/>
<View style={{marginTop:13, paddingHorizontal:10}}>
    
          <Text style={[Styles.textBlack,{fontWeight:'bold', fontSize:29, marginBottom:20}]}>Pendaftaran</Text>
          {/* <Icon android="md-add"/> */}
          <InputField
          label={'Nama Lengkap'}
          onChangeText={setUsername}
          value={username}
          icon={
            <Icon
            name="user-alt"
            size={17}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
        />
          <InputField
          label={'No. Whatsapp Aktif'}
          onChangeText={setWhatsapp}
          value={whatsapp}
          icon={
            <MaterialIcons
            name="phone"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
        />
          <InputField
          label={'Email'}
          onChangeText={setEmail}
          value={email}
          icon={
            <MaterialIcons
            name="mail"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
        />
          <InputField
          label={'Password'}
          onChangeText={setPassword}
          value={password}
          icon={
            <MaterialIcons
            name="lock"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
        
          inputType="password"
          fieldButtonFunction={() => {}}
        />
          <InputField
          label={'Konfirmasi Password'}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          icon={
            <MaterialIcons
            name="lock"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          fieldButtonFunction={() => {}}
        />
        <CustomButton label={"Daftar"} onPress={_Register} />
    
</View>
    </View>
</ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });
  