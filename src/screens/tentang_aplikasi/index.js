import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import URL from '../../../global.json';
import Logo from '../../assets/logo/logoKIM.svg';
import CustomHeaderBG from '../../components/CustomHeaderBG';
import Styles from '../../utils/Styles';

const {width} = Dimensions.get('window');
export default function TentangAplikasi({navigation}) {
  const [tentangKami, setTentangKami] = useState('');

  const getTentangKami = async () => {
    let {data} = await axios.get(URL.baseURL + 'about', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setTentangKami(data.data);
  };

  useEffect(() => {
    getTentangKami();
  }, []);

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG
          label="Tentang Aplikasi"
          onPress={() => navigation.goBack()}
        />
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Logo width={150} height={150} marginTop={20} />

            <View style={{width: 300}}>
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
                App Versi 1.0
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 30,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '500',
                    textAlign: 'justify',
                    fontSize: 15,
                  }}>
                  {tentangKami.deskripsi}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}
