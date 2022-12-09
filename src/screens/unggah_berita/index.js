import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Modal} from 'native-base';
import {useSelector} from 'react-redux';
import URL from '../../../global.json';
import ButtonAdd from '../../assets/icons/Add.svg';
import CustomHeaderBG from '../../components/CustomHeaderBG';
import CustomSwitch from '../../components/CustomSwitch';
import ListItemBerita from './ListItemBerita';
export default function UnggahBerita({navigation}) {
  const [data, setData] = useState(1);
  const [Berita, setBerita] = useState('');
  const [deletId, setDeleteId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [BeritaVerifikasi, setBeritaVerifikasi] = useState('');
  const [BeritaBelumVerifikasi, setBeritaBelumVerifikasi] = useState('');
  let user = useSelector(state => state.AuthReducers.user);
  const onSelectSwitch = value => {
    setData(value);
  };

  const getBeritaUser = async () => {
    let {data} = await axios.get(
      URL.baseURL + `total-semua-berita/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    setBerita(data);
  };

  const getBeritaTerverifikasi = async () => {
    let {data} = await axios.get(
      URL.baseURL + `total-terverifikasi-berita/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    setBeritaVerifikasi(data);
  };

  const getBeritaBelumTerverifikasi = async () => {
    let {data} = await axios.get(
      URL.baseURL + `total-belum-verifikasi-berita/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    setBeritaBelumVerifikasi(data);
  };

  useEffect(() => {
    getBeritaUser();
    getBeritaTerverifikasi();
    getBeritaBelumTerverifikasi();
  }, [user.id]);

  const deletePost = async id => {
    setDeleteId(id);
    setModalVisible(!modalVisible);
  };

  const _hapusBerita = async () => {
    await axios.delete(URL.baseURL + `hapus-berita/${deletId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    getBeritaUser();
    getBeritaTerverifikasi();
    getBeritaBelumTerverifikasi();
    setModalVisible(false);
  };

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG label="Berita" onPress={() => navigation.goBack()} />
        <View style={{paddingHorizontal: 30, top: -35}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              width: '100%',
              backgroundColor: 'white',
              elevation: 5,
              width: '100%',
              borderRadius: 20,
              shadowOffset: {width: 1, height: 2},
              shadowOpacity: 10,
              shadowColor: 'rgba(0,0,0,0.5)',
              shadowRadius: 3,
            }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#01C3D5',
                  fontWeight: '700',
                  fontSize: 40,
                }}>
                {Berita.total_semua_berita}
              </Text>
              <Text style={{width: 50, textAlign: 'center', color: 'black'}}>
                Total Berita
              </Text>
            </View>
            <View
              style={{
                borderRightWidth: 1.5,
                marginHorizontal: 10,
                borderRightColor: '#E7E7E7',
              }}></View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#01C3D5',
                  fontWeight: '700',
                  fontSize: 40,
                }}>
                {BeritaVerifikasi.total_terverifikasi_berita}
              </Text>
              <Text style={{width: 60, textAlign: 'center', color: 'black'}}>
                Sudah diverifikasi
              </Text>
            </View>
            <View
              style={{
                borderRightWidth: 1.5,
                marginHorizontal: 10,
                borderRightColor: '#E7E7E7',
              }}></View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#01C3D5',
                  fontWeight: '700',
                  fontSize: 40,
                }}>
                {BeritaBelumVerifikasi.total_belum_verifikasi_berita}
              </Text>
              <Text style={{width: 60, textAlign: 'center', color: 'black'}}>
                Belum diverifikasi
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginBottom: 20, paddingHorizontal: 20, marginTop: 1}}>
          <CustomSwitch
            selectionMode={1}
            option1="Sudah"
            option2="Belum"
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 20}}>
            {data == 1 && BeritaVerifikasi.data_terverifikasi_berita
              ? BeritaVerifikasi.data_terverifikasi_berita.map(item => (
                  <ListItemBerita
                    key={item.id}
                    photo={item.thumbnail}
                    judul={item.judul}
                    author={item.creator}
                    createdAt={item.dibuat_pada}
                    kategori_berita={item.kategori_berita}
                    deletePost={() => deletePost(item.id)}
                    item={item}
                    navigation={navigation}
                  />
                ))
              : null}

            {data == 2 && BeritaBelumVerifikasi.data_belum_verifikasi_berita
              ? BeritaBelumVerifikasi.data_belum_verifikasi_berita.map(item => (
                  <ListItemBerita
                    key={item.id}
                    photo={item.thumbnail}
                    judul={item.judul}
                    author={item.creator}
                    createdAt={item.dibuat_pada}
                    kategori_berita={item.kategori_berita}
                    deletePost={() => deletePost(item.id)}
                    item={item}
                    navigation={navigation}
                  />
                ))
              : null}
          </View>
        </ScrollView>

        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          justifyContent="center"
          bottom="4"
          size="lg">
          <Modal.Content>
            <Modal.Header>
              Apakah anda yakin akan menghapus berita ini?
            </Modal.Header>
            <Modal.Body>
              <Button
                flex="1"
                marginBottom="3"
                onPress={() => {
                  setModalVisible(false);
                }}>
                Batal
              </Button>
              <Button colorScheme="error" flex="1" onPress={_hapusBerita}>
                Hapus
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    </Fragment>
  );
}
