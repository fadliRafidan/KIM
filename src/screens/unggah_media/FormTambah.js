import axios from 'axios';
import { Center, CheckIcon, Select, useToast } from 'native-base';
import React, { Fragment, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import URL from '../../../global.json';
import CustomHeaderBG from '../../components/CustomHeaderBG';
import Loading from '../../components/Loading';
const {width} = Dimensions.get('window');

export default function FormTambahMedia({navigation, route}) {
  let {key} = route.params;
  console.log(key.link);
  let user = useSelector(state => state.AuthReducers.user);
  const [title, onChangeTitle] = useState(key.name || '');
  const [link, onChangeLink] = useState(key.id ? key.link :'');
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const [service, setService] = useState('');

  const toast = useToast();

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
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
if(title.length && link !== 0){
    setLoading(true);
    if(singleFile != null){
      const fileToUpload = singleFile; 
      const dokumen = {
        uri: fileToUpload[0].uri ,
        type: fileToUpload[0].type ,
        name: fileToUpload[0].name 
      }
    
      let formdata = new FormData();
      formdata.append('name', title);
      formdata.append('link', link );
      formdata.append('file', dokumen);
      formdata.append('creator', user.id);

        axios
        .post(URL.baseURL + 'tambah-media', formdata, config)
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
                      Media berhasil dibuat
                    </Text>
                    <Icon name="thumbs-up" size={20} />
                  </View>
                );
              },
              placement: 'top',
            });
            setSingleFile(null);
            onChangeTitle('');
            onChangeLink('')
            setService('')
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

    }else{
      let formdata = new FormData();
      formdata.append('name', title);
      formdata.append('link', link );
      formdata.append('creator', user.id);

        axios
        .post(URL.baseURL + 'tambah-media', formdata, config)
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
                      Media berhasil dibuat
                    </Text>
                    <Icon name="thumbs-up" size={20} />
                  </View>
                );
              },
              placement: 'top',
            });
            setSingleFile(null);
            onChangeTitle('');
            onChangeLink('')
            setService('')
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
}else{
  alert('Inputan tidak boleh kosong.');
}


  };



  const editMedia = async () => {
    setLoading(true)

    if (singleFile == null) {
      let formdata = new FormData();
      formdata.append('name', title);
      formdata.append('link', link );
      formdata.append('creator', user.id);

      axios
      .post(URL.baseURL+`ubah-media/${key.id}` ,formdata,config )
      .then((res) => {
        setLoading(false)
        if(res.status === 200) {
          console.log("post success ", res.status);
          setLoading(false)
          toast.show({
            render: () => {
              return <View  style={{backgroundColor:'#34ebde', padding:15, borderRadius:15, marginTop:50, flexDirection:'row'}}>
              <Text style={{fontSize:18, color:'#fff', fontWeight:'500', marginRight:4}}>
              Media berhasil diubah
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
          navigation.navigate('UnggahMedia')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  
    } 
    if (singleFile != null) {
      const fileToUpload = singleFile;
      const dokumen = {
        uri: fileToUpload[0].uri ,
        type: fileToUpload[0].type ,
        name: fileToUpload[0].name 
      }
      let formdata = new FormData();
      formdata.append('name', title);
      formdata.append('link', link );
      formdata.append('file', dokumen);
      formdata.append('creator', user.id);

      axios
      .post(URL.baseURL+`ubah-media/${key.id}` ,formdata,config )
      .then((res) => {
        setLoading(false)
        if(res.status === 200) {
          console.log("post success ", res.status);
          setLoading(false)
          toast.show({
            render: () => {
              return <View  style={{backgroundColor:'#34ebde', padding:15, borderRadius:15, marginTop:50, flexDirection:'row'}}>
              <Text style={{fontSize:18, color:'#fff', fontWeight:'500', marginRight:4}}>
              Media berhasil diubah
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
          navigation.navigate('UnggahMedia')
        }
      })
      .catch((err) => {
        console.log(err);

      });
  
  
    } 

    setLoading(false)

  };


  return (
    <Fragment>
      {loading ? <Loading /> : null}
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG
          label={key.id ? "Edit Media" : "Tambah Media"}
          onPress={() => navigation.goBack()}
        />
        <ScrollView style={{paddingHorizontal: 20, marginTop: 10}}>
          <View style={{paddingVertical: 10}}>
            <Center flex={1}>
              <View style={{width: '100%'}}>
                <Select
                  borderColor="#000"
                  borderWidth="0.5"
                  selectedValue={service}
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Tipe Media"
                  _selectedItem={{
                    bg: 'teal.600',
                    color: 'white',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={itemValue => setService(itemValue)}>
                  <Select.Item label="Dokumen, MP3, Gambar" value="dokumen" />
                  <Select.Item label="Youtube" value="youtube" />
                </Select>
              </View>
            </Center>
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
                onChangeText={onChangeTitle}
                value={title}
                placeholderTextColor="grey"
                placeholder="Judul"
                style={{flex: 1, paddingVertical: 0, color: 'black'}}
              />
            </View>
          </View>

          {service == 'dokumen' && (
            <View style={{paddingVertical: 10}}>
              <TouchableOpacity
                onPress={selectFile}
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
                {singleFile != null ? (
                  <Text style={{marginLeft: 5}}>{singleFile[0].name}</Text>
                ) : (
                  <Text style={{marginLeft: 5}}>Pilih File</Text>
                )}
                <MaterialIcons name="attachment" size={23} />
              </TouchableOpacity>
            </View>
          )}

          {service == 'youtube' && (
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
                  onChangeText={onChangeLink}
                  value={link}
                  placeholder="Link Youtube"
                  style={{flex: 1, paddingVertical: 0, color: 'black'}}
                />
              </View>
            </View>
          )}

          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 300,
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
              onPress={key.id ? editMedia : uploadImage}
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
              {key.id ? "Edit" : "Simpan"}
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
    width: '100%',
    height: 250,
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
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
    borderColor: '#000',
    borderWidth: 0.5,
  },
  dropdown1BtnTxtStyle: {color: '#000', textAlign: 'left', fontSize: 14},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF', borderRadius: 25},
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    borderRadius: 20,
  },
  dropdown1RowTxtStyle: {color: '#000', textAlign: 'center'},
});
