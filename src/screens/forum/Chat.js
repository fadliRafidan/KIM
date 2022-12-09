import axios from 'axios';
import {View} from 'native-base';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import URL from '../../../global.json';
import Logo from '../../assets/logo/logoKIM.svg';
import DocumentPicker from 'react-native-document-picker';
export default function Chat({navigation, route}) {
  const {idForum, judul, anggota} = route.params;
  let user = useSelector(state => state.AuthReducers.user);

  const [messages, setMessages] = useState('');
  const [messagesTest, setMessagesTest] = useState('');
  const [pesan, setPesan] = useState('');
  const [pesanReady, setpesanReady] = useState(false);
  const [Getpesan, setGetpesan] = useState(false);
  const [singleFile, setSingleFile] = useState(null);

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


  const onChangeNameHandler = pesan => {
    setPesan(pesan);
  };

  const getBerita = async () => {
    let {data} = await axios.get(URL.baseURL + 'chat-forum/' + idForum, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setMessagesTest(data.data);
    setGetpesan(true);
  };

  useEffect(() => {
    getBerita();
  }, []);

  const config = {
    headers: {'Content-Type': 'multipart/form-data; '},
  };

  const _sendMessage = async () => {
    if(singleFile === null){
      if (pesan !== 0) {
        let formdata = new FormData();
        formdata.append('forum_id', idForum);
        formdata.append('content', pesan);
        formdata.append('creator', user.id);
        formdata.append('image', '');
        
        axios
        .post(URL.baseURL + 'tambah-chat-forum', formdata, config)
        .then(res => {
          if (res.status === 200) {
            console.log('post success ', res.status);
          }
        })
        .catch(err => {
          console.log(err);
        });
      } 
    }
    if(singleFile !== null){
      if (pesan !== 0) {
        let formdata = new FormData();
        const fileToUpload = singleFile;
        formdata.append('forum_id', idForum);
        formdata.append('content', pesan);
        formdata.append('creator', user.id);
        formdata.append('image', {
          uri: fileToUpload[0].uri,
          type: fileToUpload[0].type,
          name: fileToUpload[0].name,
        });
        
        axios
        .post(URL.baseURL + 'tambah-chat-forum', formdata, config)
        .then(res => {
          if (res.status === 200) {
            console.log('post success ', res.status);
    getBerita();
          }
        })
        .catch(err => {
          console.log(err);
        });
      } 
    }
  };

  const sendMessage = () => {
    setMessages(pesan);
    _sendMessage();
    setPesan('');
    setSingleFile(null)
    setpesanReady(false);
    getBerita();
  };

  const Example = row => {
    const EditUrlFoto = URL.urlFOTO + row.row.gambar;
    console.log(EditUrlFoto);
    if (row.row.id === user.id) {
      return (
        <View
          key={row.row.id}
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#FFDEDE',
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 20,
                maxWidth: 300,
                marginLeft: 10,
              }}>
              <Text style={{marginRight: 10, fontSize: 17, color: '#790707'}}>
                {row.row.creator}
              </Text>
              <Image
                      source={{uri: EditUrlFoto}}
                      style={row.row.gambar ? styles.adaGambar : styles.noGambar}
                    />
              <Text style={{marginRight: 10, fontSize: 16, color: 'black'}}>
                {row.row.pesan}
              </Text>
              <Text
                style={{
                  marginRight: 10,
                  color: '#8497AF',
                  fontSize: 12,
                  textAlign: 'right',
                }}>
                {row.row.dibuat_pada} {row.row.waktu}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    if (row.row.id !== user.id) {
      return (
        <View
          key={row.row.id}
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-start',
            marginBottom: 20,
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#FFDEDE',
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 20,
                maxWidth: 300,
                marginLeft: 10,
              }}>
              <Text style={{marginRight: 10, fontSize: 17, color: '#790707'}}>
                {row.row.creator}
              </Text>
                    <Image
                      source={{uri: EditUrlFoto}}
                      style={row.row.gambar ? styles.adaGambar : styles.noGambar}
                    />
              <Text style={{marginRight: 10, fontSize: 16, color: 'black'}}>
                {row.row.pesan}
              </Text>
              <Text
                style={{
                  marginRight: 10,
                  color: '#8497AF',
                  fontSize: 12,
                  textAlign: 'right',
                }}>
                {row.row.dibuat_pada} {row.row.waktu}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ImageBackground
          source={require('../../assets/images/bgtop.png')}
          style={{
            width: '100%',
            height: 200,
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'row',
            elevation: 4,
            zIndex: 4,
          }}>
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: 'black',
                  marginLeft: 3,
                }}>
                {judul}
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
        </ImageBackground>

        <View
          style={{
            flexDirection: 'row',
            paddingRight: 15,
            paddingTop: 100,
            position: 'absolute',
            elevation: 4,
            zIndex: 4,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'black',
              }}>
              Forum Tanya Jawab
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'black',
                marginLeft: 3,
                textAlign: 'center',
              }}>
              {judul}
            </Text>
            <Text>{anggota} Anggota</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}>
          <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingBottom: 10,
              }}>
              {Getpesan && messagesTest.map(row => <Example row={row} />)}
            </View>
          </ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: '#F7F8F8',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                borderColor: '#790707',
                borderWidth: 0.5,
              }}>
              <TouchableOpacity onPress={selectFile}>
                <MaterialIcons name="attachment" size={25} />
              </TouchableOpacity>


              {singleFile != null && (
                    <Image
                      source={{uri: singleFile[0].uri}}
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 100,
                        resizeMode: 'cover',
                      }}
                    />
                  ) }

                  {/* {singleFile == null && (
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
                  )} */}


              <TextInput
                value={pesan}
                onChangeText={onChangeNameHandler}
                placeholder="Write a message..."
                style={{flex: 1, paddingVertical: 0}}
              />

              <TouchableOpacity onPress={sendMessage}>
                <MaterialIcons name="send" size={25} color="#790707" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}


const styles = StyleSheet.create({
adaGambar:{
  height: 200,
  width: 170,
  borderRadius: 10,
  resizeMode: 'cover',
},
noGambar:{
  height: 0,
  width: 0,
}
})