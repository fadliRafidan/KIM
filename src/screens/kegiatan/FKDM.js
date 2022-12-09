import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import URL from '../../../global.json';
import CustomHeaderBG from '../../components/CustomHeaderBG';
import CustomSwitch from '../../components/CustomSwitch';
import ListItem from '../../components/ListItem';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default function FKDM({navigation}) {
  const [gamesTab, setGamesTab] = useState(1);

  const [kegiatan, setKegiatanMasyarakat] = useState('');
  const [kegiatanFKDM, setKegiatanFKDM] = useState('');

  const getKegiatanMasyarakat = async () => {
    let {data} = await axios.get(URL.baseURL + 'kegiatan-masyarakat', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setKegiatanMasyarakat(data.data);
  };

  const getKegiatanFKDM = async () => {
    let {data} = await axios.get(URL.baseURL + 'kegiatan-fkdm', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setKegiatanFKDM(data.data);
  };

  useEffect(() => {
    getKegiatanMasyarakat();
    getKegiatanFKDM();
  }, []);

  console.log(kegiatan);

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG label="Kegiatan" onPress={() => navigation.goBack()} />

        <View style={{marginBottom: 20, paddingHorizontal: 20}}>
          <CustomSwitch
            selectionMode={1}
            option1="Kegiatan FKDM"
            option2="Kegiatan Masyarakat"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 20}}>
            {gamesTab == 1 && (
              <FlatList
                data={kegiatanFKDM}
                renderItem={({item}) => (
                  <ListItem
                    key={item.id}
                    photo={item.thumbnail}
                    title={item.judul}
                    createdAt={item.dibuat_pada}
                    onPress={() => {
                      navigation.navigate('DetailKegiatan', {
                        key: item.id,
                        photo: item.thumbnail,
                        judul: item.judul,
                        dibuat_pada: item.dibuat_pada,
                        konten: item.konten,
                        lokasi: item.lokasi,
                        tanggal: item.tanggal,
                      });
                    }}
                  />
                )}
                numColumns={2}
                keyExtractor={item => item.id}
              />
            )}

            {gamesTab == 2 && (
              <FlatList
                data={kegiatan}
                renderItem={({item}) => (
                  <ListItem
                    key={item.id}
                    photo={item.thumbnail}
                    title={item.judul}
                    createdAt={item.dibuat_pada}
                    onPress={() => {
                      navigation.navigate('DetailKegiatan', {
                        key: item.id,
                        photo: item.thumbnail,
                        judul: item.judul,
                        dibuat_pada: item.dibuat_pada,
                        konten: item.konten,
                        lokasi: item.lokasi,
                        tanggal: item.tanggal,
                      });
                    }}
                  />
                )}
                numColumns={2}
                keyExtractor={item => item.id}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}
