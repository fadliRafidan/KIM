import axios from 'axios';
import { useToast } from 'native-base';
import React, {Fragment, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import URL from '../../../global.json';
import CustomHeaderBG from '../../components/CustomHeaderBG';
import InputTextSetting from '../../components/InputTextSetting';
import Loading from '../../components/Loading';
import Styles from '../../utils/Styles';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default function GantiPassword({navigation}) {
  let user = useSelector(state => state.AuthReducers.user);
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPasswordBaru, setkonfirmasiPasswordBaru] = useState('');
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const toast = useToast();
  const GantiPassword = async ()=>{
    setLoading(true);
let formdata = new FormData()
formdata.append('password_lama', passwordLama)
formdata.append('password_baru', passwordBaru)
formdata.append('konfirmasi_password_baru', konfirmasiPasswordBaru)

let data = {
  password_lama : passwordLama,
  password_baru : passwordBaru,
  konfirmasi_password_baru : konfirmasiPasswordBaru
}

if(passwordBaru == konfirmasiPasswordBaru){
  axios
  .post(URL.baseURL + `simpan-password-baru/${user.id}`, data, config)
  .then(res => {
    console.log(res);
    if (res.status === 200) {
      console.log('post success ', res.status);
      setLoading(false);
      setError(false)
      setPasswordLama('')
      setPasswordBaru('')
      setkonfirmasiPasswordBaru('')
      toast.show({
        render: () => {
          return (
            <View
              style={{
                backgroundColor: '#34ebde',
                padding: 15,
                borderRadius: 15,
                marginTop: 50,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontWeight: '500',
                  marginRight: 4,
                }}>
              Password Berhasil di Ubah
              </Text>
            </View>
          );
        },
        placement: 'top',
      });
    }
  })
  .catch(err => {
    console.log(err);
    setError(true)
    setLoading(false);
  });
}else{
  alert("Error, Perikasi Kembali password baru dan konfirmasi password anda")
  setLoading(false);
}
  }

  return (
    <Fragment>
    {loading ? <Loading /> : null}
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG label="Forum" onPress={() => navigation.goBack()} />
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        {error ? <Text
                style={[
                  Styles.textDefault,
                  {
                    fontFamily: 'Roboto-Medium',
                    fontSize: 17,
                    fontWeight: '600',
                    marginBottom: 30,
                    textAlign: 'center',
                  },
                ]}>
               Password Lama Anda Salah
              </Text> :
              <Text
                style={[
                  Styles.textDefault,
                  {
                    fontFamily: 'Roboto-Medium',
                    fontSize: 28,
                    fontWeight: '700',
                    marginBottom: 30,
                    textAlign: 'center',
                  },
                ]}>
                Ubah Password
              </Text>}
          <View style={{paddingHorizontal: 20}}>
            <View
              style={{
                overflow: 'hidden',
                paddingBottom: 5,
                paddingHorizontal: 5,
              }}>
    
              <View style={{paddingVertical: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: 'black',
                    paddingBottom: 10,
                    marginLeft: 5,
                  }}>
                  Password Saat ini
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 7,
                    paddingHorizontal: 15,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderColor: '#AAAAAA',
                    borderWidth: 0.5,
                  }}>
                  <TextInput
                    placeholder="Konfirmasi password"
                    style={{flex: 1, paddingVertical: 0}}
                    keyboardType="visible-password"
                    secureTextEntry={true}
                    value={passwordLama}
                onChangeText={setPasswordLama}
                  />
                </View>
              </View>
    

<View style={{paddingVertical: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: 'black',
                    paddingBottom: 10,
                    marginLeft: 5,
                  }}>
                  Password Baru
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 7,
                    paddingHorizontal: 15,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderColor: '#AAAAAA',
                    borderWidth: 0.5,
                  }}>
                  <TextInput
                    placeholder="Konfirmasi password"
                    style={{flex: 1, paddingVertical: 0}}
                    keyboardType="visible-password"
                    secureTextEntry={true}
                    value={passwordBaru}
                onChangeText={setPasswordBaru}
                  />
                </View>
              </View>

              <View style={{paddingVertical: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: 'black',
                    paddingBottom: 10,
                    marginLeft: 5,
                  }}>
                  Konfirmasi password
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 7,
                    paddingHorizontal: 15,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderColor: '#AAAAAA',
                    borderWidth: 0.5,
                  }}>
                  <TextInput
                    placeholder="Konfirmasi password"
                    style={{flex: 1, paddingVertical: 0}}
                    keyboardType="visible-password"
                    secureTextEntry={true}
                    value={konfirmasiPasswordBaru}
                onChangeText={setkonfirmasiPasswordBaru}
                  />
                </View>
              </View>
            </View>
            <View
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                  flexDirection: 'row',
                  paddingTop: 20,
                  justifyContent:'center',
                  alignItems:'center'
                }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    height: 40,
                    width: 120,
                    borderRadius: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#01C3D5',
                    borderWidth: 2,
                  }}>
                  <Text style={{color: '#01C3D5', fontSize: 15, fontWeight: '600'}}>
                    Batal
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={GantiPassword}
                  style={{
                    height: 40,
                    width: 120,
                    borderRadius: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#01C3D5',
                    borderWidth: 2,
                    marginLeft: 10,
                    backgroundColor: '#01C3D5',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
                    Simpan
                  </Text>
                </TouchableOpacity>
              </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
