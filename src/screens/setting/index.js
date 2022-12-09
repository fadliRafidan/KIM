import axios from 'axios';
import {CheckIcon, Select, useToast} from 'native-base';
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
import Loading from '../../components/Loading';

const {width} = Dimensions.get('window');
const config = {
  headers: {
    'Content-Type': 'multipart/form-data;',
    Accept: 'application/json',
  },
};

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

const Dialog = () => {
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
        Bio berhasil di Update
      </Text>
      <Icon name="check" size={20} />
    </View>
  );
};

const DialogGagal = () => {
  return (
    <View
      style={{
        backgroundColor: 'red',
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
        Isikan Provinsi, Kabupaten, Kecamatan, Desa
      </Text>
      <Icon name="exclamation-circle" size={20} />
    </View>
  );
};
const DialogGagalAlamat = () => {
  return (
    <View
      style={{
        backgroundColor: 'red',
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
       Isikan Provinsi, Kabupaten, Kecamatan, Desa
      </Text>
      <Icon name="exclamation-circle" size={20} />
    </View>
  );
};

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

export default function Setting({navigation, route}) {
  let {profinsiID, kabupatenID, kecamatanID, desaID, data} = route.params;
  let user = useSelector(state => state.AuthReducers.user);
  const toast = useToast();

  const [loading, setLoading] = useState(false);


  const [foto_profile, setfoto_profile] = useState(data.foto_profile);
  const [tanggal, setTanggal] = useState(data.tanggal_lahir);
  const [name, setName] = useState(data.name);
  const [whatsapp, setwhatsapp] = useState(data.whatsapp);
  const [email, setemail] = useState(data.email);
  const [agama, setAgama] = useState(data.agama);
  const [organisasi, setOrganisasi] = useState(data.level_organisasi);
  const [namaOrganisasi, setNamaOrganisasi] = useState(data.nama_organisasi);
  const [pekerjaan, setpekerjaan] = useState(data.pekerjaan);
  const [tanggal_lahir, settanggal_lahir] = useState(null);
  const [tingkat_pendidikan, settingkat_pendidikan] = useState(
    data.tingkat_pendidikan,
  );
  const [NIK, setNIK] = useState(data.nik);
  const [instansi, setinstansi] = useState(data.instansi);
  const [tingkat_pendapatan, settingkat_pendapatan] = useState(
    data.tingkat_pendapatan,
  );
  const [singleFile, setSingleFile] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [province_id, setprovince_id] = useState('');
  const [regency_id, setregency_id] = useState('');
  const [district_id, setdistrict_id] = useState('');
  const [village_id, setvillage_id] = useState('');

  const [serviceProvince, setServiceProvince] = useState(profinsiID);
  const [serviceKabupaten, setServiceKabupaten] = useState(kabupatenID);
  const [serviceKecamatan, setServiceKecamatan] = useState(kecamatanID);
  const [serviceDesa, setServiceDesa] = useState(desaID);
  const [desa, setDesa] = useState('');

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

  const getProvinsi = async () => {
    let {data} = await axios.post(URL.baseURL + 'provinsi', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setprovince_id(data.provinsi);
  };

  const getKabupaten = async itemValue => {
    let dataTest = {
      id_provinsi: itemValue ? itemValue : serviceProvince,
    };
    let {data} = await axios.post(URL.baseURL + 'kabupaten', dataTest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setregency_id(data.kabupaten);
  };

  const getKecamatan = async itemValue => {
    let dataTest = {
      id_kabupaten: itemValue ? itemValue : serviceKabupaten,
    };
    let {data} = await axios.post(URL.baseURL + 'kecamatan', dataTest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setdistrict_id(data.kecamatan);
  };

  const getDesa = async itemValue => {
    let dataTest = {
      id_kecamatan: itemValue ? itemValue : serviceKecamatan,
    };
    let {data} = await axios.post(URL.baseURL + 'desa', dataTest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setvillage_id(data.desa);
  };

  const updateUser = () => {
    setLoading(true)
    if (singleFile == null) {
      let formdata = new FormData();
      formdata.append('province_id', serviceProvince);
      formdata.append('regency_id', serviceKabupaten);
      formdata.append('district_id', serviceKecamatan);
      formdata.append('village_id', desa || serviceDesa);

      formdata.append('name', name);
      formdata.append('whatsapp', whatsapp);
      formdata.append('email', email);
      formdata.append('instansi', instansi);
      formdata.append('pekerjaan', pekerjaan);
      formdata.append('agama', agama);
      formdata.append('tanggal_lahir', tanggal);
      formdata.append('tingkat_pendidikan', tingkat_pendidikan);
      formdata.append('tingkat_pendapatan', tingkat_pendapatan);
      formdata.append('level_organisasi', organisasi);
      formdata.append('nama_organisasi', namaOrganisasi);
      formdata.append('nik', NIK);

      console.log(formdata);

      axios
        .post(URL.baseURL + `ubah-pengguna/${user.id}`, formdata, config)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setLoading(false)
            console.log('post success ', res.status);
            toast.show({
              render: () => {
                return <Dialog />;
              },
              placement: 'top',
            });
            navigation.navigate('Profil')
          }
        })
        .catch(err => {
          setLoading(false)
          console.log(err);
          toast.show({
            render: () => {
              return <DialogGagal />;
            },
            placement: 'top',
          });
        });
    }
    if (singleFile !== null) {
      setLoading(true)
      let formdata = new FormData();
      const fileToUpload = singleFile;
      console.log(fileToUpload);
      formdata.append('foto_profile', {
        uri: fileToUpload[0].uri,
        type: fileToUpload[0].type,
        name: fileToUpload[0].name,
      });
      formdata.append('province_id', serviceProvince);
      formdata.append('regency_id', serviceKabupaten);
      formdata.append('district_id', serviceKecamatan);
      formdata.append('village_id', desa || serviceDesa);

      formdata.append('name', name || '');
      formdata.append('whatsapp', whatsapp );
      formdata.append('email', email || '');
      formdata.append('instansi', instansi || '');
      formdata.append('pekerjaan', pekerjaan) || '';
      formdata.append('agama', agama || '');
      formdata.append('tanggal_lahir', tanggal || '');
      formdata.append('tingkat_pendidikan', tingkat_pendidikan || '');
      formdata.append('tingkat_pendapatan', tingkat_pendapatan || '');
      formdata.append('level_organisasi', organisasi || '');
      formdata.append('nama_organisasi', namaOrganisasi || '');
      formdata.append('nik', NIK || '');

      axios
        .post(URL.baseURL + `ubah-pengguna/${user.id}`, formdata, config)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
        setLoading(false)

            console.log('post success ', res.status);
            toast.show({
              render: () => {
                return <Dialog />;
              },
              placement: 'top',
            });
            navigation.navigate('Profil')
          }else{
        setLoading(false)

            toast.show({
              render: () => {
                return <DialogGagalAlamat />;
              },
              placement: 'top',
            });
          }
        })
        .catch(err => {
          console.log(err);
        setLoading(false)

          toast.show({
            render: () => {
              return <DialogGagal />;
            },
            placement: 'top',
          });
        });
    }
  };

  useEffect(() => {
    getProvinsi();
    getKabupaten();
    getKecamatan();
    getDesa();
  }, []);

  return (
    <Fragment>
      <StatusBar backgroundColor="white" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading ?  <Loading/> : null}
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
           
         
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    position:'relative'
                  }}>
                  <TouchableOpacity
                    style={{left: 10, zIndex: 4 , position:'absolute', top:20}}
                    activeOpacity={0.5}
                    onPress={selectFile}>
                    <Icon name="camera" size={23} color="#07D8F4" />
                  </TouchableOpacity>
                  <View style={{height:85, width:85, backgroundColor:'#019ACF', borderRadius:100, justifyContent:'center', alignItems:'center'}}>
                  {singleFile != null ? (
                    <Image
                      source={{uri: singleFile[0].uri}}
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 100,
                        resizeMode: 'cover',
                      }}
                    />
                  ) : null}

                  {singleFile == null && (
                    <Image
                      source={foto_profile ? {
                      uri:
                        URL.urlFOTO + foto_profile
                    } :
                        require('../../assets/icons/userr.png')}
                    
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 100,
                        resizeMode: 'cover',
                      }}
                    />
                  )}
                  </View>

                  <View style={{marginLeft: 5, maxWidth: 150}}>
                    <Text style={{color: 'black', fontWeight: '600', textAlign:'center'}}>
                      #{data.id}
                    </Text>
                    <Text
                      style={{color: 'black', fontWeight: '600', fontSize: 18, textAlign:'center'}}>
                      {data.name.toUpperCase()}
                    </Text>
                    <Text style={{color: 'black', fontWeight: '600', textAlign:'center'}}>
                     {data.regency_name}
                    </Text>
                  </View>
                </View>

              <InputTextSetting
                title="Nama Lengkap"
                value={name}
                onChangeText={setName}
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

              <InputTextSetting title="Nik" value={NIK} onChangeText={setNIK} />

              <View style={{paddingVertical: 10}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: 'black',
                    marginLeft: 5,
                    marginBottom: 7,
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
              title="Agama"
                onValueChange={itemValue => setAgama(itemValue)}
                selectedValue={agama}
                data={status_agama}
                placeholder="Agama"
              />

              <CustomSelect
              req="*"
                title="Provinsi"
                onValueChange={itemValue => {
                  getKabupaten(itemValue), setServiceProvince(itemValue);
                }}
                selectedValue={serviceProvince}
                data={province_id}
                placeholder="Provinsi"
              />
              <CustomSelect
              req="*"
                title="Kabupaten"
                onValueChange={itemValue => {
                  getKecamatan(itemValue), setServiceKabupaten(itemValue);
                }}
                selectedValue={serviceKabupaten}
                data={regency_id}
                placeholder="Kabupaten"
              />
              <CustomSelect
              req="*"
                title="Kecamatan"
                onValueChange={itemValue => {
                  getDesa(itemValue), setServiceKecamatan(itemValue);
                }}
                selectedValue={serviceKecamatan}
                data={district_id}
                placeholder="Kecamatan"
              />
              <CustomSelect
              req="*"
                title="Desa"
                onValueChange={itemValue => {
                  setDesa(itemValue), setServiceDesa(itemValue);
                }}
                selectedValue={serviceDesa}
                data={village_id}
                placeholder="Desa"
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

              <View style={{paddingVertical: 10}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('GantiPassword')}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      color: '#07D8F4',
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
                  onPress={() => navigation.goBack()}
                  style={{
                    height: 40,
                    width: 120,
                    borderRadius: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#07D8F4',
                    borderWidth: 2,
                  }}>
                  <Text style={{color: '#07D8F4', fontSize: 15, fontWeight: '600'}}>
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
                    borderColor: '#07D8F4',
                    borderWidth: 2,
                    marginLeft: 10,
                    backgroundColor: '#07D8F4',
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

