import axios from 'axios';
import {CheckIcon, Select} from 'native-base';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import URL from '../../../global.json';
import Arrow from '../../assets/icons/arrowleft.svg';
import Logo from '../../assets/logo/logoKIM.svg';
import CustomSelect from '../../components/CustomSelect';
import InputTextSetting from '../../components/InputTextSetting';

const {width} = Dimensions.get('window');

export default function Setting({navigation, route}) {
  let {profinsiID, kabupatenID, kecamatanID, desaID} =route.params;
  console.log(profinsiID,kabupatenID,kecamatanID,desaID);
  let user = useSelector(state => state.AuthReducers.user);


  const [province_id, setprovince_id] = useState('');
  const [regency_id, setregency_id] = useState('');
  const [district_id, setdistrict_id] = useState('');
  const [village_id, setvillage_id] = useState('');
 

  const [serviceProvince, setServiceProvince] = useState(profinsiID);
  const [serviceKabupaten, setServiceKabupaten] = useState(kabupatenID);
  const [serviceKecamatan, setServiceKecamatan] = useState(kecamatanID);
  const [serviceDesa, setServiceDesa] = useState(desaID);
  const [desa, setDesa] = useState('');



  // console.log(serviceProvince);
  // console.log(serviceKabupaten);
  // console.log(serviceKecamatan);
  // console.log(serviceDesa);



  const getUser = async () => {
    let {data} = await axios.get(
      URL.baseURL + `identitas-pengguna/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    let users = data.data;   
    // setServiceProvince(Number(users.province_id));
    // setServiceKabupaten(Number(users.regency_id));
    // setServiceKecamatan(Number(users.district_id));
    // setServiceDesa(Number(users.village_id));
  };

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data;',
      Accept: 'application/json',
    },
  };

  const getProvinsi = async () => {
    let {data} = await axios.post(URL.baseURL + 'provinsi', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    // console.log(data.provinsi);
    setprovince_id(data.provinsi);
  };

  const getKabupaten = async (itemValue) => {
    let dataTest = {
      id_provinsi: itemValue ? itemValue :serviceProvince,
    };
    let {data} = await axios.post(URL.baseURL + 'kabupaten', dataTest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    // console.log(data.kabupaten);
    setregency_id(data.kabupaten);
  };

  const getKecamatan = async (itemValue) => {
    let dataTest = {
      id_kabupaten: itemValue ? itemValue : serviceKabupaten,
    };
    let {data} = await axios.post(URL.baseURL + 'kecamatan', dataTest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    // console.log(data.kecamatan);
    setdistrict_id(data.kecamatan);
  };

  const getDesa = async (itemValue) => {
    let dataTest = {
      id_kecamatan: itemValue ? itemValue : serviceKecamatan,
    };
    let {data} = await axios.post(URL.baseURL + 'desa', dataTest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    // console.log(data.desa);
    setvillage_id(data.desa);
  };
  const updateUser = () => {
    let formdata = new FormData();
   
    formdata.append('province_id', serviceProvince);
    formdata.append('regency_id', serviceKabupaten);
    formdata.append('district_id', serviceKecamatan);
    formdata.append('village_id', desa);
    
console.log(formdata);

axios
.post(URL.baseURL + `ubah-pengguna/${user.id}`, formdata, config)
.then(res => {
  console.log(res);
  if (res.status === 200) {
    console.log('post success ', res.status);
  }
})
.catch(err => {
  console.log(err);
});


    

  };


// 32, 3208, 3208061, 3208061009

  useEffect(() => {
    getUser();
    getProvinsi();
    getKabupaten();
    getKecamatan();
    getDesa();
  }, []);



  return (
    <Fragment>
      <StatusBar backgroundColor="white" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingLeft: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 50,
                paddingLeft: 10,
              }}>
              <Arrow />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: 'black',
                  marginLeft: 3,
                }}>
                Profil
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 40,
                paddingRight: 15,
              }}>
              <Logo width={60} height={60} />
            </View>
          </View>

          <SafeAreaView style={{flex: 1, paddingHorizontal: 25, marginTop: 20}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            
              <CustomSelect
              title="Provinsi"
                onValueChange={itemValue => {getKabupaten(itemValue),setServiceProvince(itemValue);}}
                selectedValue={serviceProvince}
                data={province_id}
                placeholder="Provinsi"
              />
              <CustomSelect
              title="Kabupaten"
                onValueChange={itemValue => {getKecamatan(itemValue), setServiceKabupaten(itemValue)}}
                selectedValue={serviceKabupaten}
                data={regency_id}
                placeholder="Kabupaten"
              />
              <CustomSelect
              title="Kecamatan"
                onValueChange={itemValue => {getDesa(itemValue), setServiceKecamatan(itemValue)}}
                selectedValue={serviceKecamatan}
                data={district_id}
                placeholder="Kecamatan"
              />
              <CustomSelect
              title="Desa"
                onValueChange={itemValue => {setDesa(itemValue),setServiceDesa(itemValue)}}
                selectedValue={serviceDesa}
                data={village_id}
                placeholder="Desa"
              />

           

              <View style={{paddingVertical: 10}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('GantiPassword')}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      color: 'red',
                      paddingBottom: 10,
                      marginLeft: 5,
                    }}>
                    * ingin ganti password ?
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                  flexDirection: 'row',
                  paddingTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Kegiatan')}
                  style={{
                    height: 40,
                    width: 120,
                    borderRadius: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: 'red',
                    borderWidth: 2,
                  }}>
                  <Text style={{color: 'red', fontSize: 15, fontWeight: '600'}}>
                    Batal
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={updateUser}
                  style={{
                    height: 40,
                    width: 120,
                    borderRadius: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: 'red',
                    borderWidth: 2,
                    marginLeft: 10,
                    backgroundColor: 'red',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
                    Simpan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  imageStyle: {
    height: 70,
    width: 70,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  dropdown1BtnStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderWidth: 0.5,
  },
  dropdown1BtnTxtStyle: {color: '#000', textAlign: 'left', fontSize: 16},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF', borderRadius: 25},
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    borderRadius: 20,
  },
  dropdown1RowTxtStyle: {color: '#000', textAlign: 'center'},
});
