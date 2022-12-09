import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LogoSuccess from '../assets/icons/NoDocuments.svg';
import Logo from '../assets/logo/logoKIM.svg';
import Styles from '../utils/Styles';
import CustomButton from '../components/CustomButton';

export default function RegisterSuccess({navigation,route }) {
  const {user} = route.params
  console.log(user);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
        }}>
        <Logo width={100} height={100} marginTop={50} />
      </View>
      <View
        style={{
          marginTop: 13,
          paddingHorizontal: 10,
          flex: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LogoSuccess width={250} height={200} marginTop={50} />
        <Text
          style={[
            Styles.textBlack,
            {fontWeight: 'bold', fontSize: 18, marginBottom: 2},
          ]}>
          Pendaftaran Berhasil
        </Text>
        <Text
          style={[
            Styles.textBlack,
            {fontWeight: 'bold', fontSize: 18, marginBottom: 10, maxWidth:300, textAlign:'center'},
          ]}>
          Silahkan cek Email anda untuk mendapatkan kode OTP
        </Text>

        <View style={{marginTop: 30, width:300}}>
          <CustomButton label={'Selanjutnya'} onPress={() => navigation.navigate("OtpScreen",{
            otpData: user
          })} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
