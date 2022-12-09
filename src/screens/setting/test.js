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
const pendidikan = [
  {
    id: 'd3',
    name: 'D3',
  },
  {
    id: 's1',
    name: 'S1',
  },
  {
    id: 's2',
    name: 'S2',
  },
  {
    id: 's3',
    name: 'S3',
  },
  {
    id: 'sma/sederajat',
    name: 'SMA/Sederajat',
  },
];
const status_agama = [
  {
    id: 'islam',
    name: 'Islam',
  },
  {
    id: 'buddha',
    name: 'Budha',
  },
  {
    id: 'katolik',
    name: 'Katolik',
  },
  {
    id: 'hindu',
    name: 'Hindu',
  },
  {
    id: 'protestan',
    name: 'Protestan',
  },
  {
    id: 'khonghucu',
    name: 'Khonghucu',
  },
];
const level_organisasi = [
  {
    id: 'masyarakat-umum',
    name: 'Masyarakat Umum',
  },
  {
    id: 'agama',
    name: 'Tokoh Agama',
  },
  {
    id: 'lainnya',
    name: 'Lainnya',
  },
];
const pendapatan = [
  {
    id: 'kurang_dari_5_juta',
    name: '< 5 Juta',
  },
  {
    id: '5-10_juta',
    name: '5 - 10 Juta',
  },
  {
    id: 'di_atas_10_jt',
    name: '> 10 Juta',
  },
];
export default function Setting({navigation}) {
  let user = useSelector(state => state.AuthReducers.user);

  const [tanggal, setTanggal] = useState(null);
  const [name, setName] = useState();
  const [agama, setAgama] = useState('');
  const [foto_profile, setfoto_profile] = useState('');
  const [whatsapp, setwhatsapp] = useState('');
  const [email, setemail] = useState('');
  const [organisasi, setOrganisasi] = useState('');
  const [namaOrganisasi, setNamaOrganisasi] = useState('');
  const [province_id, setprovince_id] = useState('');
  const [regency_id, setregency_id] = useState('');
  const [district_id, setdistrict_id] = useState('');
  const [village_id, setvillage_id] = useState('');
  const [pekerjaan, setpekerjaan] = useState('');
  const [tanggal_lahir, settanggal_lahir] = useState(null);
  const [tingkat_pendidikan, settingkat_pendidikan] = useState('');
  const [NIK, setNIK] = useState('');
  const [instansi, setinstansi] = useState('');
  const [alamat_lengkap, setalamat_lengkap] = useState('');

  const [loading, setLoading] = useState(false);
  const [serviceProvince, setServiceProvince] = useState('');
  const [serviceKabupaten, setServiceKabupaten] = useState('');
  const [serviceKecamatan, setServiceKecamatan] = useState('');
  const [serviceDesa, setServiceDesa] = useState('');
  const [tingkat_pendapatan, settingkat_pendapatan] = useState('');
  const [singleFile, setSingleFile] = useState(null);

  // console.log(serviceProvince);
  // console.log(serviceKabupaten);
  // console.log(serviceKecamatan);
  // console.log(serviceDesa);


  const convertDate = date => {
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();

    switch (bulan) {
      case 0:
        bulan = '01';
        break;
      case 1:
        bulan = '02';
        break;
      case 2:
        bulan = '03';
        break;
      case 3:
        bulan = '04';
        break;
      case 4:
        bulan = '05';
        break;
      case 5:
        bulan = '06';
        break;
      case 6:
        bulan = '07';
        break;
      case 7:
        bulan = '08';
        break;
      case 8:
        bulan = '09';
        break;
      case 9:
        bulan = '10';
        break;
      case 10:
        bulan = '11';
        break;
      case 11:
        bulan = '12';
        break;
    }
    var tampilTanggal = tahun + '-' + bulan + '-' + tanggal;
    return tampilTanggal;
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setTanggal(convertDate(date));
    settanggal_lahir(convertDate(date));
    hideDatePicker();
    Keyboard.dismiss();
  };

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
    console.log(users);
    setfoto_profile(users.foto_profile);
    setName(users.name);
    setNIK(users.nik);
    setAgama(users.agama);
    setOrganisasi(users.level_organisasi);
    setNamaOrganisasi(users.nama_organisasi);
    setTanggal(users.tanggal_lahir);
    settingkat_pendidikan(users.tingkat_pendidikan);
    settingkat_pendapatan(users.tingkat_pendapatan);
    setwhatsapp(users.whatsapp);
    setemail(users.email);
    setpekerjaan(users.pekerjaan);
    setinstansi(users.instansi);
    setServiceProvince(Number(users.province_id));
    setServiceKabupaten(Number(users.regency_id));
    setServiceKecamatan(Number(users.district_id));
    setServiceDesa(Number(users.village_id));
    setalamat_lengkap(users.alamat_lengkap);
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

  const getKabupaten = async itemValue => {
    setServiceProvince(itemValue);
    let dataTest = {
      id_provinsi: itemValue,
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

  const getKecamatan = async itemValue => {
    setServiceKabupaten(itemValue);
    let dataTest = {
      id_kabupaten: itemValue,
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

  const getDesa = async itemValue => {
    setServiceKecamatan(itemValue);
    let dataTest = {
      id_kecamatan: itemValue,
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
    if(singleFile == null){
      console.log("tanpa foto");
    let formdata = new FormData();
    formdata.append('name', name);
    formdata.append('whatsapp', whatsapp);
    formdata.append('email', email);
    formdata.append('province_id', serviceProvince);
    formdata.append('regency_id', serviceKabupaten);
    formdata.append('district_id', serviceKecamatan);
    formdata.append('village_id', serviceDesa);
    formdata.append('agama', agama);
    formdata.append('pekerjaan', pekerjaan);
    formdata.append('tanggal_lahir', tanggal);
    formdata.append('tingkat_pendidikan', tingkat_pendidikan);
    formdata.append('tingkat_pendapatan', tingkat_pendapatan);
    formdata.append('level_organisasi', organisasi);
    formdata.append('nama_organisasi', namaOrganisasi);
    formdata.append('nik', NIK);
    // formdata.append('instansi', instansi);

    console.log(formdata);

    axios
      .post(URL.baseURL + `ubah-pengguna/${user.id}`, formdata, config)
      .then(res => {
        setLoading(false);
        console.log(res);
        if (res.status === 200) {
          console.log('post success ', res.status);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
    
    if(singleFile !== null){
      console.log("dengan foto");
      let formdata = new FormData();
      const fileToUpload = singleFile;
      console.log(fileToUpload);
      formdata.append('name', name);
      formdata.append('foto_profile', {
        uri: fileToUpload[0].uri,
        type: fileToUpload[0].type,
        name: fileToUpload[0].name,
      });
      formdata.append('whatsapp', whatsapp);
      formdata.append('email', email);
      formdata.append('province_id', serviceProvince);
      formdata.append('regency_id', serviceKabupaten);
      formdata.append('district_id', serviceKecamatan);
      formdata.append('village_id', serviceDesa);
      formdata.append('agama', agama);
      formdata.append('pekerjaan', pekerjaan);
      formdata.append('tanggal_lahir', tanggal);
      formdata.append('tingkat_pendidikan', tingkat_pendidikan);
      formdata.append('tingkat_pendapatan', tingkat_pendapatan);
      formdata.append('level_organisasi', level_organisasi);
      formdata.append('nama_organisasi', namaOrganisasi);
      formdata.append('NIK', NIK);
      formdata.append('instansi', instansi);
  
      console.log(formdata);
  
      axios
        .post(URL.baseURL + `ubah-pengguna/${user.id}`, formdata, config)
        .then(res => {
          setLoading(false);
          console.log(res);
          if (res.status === 200) {
            console.log('post success ', res.status);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };




  useEffect(() => {
    getUser();
    getProvinsi();
    getKabupaten();
    getKecamatan();
    getDesa();
  }, []);

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      
      });

      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="white" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          {/* HeaderDetail */}
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
              <ImageBackground
                source={require('../../assets/icons/card.png')}
                style={{
                  height: 200,
                  width: '100%',
                  overflow: 'hidden',
                  borderRadius: 20,
                  paddingTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#FFEBEB',
                    height: 28,
                    width: 100,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 20,
                    right: 20,
                  }}>
                  <Text
                    style={{color: 'red', fontWeight: '600', marginBottom: 4}}>
                    {user.role}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{left: 10, zIndex: 4}}
                    activeOpacity={0.5}
                    onPress={selectFile}>
                    <Icon name="camera" size={23} color="white" />
                  </TouchableOpacity>
                  {/* <Image
                    source={{ uri: URL.urlFOTO + foto_profile || require('../../assets/images/userprofill.png')}}
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 100,
                      resizeMode: 'cover',
                    }}
                  /> */}

                  {singleFile != null ? (
                    <Image
                      source={{uri: singleFile[0].uri}}
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 100,
                        resizeMode: 'cover',
                      }}
                    />
                  ) : null}

                  {singleFile == null && (
                    <Image
                      source={{
                        uri:
                          URL.urlFOTO + foto_profile ||
                          require('../../assets/images/userprofill.png'),
                      }}
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 100,
                        resizeMode: 'cover',
                      }}
                    />
                  )}

                  <View style={{marginLeft: 5, maxWidth: 200}}>
                    <Text style={{color: 'white', fontWeight: '600'}}>
                      #{user.id}
                    </Text>
                    <Text
                      style={{color: 'white', fontWeight: '600', fontSize: 18}}>
                      {user.name}
                    </Text>
                    <Text style={{color: 'white', fontWeight: '600'}}>
                      Kab. Sumedang
                    </Text>
                  </View>
                </View>
              </ImageBackground>

              <InputTextSetting
                title="Nama Lengkap"
                value={name}
                onChangeText={setName}
              />

              <InputTextSetting title="Nik" value={NIK} onChangeText={setNIK} />

              <CustomSelect
              title="Agama"
                onValueChange={itemValue => setAgama(itemValue)}
                selectedValue={agama}
                data={status_agama}
                placeholder="Agama"
              />
              <CustomSelect
              title="Level Organisasi"
                onValueChange={itemValue => setOrganisasi(itemValue)}
                selectedValue={organisasi}
                data={level_organisasi}
                placeholder="Level Organisasi"
              />

              <InputTextSetting
                title="Nama Organisasi"
                value={namaOrganisasi}
                onChangeText={setNamaOrganisasi}
              />

              <View style={{paddingVertical: 10}}>
              <Text
      style={{
        fontSize: 17,
        fontWeight: '400',
        color: 'black',
        marginLeft: 5,
        marginBottom:7
      }}>
     Tanggal Lahir
    </Text>
                <View style={{flexDirection: 'row'}}>
              
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 7,
                      paddingHorizontal: 15,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      borderColor: '#AAAAAA',
                      borderWidth: 0.5,
                    }}>
                    
                    <Text>{tanggal || 'Tanggal Lahir'}</Text>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                    <Icon name="calendar" size={23} />
                  </TouchableOpacity>
                </View>
              </View>

              <CustomSelect
              title="Pendidikan"
                onValueChange={itemValue => settingkat_pendidikan(itemValue)}
                selectedValue={tingkat_pendidikan}
                data={pendidikan}
                placeholder="Tingkat Pendidikan"
              />

              <CustomSelect
              title="Pendapatan"
                onValueChange={itemValue => settingkat_pendapatan(itemValue)}
                selectedValue={tingkat_pendapatan}
                data={pendapatan}
                placeholder="Tingkat Pendapatan"
              />

              <InputTextSetting
                title="No. Whatsapp"
                value={whatsapp}
                onChangeText={setwhatsapp}
              />

              <InputTextSetting
                title="Email"
                value={email}
                onChangeText={setemail}
              />

              <InputTextSetting
                title="Pekerjaan"
                value={pekerjaan}
                onChangeText={setpekerjaan}
              />
              <InputTextSetting
                title="Instansi"
                value={instansi}
                onChangeText={setinstansi}
              />

              <CustomSelect
              title="Provinsi"
                onValueChange={itemValue => getKabupaten(itemValue)}
                selectedValue={serviceProvince}
                data={province_id}
                placeholder="Provinsi"
              />
              <CustomSelect
              title="Kabupaten"
                onValueChange={itemValue => getKecamatan(itemValue)}
                selectedValue={serviceKabupaten}
                data={regency_id}
                placeholder="Kabupaten"
              />
              <CustomSelect
              title="Kecamatan"
                onValueChange={itemValue => getDesa(itemValue)}
                selectedValue={serviceKecamatan}
                data={district_id}
                placeholder="Kecamatan"
              />
              <CustomSelect
              title="Desa"
                onValueChange={itemValue => setServiceDesa(itemValue)}
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
