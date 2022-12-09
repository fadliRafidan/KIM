import React, {Fragment, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform
} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/FontAwesome5';
import URL from '../../../global.json';
import CustomHeaderBG from '../../components/CustomHeaderBG';

import RNFetchBlob from 'rn-fetch-blob';

export default function DetailKepuskaan({navigation, route}) {
  const {itemId, judul, author, createdAt, file, link, type} = route.params;

console.log(type);
  let musik = URL.urlFOTO + file
  let  sound2;
  // let type = "gambar"

  useEffect(() => {
    Sound.setCategory('Playback', true); // true = mixWithOthers
    return () => {
      if (sound2) sound2.release();
    };
  }, []);

  const audioList = [
    {
      title: 'Play aac sound from remote URL',
      url:
      URL.urlFOTO + file,
    },
   
  ];


  const playSound = () => {
      sound2 = new Sound(musik, '', (error, _sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
        sound2.play(() => {
          sound2.release();
        });
      });
  };




  const fileUrl = musik

  const checkPermission = async () => {
    
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error','Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++"+err);
      }
    }
  };

  const downloadFile = () => {
   
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;    
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);
   
    file_ext = '.' + file_ext[0];
   
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir+
          '/file_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,   
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
             /[^.]+$/.exec(fileUrl) : undefined;
  };


  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG
          label="Media Kepustakaan"
          onPress={() => navigation.goBack()}
        />

        {type !== 'mp3' && (
          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
           
            <View style={{paddingHorizontal: 10}}>
              <Image
                source={{uri: URL.urlFOTO + file}}
                style={{
                  maxWidth: 500,
                  width: 300,
                  height: 250,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 15,
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  width: 280,
                  fontWeight: '500',
                  marginTop: 2,
                }}>
                {judul}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 2,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#767676',
                    fontSize: 12,
                    fontWeight: '500',
                    marginRight: 4,
                  }}>
                  {author}
                </Text>
                <Icon name="circle" size={6} />
                <Text
                  style={{
                    color: '#767676',
                    fontSize: 12,
                    fontWeight: '500',
                    marginLeft: 3,
                  }}>
                  {createdAt}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={checkPermission}
              style={{
                backgroundColor: '#01C3D5',
                paddingHorizontal: 20,
                paddingVertical: 10,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 30,
              }}>
              <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>
                Download
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {type == 'mp3' && (
          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{paddingHorizontal: 10, paddingVertical: 60}}>
              <Image source={require('../../assets/images/musik.png')} />
            </View>
            <TouchableOpacity onPress={playSound}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="play" size={30} color="white" />
            </View>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 15,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  width: 280,
                  fontWeight: '500',
                  marginTop: 2,
                  textAlign: 'center',
                }}>
                {judul}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 2,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#767676',
                    fontSize: 12,
                    fontWeight: '500',
                    marginRight: 4,
                  }}>
                  {author}
                </Text>
                <Icon name="circle" size={6} />
                <Text
                  style={{
                    color: '#767676',
                    fontSize: 12,
                    fontWeight: '500',
                    marginLeft: 3,
                  }}>
                  {createdAt}
                </Text>
              </View>
            </View>

            <TouchableOpacity
             onPress={checkPermission}
              style={{
                backgroundColor: '#01C3D5',
                paddingHorizontal: 20,
                paddingVertical: 10,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 30,
              }}>
              <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>
                Download
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </Fragment>
  );
}
