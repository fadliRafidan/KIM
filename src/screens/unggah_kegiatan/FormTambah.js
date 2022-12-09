import axios from 'axios';
import {useToast} from 'native-base';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Image,
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
import CustomHeaderBG from '../../components/CustomHeaderBG';
import Loading from '../../components/Loading';

export default function FormTambahKegiatan({navigation, route}) {
  let {key} = route.params;
  let user = useSelector(state => state.AuthReducers.user);
console.log(key.id);
console.log(user.id);
  const EditUrlFoto = URL.urlFOTO + key.thumbnail;

  const [title, onChangeTitle] = useState(key.judul || '');
  const [tanggal, setTanggal] = useState(key.tanggal || null);
  const [loading, setLoading] = useState(false);
  const [lokasi, onChangeLokasi] = useState(key.lokasi || '');
  const [content, onChangeContent] = useState(key.konten || '');
  const [singleFile, setSingleFile] = useState(null);

  const toast = useToast();

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

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setTanggal(convertDate(date));
    hideDatePicker();
    Keyboard.dismiss();
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles,
        // DocumentPicker.types.images,
        // DocumentPicker.types.plainText,
        // DocumentPicker.types.audio,
        // DocumentPicker.types.pdf
      });

      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const config = {
    headers: {'Content-Type': 'multipart/form-data; '},
  };

  const uploadImage = async () => {
    setLoading(true);
    if (singleFile != null) {
      const fileToUpload = singleFile;
      let formdata = new FormData();
      formdata.append('title', title);
      formdata.append('date', tanggal);
      formdata.append('location', lokasi);
      formdata.append('content', content);
      formdata.append('thumbnail', {
        uri: fileToUpload[0].uri,
        type: fileToUpload[0].type,
        name: fileToUpload[0].name,
      });
      formdata.append('attachment', {
        uri: fileToUpload[0].uri,
        type: fileToUpload[0].type,
        name: fileToUpload[0].name,
      });

      formdata.append('creator', user.id);

      axios
        .post(URL.baseURL + 'tambah-kegiatan', formdata, config)
        .then(res => {
          if (res.status === 200) {
            console.log('post success ', res.status);
            setLoading(false);
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
                      Kegiatan berhasil dibuat
                    </Text>
                    <Icon name="thumbs-up" size={20} />
                  </View>
                );
              },
              placement: 'top',
            });

            // navigation.navigate('UnggahKegiatan');
            onChangeContent('');
            setTanggal(null);
            onChangeLokasi('');
            setSingleFile(null);
            onChangeTitle('');
          }
        })
        .catch(err => {
          console.log(err);
          toast.show({
            render: () => {
              return (
                <View
                  style={{
                    backgroundColor: '#b51105',
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
                    {err}
                  </Text>
                  <Icon name="window-close" size={20} />
                </View>
              );
            },
            placement: 'top',
          });
        });
    } 
   else{
    alert('Batal')
   }
  };
