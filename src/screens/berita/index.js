import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from '../../../config.json';
import Icon from 'react-native-vector-icons/FontAwesome5';
import URL from '../../../global.json';
import CustomHeaderBG from '../../components/CustomHeaderBG';
import { SkeletonBerita } from '../../components/CustomSkeleton';
import SearchField from '../../components/SearchField';
import Styles from '../../utils/Styles';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default function Berita({navigation}) {
  const [berita, setBerita] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false)
  let [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    getBerita();
    setRefreshing(false);
  };

  const getBerita = async () => {
    setLoading(true)
    let {data} = await axios.get(URL.baseURL + 'semua-berita', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setBerita(data.data);
    setLoading(false)
  };

  const config = {
    headers: {'Content-Type': 'multipart/form-data; '},
  };

  const getPencarianBerita = async e => {
    setLoading(true)
    setSearch(e);
    let formdata = new FormData();
    formdata.append('judul_berita', e);
    if (e.length >= 0) {
      let data = await axios.post(
        URL.baseURL + 'cari-berita',
        formdata,
        config,
      );
      let res = JSON.stringify(data.data.data);
      setBerita(JSON.parse(res));
      setLoading(false)
    }
  };

  useEffect(() => {
    getBerita();
    getPencarianBerita();
  }, []);

  function Kategori(kategori_berita) {
    let data;
    if (kategori_berita === 'BNPT') {
      data = '#EDFDFF';
    }
    if (kategori_berita === 'FKDM') {
      data = '#EDFDFF';
    }
    if (kategori_berita === 'Masyarakat') {
      data = '#EDFDFF';
    }
    if (kategori_berita === 'KIM') {
      data = '#EDFDFF';
    }
    if (kategori_berita === 'Kim') {
      data = '#EDFDFF';
    }
    return data;
  }

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG label="Berita" onPress={() => navigation.goBack()}>
          <SearchField
            label={'Cari Berdasarkan Judul'}
            fieldButtonLabel={<Icon name="search" size={23} />}
            fieldButtonFunction={() => {}}
            value={search}
            onChangeText={e => getPencarianBerita(e)}
          />
        </CustomHeaderBG>
        <ScrollView 
         vertical={true}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Config.themeColors.danger, Config.themeColors.primary]}
            />
          }
        >
          <SafeAreaView style={{flex: 1, paddingHorizontal: 25}}>
            <View
              style={{
                flexDirection: 'column',
                marginBottom: 20,
              }}>
              {berita ? (
                berita.map((row, index) => (
                  
                  loading ? <SkeletonBerita/> :
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('DetailBerita', {
                        key: index,
                        photo: row.thumbnail,
                        lampiran: row.lampiran,
                        title: row.judul,
                        kategori_berita: row.kategori_berita,
                        creator: row.creator,
                        dibuat_pada: row.dibuat_pada,
                        konten: row.konten,
                      });
                    }}
                    style={{
                      borderRadius: 9,
                      width: '100%',
                      height: 70,
                      flexDirection: 'row',
                      display: 'flex',
                      marginBottom: 18,
                    }}>
                    <Image
                      source={{uri: URL.urlFOTO + row.thumbnail}}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 16,
                        overflow: 'hidden',
                        resizeMode: 'cover',
                      }}
                    />
                    <View
                      style={{
                        marginLeft: 10,
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'flex-start',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          marginBottom: 1,
                          backgroundColor: Kategori(row.kategori_berita),
                          width: 75,
                          borderRadius: 20,
                          padding: 4,
                        }}>
                        <Text
                          style={[
                            Styles.textDefault,
                            {
                              fontSize: 13,
                              fontWeight: '500',
                            },
                          ]}>
                          {row.kategori_berita}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: 'black',
                          fontSize: 13,
                          width: 250,
                          fontWeight: '500',
                          marginTop: 2,
                          width: '100%',
                        }}>
                        {row.judul}
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
                ))
              ) : (
                <Text>Belum Ada Berita</Text>
              )}

              {berita.length == 0 &&  <SkeletonBerita/>}
              
            </View>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}
