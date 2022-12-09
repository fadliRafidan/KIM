import axios from "axios";
import React, { useState } from "react";
import { Keyboard, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import URL from '../../global.json';
import Logo from '../assets/logo/logoKIM.svg';
import Loading from "../components/Loading";
import OTPInput from "../components/Otp";
import Styles from "../utils/Styles";
export default function OtpScreen({navigation, route}) {
  const {otpData} = route.params
  const data = JSON.parse(otpData)

  const [loading, setLoading] = useState(false);
    const [otpCode, setOTPCode] = useState("");
    const [otpUlangCode, setOTPUlangCode] = useState("");
    const [isPinReady, setIsPinReady] = useState(false);
    const [kirimOtpUlang, setKirimOtpUlang] = useState(false);
    const maximumCodeLength = 4;
  
    const config = {
      headers: {
        'Accept': 'application/json',
      'Content-Type' : 'application/json'
      },
    };
  

    let user = {
      otp: JSON.stringify(data.otp) ? JSON.stringify(data.otp) : JSON.stringify(otpUlangCode).split(`\"\"`).join(""),
      user_id: JSON.stringify(data.id),
    }
  console.log(user);
  
    const _OTP = async () => {
  
      setLoading(true);
   
  if(otpCode === user.otp){
        axios
          .post(URL.baseURL + 'check-otp', user, config)
          .then(res => {
            const kadaluarsa = JSON.stringify(res.data.status)
            console.log(kadaluarsa);
            if(kadaluarsa === 2){
                alert('Kode OTP yang anda sudah kadaluarsa melewati batas waktu 5 menit')
                console.log("salah");
                setLoading(false);
                setKirimOtpUlang(true)
                setOTPCode("")
              }
           else if (res.status === 200) {
              setLoading(false);
              console.log("betul");
              navigation.navigate('VerifikasiSuccess')
              setOTPCode("")
            }
           
            else{
              alert('Kode OTP yang anda masukan tidak sesuai')
              setLoading(false);
              setOTPCode("")
            }
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      } else {
        alert('Kode OTP yang anda masukan tidak sesuai');
        setLoading(false);
      }
    };
  
  
    let kirimOTP = {
      user_id: JSON.stringify(data.id),
    }
  
    const _kirimUlangOTP = async () => {
      setLoading(true);
        axios
          .post(URL.baseURL + 'kirim-ulang-otp', kirimOTP, config)
          .then(res => {
            console.log(JSON.stringify(res.data.user.otp));
            setOTPUlangCode(JSON.stringify(res.data.user.otp));
            setLoading(false);
            setKirimOtpUlang(false)
            setOTPCode("")
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
            alert('Maaf sedang ada kesalahan di server');
            setKirimOtpUlang(false)
          });
  
    };
  
    console.log("Ini OTP baru"+otpUlangCode);



  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
                <Loading />
            ) : null}
      <View
        style={{
          flex: 0.5,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
        }}>
        <Logo width={100} height={100} marginTop={50} />
      </View>
<ScrollView vertical={true} style={{marginTop:200}}>
      <View
        style={{
          paddingHorizontal: 10,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            Styles.textBlack,
            {fontWeight: 'bold', fontSize: 17, marginBottom: 2, width:300, textAlign:'center', marginBottom:28},
          ]}>
          Masukan kode akses 4 digit
yang telah dikirimkan ke email anda
        </Text>


        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <OTPInput
        code={otpCode}
        setCode={setOTPCode}
        maximumLength={maximumCodeLength}
        setIsPinReady={setIsPinReady}
      />

      {kirimOtpUlang && (
        <TouchableOpacity  disabled={!isPinReady}
       onPress={_kirimUlangOTP}

        style={{
          backgroundColor: !isPinReady ? "grey" : "#019ACF", padding: 20,
        borderRadius: 30,
        marginBottom: 30,
        width:250,
        justifyContent:'center',
        alignItems:'center',
        marginTop:40
        }}>
      <Text  style={{
            color: !isPinReady ? "#fff" : "#fff",
          }}>
        Kirim Ulang OTP
      </Text>
      </TouchableOpacity>
      )}


      {kirimOtpUlang === false && (
        <TouchableOpacity  disabled={!isPinReady}
       onPress={_OTP}

        style={{
          backgroundColor: !isPinReady ? "grey" : "#019ACF", padding: 20,
        borderRadius: 30,
        marginBottom: 30,
        width:250,
        justifyContent:'center',
        alignItems:'center',
        marginTop:40
        }}>
      <Text  style={{
            color: !isPinReady ? "#fff" : "#fff",
          }}>
        Verifikasi
      </Text>
      </TouchableOpacity>
      )}



     
      <StatusBar style="auto" />
    </Pressable>

       
      </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});