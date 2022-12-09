import React, { Fragment, useState } from 'react';
import {
  Alert,
  ImageBackground, Keyboard, SafeAreaView, StatusBar, Text,
  TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import configData from '../../global.json';
import { LoginAction } from '../../store/actions';
import Logo from '../assets/logo/logoKIM.svg';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import Loading from '../components/Loading';
import Styles from '../utils/Styles';
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];


const LoginScreen = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [messageUsername, setMessageUsername] = useState('');
  const [messagePassword, setMessagePassword] = useState('');

  const dispatch = useDispatch();

  const validateUsername = (text = '') => {
      if (text == '') {
          setMessageUsername('Username harus diisi');
      } else {
          setMessageUsername(true);
      }
      setUsername(text);
  }

  const validatePassword = (text = '') => {
      if (text == '') {
          setMessagePassword('Password harus diisi');
      } else {
          setMessagePassword(true);
      }
      setPassword(text);
  }


  const _loginAsync = async () => {
    validateUsername(username);
    validatePassword(password);
    if (messageUsername == true && messagePassword == true) {
        let user = {
          email : username,
          password: password
        }
        try {
          startLoading();
          let response = await fetch(configData.baseURL + 'login', {
            method: 'POST',
            headers: {
              Accept : "application/json",
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(user)
          })
            let json = await response.json();
            console.log("Ini Eror"+ JSON.stringify(json));
            if (json.token) {
              stopLoading();
                dispatch(LoginAction(json.token, json.user));
            } if (JSON.stringify(json.message)) {
              setError(JSON.stringify(json.message))
              setShowLoading(false);
            }
             else {
              stopLoading();
            }
        } catch (error) {
          stopLoading();
            Alert.alert("Oops", "Terjadi kesalahan saat menghubungkan ke server");
        }
    }
}

const stopLoading = () => {
  setShowLoading(false);
}
const startLoading = () => {
  Keyboard.dismiss();
  setShowLoading(true);
}


  return (
    <Fragment>
     {showLoading ? (
                <Loading />
            ) : null}
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
        <ImageBackground
          source={require('../assets/images/kimBG.png')}
          style={{width: '100%', height: '100%'}}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            <Logo width={100} height={100} marginTop={150} />

            <View style={{width: 300, marginTop: 70}}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 16,
                    fontWeight: '400',
                    color: '#292929',
                    marginBottom: 3,
                    textAlign: 'center',
                  }}>
                  Hallo,
                </Text>
              </View>

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
               User tidak ditemukan periksa kembali email dan password anda
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
                Selamat Datang
              </Text>}

             

              <InputField
                label={'Email'}
                icon={
                  <MaterialIcons
                    name="mail"
                    size={17}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                value={username}
                onChangeText={text => validateUsername(text)}
                keyboardType="email-address"
              />

              <InputField
                label={'Password'}
                icon={
                  <Icon
                    name="key"
                    size={17}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                value={password}
                onChangeText={text => validatePassword(text)}
                inputType="password"
              />
              <CustomButton label={'Login'} onPress={_loginAsync}/>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 30,
                }}>
                <Text style={{color: '#000', fontWeight: '500'}}>
                  Atau Belum Punya Akun?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={{color: '#019ACF', fontWeight: '700'}}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </Fragment>
  );
};

export default LoginScreen;
