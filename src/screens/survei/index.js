import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import URL from '../../../global.json';
import CustomHeaderBG from '../../components/CustomHeaderBG';
export default function Survei({navigation}) {
  let user = useSelector(state => state.AuthReducers.user);
  const [survey, setSurvey] = useState([]);
console.log(user.tanggal_lahir);
  const getSurvey = async () => {
    let {data} = await axios.get(URL.baseURL + 'daftar-survey', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setSurvey(data.data);
  };


  
  const KirimSurvey = async (e) => {

      let {data} = await axios.get(URL.baseURL + 'daftar-kuesioner/' + e, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const posts = data.data;
      if(posts != "kuesioner tidak tersedia") return   navigation.navigate('IsiSurvei', {surveyDetail: posts, id :e});
      
      if(posts == "kuesioner tidak tersedia"){
        console.log("tidak ada");
      }
  };


 
  useEffect(() => {
    getSurvey();
  }, []);


  


  function cekProfilAlamat(user){
    let result;

    if(user.agama = 'null'){
      result = "Anda belum melengkapi kolom agama pada profil"
    }
     if (user.nik = 'null'){
      result = "Anda belum melengkapi kolom NIK pada profil"
    }
      if (user.pekerjaan = 'null'){
      result = "Anda belum melengkapi kolom Pekerjaan pada profil"
    }
      if (user.province_id = 'null'){
      result = "Anda belum melengkapi kolom Alamat pada profil"
    }
      if (user.tanggal_lahir = 'null'){
      result = "Anda belum melengkapi kolom Tanggal Lahir pada profil"
    }
    if(user.tingkat_pendidikan = 'null'){
      result = "Anda belum melengkapi kolom Tingkat Pendidikan pada profil"
    }

    return result;

  } 


  console.log(cekProfilAlamat(user));
  

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG label="Survey" onPress={() => navigation.goBack()} />

        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              overflow: 'hidden',
              paddingBottom: 5,
              paddingHorizontal: 5,
            }}>
            {survey
              ? survey.map(row => (
                  <TouchableOpacity
                    key={row.id}
                    onPress={(e)=>{KirimSurvey(row.id)}}
                    style={{
                      height: 83,
                      width: '100%',
                      shadowOffset: {width: 1, height: 2},
                      shadowOpacity: 10,
                      shadowColor: 'rgba(0,0,0,0.5)',
                      elevation: 5,
                      shadowRadius: 3,
                      borderRadius: 10,
                      backgroundColor: '#ffffff',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 10,
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        alignItems: 'center',
                      }}>
                      <View>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: '600',
                            marginBottom: 12,
                          }}>
                          {row.nama_survey}
                        </Text>
                        <Text
                          style={{
                            color: '#8497AF',
                            fontSize: 13,
                            fontWeight: '600',
                          }}>
                          {row.dibuat_pada}
                        </Text>
                      </View>
                      <Icon name="chevron-right" />
                    </View>
                  </TouchableOpacity>
                ))
              : null}
          </View>
        </View>
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
