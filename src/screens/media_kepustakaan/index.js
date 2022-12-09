import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import URL from '../../../global.json';
import CustomHeaderBG from '../../components/CustomHeaderBG';
import SearchField from '../../components/SearchField';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default function MediaKepustakaan({navigation}) {
  const [media, setMedia] = useState([]);
  const [search, setSearch] = useState('');

  const getMedia = async () => {
    let {data} = await axios.get(URL.baseURL + 'media-kepustakaan', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setMedia(data.data);
  };

  const config = {
    headers: {'Content-Type': 'multipart/form-data; '},
  };

  const getPencarianMedia = async e => {
    setSearch(e);
    let formdata = new FormData();
    formdata.append('nama_media', e);
    if (e.length >= 0) {
      let data = await axios.post(URL.baseURL + 'cari-media', formdata, config);
      let res = JSON.stringify(data.data.data);
      setMedia(JSON.parse(res));
    }
  };

  useEffect(() => {
    getMedia();
    getPencarianMedia();
  }, []);

  console.log(media);

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG
          label="Media Kepustakaan"
          onPress={() => navigation.goBack()}>
          <SearchField
            label={'Cari Berdasarkan Judul'}
            fieldButtonLabel={<Icon name="search" size={23} />}
            fieldButtonFunction={() => {}}
            value={search}
            onChangeText={e => getPencarianMedia(e)}
          />
        </CustomHeaderBG>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <SafeAreaView style={{flex: 1, paddingHorizontal: 25}}>
            {media
              ? media.map((row, keyrow) => (
                  <View
                    key={keyrow}
                    style={{
                      flexDirection: 'row',
                      marginBottom: 5,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('DetailKepuskaan', {
                          itemId: row.id,
                          type: row.tipe_file,
                          judul: row.name,
                          author: row.creator,
                          createdAt: row.createdAt,
                          file: row.file,
                          link: row.link
                        });
                      }}
                      style={{
                        borderRadius: 9,
                        width: '100%',
                        height: 70,
                        flexDirection: 'row',
                        display: 'flex',
                      }}>
                      {row.tipe_file == 'dokumen' && (
                        <View
                          style={{
                            backgroundColor: '#FFF4D9',
                            height: 50,
                            width: 50,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon name="file" size={25} color="#F2994A" />
                        </View>
                      )}
                      {row.tipe_file == 'mp3' && (
                        <View
                          style={{
                            backgroundColor: '#DEF7FF',
                            height: 50,
                            width: 50,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon name="music" size={25} color="#2395B9" />
                        </View>
                      )}
                      {row.tipe_file == 'link' && (
                        <View
                          style={{
                            backgroundColor: '#FFEBEB',
                            height: 50,
                            width: 50,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon name="youtube" size={25} color="red" />
                        </View>
                      )}
                      {row.tipe_file == 'gambar' && (
                        <View
                          style={{
                            backgroundColor: '#E9FFEA',
                            height: 50,
                            width: 50,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon name="image" size={25} color="#00752F" />
                        </View>
                      )}

                      <View
                        style={{
                          marginLeft: 10,
                          flexDirection: 'column',
                          flex: 1,
                          justifyContent: 'flex-start',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 13,
                            width: 250,
                            fontWeight: '500',
                            marginTop: 2,
                          }}>
                          {row.name}
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
                            {row.creator}
                          </Text>
                          <Icon name="circle" size={6} />
                          <Text
                            style={{
                              color: '#767676',
                              fontSize: 12,
                              fontWeight: '500',
                              marginLeft: 3,
                            }}>
                            {row.dibuat_pada}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              : null}
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}