console.log(singleFile);
  const editKegiatan = async () => {
    setLoading(true)

    if (singleFile == null) {
      let formdata = new FormData();
      formdata.append('title', title);
      formdata.append('date', tanggal);
      formdata.append('location', lokasi);
      formdata.append('content', content);
      formdata.append('creator', user.id);

      axios
      .post(URL.baseURL+`ubah-kegiatan/${key.id}` ,formdata,config )
      .then((res) => {
        setLoading(false)
        if(res.status === 200) {
          console.log("post success ", res.status);
          setLoading(false)
          toast.show({
            render: () => {
              return <View  style={{backgroundColor:'#34ebde', padding:15, borderRadius:15, marginTop:50, flexDirection:'row'}}>
              <Text style={{fontSize:18, color:'#fff', fontWeight:'500', marginRight:4}}>
              Kegiatan berhasil diubah
              </Text>
              <Icon name="thumbs-up" size={20}/>
                    </View>;
            }
            ,
            placement: "top",
          });
          // onChangeContent('')
          // setTanggal(null)
          // onChangeLokasi('')
          // setSingleFile(null)
          // onChangeTitle('')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  
    } 
    if (singleFile != null) {
      const fileToUpload = singleFile;
      let formdata = new FormData();
      formdata.append('title', title);
      formdata.append('date', tanggal);
      formdata.append('location', lokasi);
      formdata.append('content', content);
      formdata.append('thumbnail', {
        uri: fileToUpload[0].uri,
        type: fileToUpload[0].type,
        name: fileToUpload[0].name,
      });
      formdata.append('attachment', {
        uri: fileToUpload[0].uri,
        type: fileToUpload[0].type,
        name: fileToUpload[0].name,
      });
      formdata.append('creator', user.id);
      axios
      .post(URL.baseURL+`ubah-kegiatan/${key.id}` ,formdata,config )
      .then((res) => {
        setLoading(false)
        if(res.status === 200) {
          console.log("post success ", res.status);
          setLoading(false)
          toast.show({
            render: () => {
              return <View  style={{backgroundColor:'#34ebde', padding:15, borderRadius:15, marginTop:50, flexDirection:'row'}}>
              <Text style={{fontSize:18, color:'#fff', fontWeight:'500', marginRight:4}}>
              Kegiatan berhasil diubah
              </Text>
              <Icon name="thumbs-up" size={20}/>
                    </View>;
            }
            ,
            placement: "top",
          });
          // onChangeContent('')
          // setTanggal(null)
          // onChangeLokasi('')
          // setSingleFile(null)
          // onChangeTitle('')
        }
      })
      .catch((err) => {
        console.log(err);

      });
  
  
    } else{
      setLoading(false)
      alert('Error')
    }

    setLoading(false)

  };

  return (
    <Fragment>
      {loading ? <Loading /> : null}
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG
          label={key.id ? 'Edit Kegiatan' : 'Tambah Kegiatan'}
          onPress={() => navigation.goBack()}
        />
        <ScrollView style={{paddingHorizontal: 20}}>
          <View style={{paddingVertical: 10}}>
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
                borderColor: '#000',
                borderWidth: 0.5,
              }}>
              <TextInput
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Judul Kegiatan"
                placeholderTextColor="grey"
                style={{flex: 1, paddingVertical: 0, color: 'black'}}
              />
            </View>
          </View>

          <View style={{paddingVertical: 10}}>
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
                  borderColor: '#000',
                  borderWidth: 0.5,
                }}>
                <Text>{tanggal ? tanggal : 'Tanggal'}</Text>
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
          <View style={{paddingVertical: 10}}>
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
                borderColor: '#000',
                borderWidth: 0.5,
              }}>
              <TextInput
                onChangeText={onChangeLokasi}
                placeholderTextColor="grey"
                value={lokasi}
                placeholder="Lokasi Kegiatan"
                style={{flex: 1, paddingVertical: 0, color: 'black'}}
              />
            </View>
          </View>
          <View style={{paddingVertical: 10}}>
            <View style={styles.textAreaContainer}>
              <TextInput
                onChangeText={onChangeContent}
                value={content}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={10}
                maxLength={2000}
                multiline={true}
                style={{
                  textAlignVertical: 'top',
                  flex: 1,
                  paddingVertical: 10,
                  paddingLeft: 13,
                  color:'#000'
                }}
              />
            </View>
          </View>

          <View style={{paddingVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 7,
                paddingHorizontal: 7,
                backgroundColor: 'white',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                borderColor: '#000',
                borderWidth: 0.5,
              }}>
              <View style={styles.container}>
                {singleFile != null ? (
                  <Image
                    source={{uri: singleFile[0].uri}}
                    style={styles.imageStyle}
                  />
                ) : null}

<Text>
                {singleFile ==null && (
                  <Image
                    source={{uri: EditUrlFoto}}
                    style={key ? styles.imageStyle : styles.imageStyleNone }
                  />
                ) }
</Text>

                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={selectFile}>
                  <Icon name="camera" size={23} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
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
              onPress={key.id ? editKegiatan : uploadImage}
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
              <Text style={{color: 'white', fontSize: 15, fontWeight: '600'}}>
                {key.id ? 'Edit' : 'Simpan'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },

  imageStyle: {
    width: 340,
    height: 250,
    borderRadius: 10,
  },
  imageStyleNone: {
    width: 0,
    height: 0,
    borderRadius: 10,
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#DDDDDD',
    color: '#FFFFFF',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    width: 100,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
    color: '#000',
  },
  textAreaContainer: {
    borderColor: '#000',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 11,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
});
