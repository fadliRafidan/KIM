import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LogoSuccess from '../../assets/icons/NoDocuments.svg';
import Logo from '../../assets/logo/logoKIM.svg';
import Styles from '../../utils/Styles';

export default function UserScreen({navigation }) {
  useEffect(() => {
  return navigation.navigate('Berita')
  }, [])
  
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
        <LogoSuccess width={250} height={200} marginTop={50} />
        <Text
          style={[
            Styles.textBlack,
            {fontWeight: 'bold', fontSize: 17, marginBottom: 2},
          ]}>
          Oopss Terjadi Masalah...
        </Text>
        <Text
          style={[
            Styles.textBlack,
            {fontWeight: 'bold', fontSize: 15, marginBottom: 10, maxWidth:300, textAlign:'center'},
          ]}>
         Kembali Ke Beranda
        </Text>

       
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
