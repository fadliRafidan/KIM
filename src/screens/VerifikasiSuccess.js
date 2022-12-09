import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Done from '../assets/icons/Done.svg';
import Logo from '../assets/logo/logoKIM.svg';
import Styles from '../utils/Styles';
import CustomButton from '../components/CustomButton';

export default function VerifikasiSuccess({navigation}) {
  const [isSelected, setSelection] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
        }}>
        <Logo width={150} height={150} marginTop={50} />
      </View>
      <View
        style={{
          marginTop: 13,
          paddingHorizontal: 10,
          flex: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Done width={250} height={200} marginTop={50} />
        <Text
          style={[
            Styles.textBlack,
            {fontWeight: 'bold', fontSize: 18, marginBottom: 2},
          ]}>
          Verifikasi Berhasil
        </Text>
        <Text
          style={[
            Styles.textBlack,
            {fontWeight: 'bold', fontSize: 18, marginBottom: 10},
          ]}>
          Silahkan Anda Dapat Mengakses Aplikasi
        </Text>

        <View style={{marginTop: 30, width:300}}>
          <CustomButton label={'Login'} onPress={() => navigation.navigate("Login")} />
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
