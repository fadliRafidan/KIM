import axios from 'axios';
import {Button, Modal} from 'native-base';
import React, {Fragment, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import URL from '../../../global.json';
import ButtonAdd from '../../assets/icons/Add.svg';
import CustomHeaderBG from '../../components/CustomHeaderBG';
import CustomSwitch from '../../components/CustomSwitch';
import ListItemKegiatan from './ListItemKegiatan';

export default function UnggahKegiatan({navigation}) {
  const [data, setData] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const [kegiatan, setKegiatan] = useState('');
  const [deletId, setDeleteId] = useState('');
  const [kegiatanVerifikasi, setKegiatanVerifikasi] = useState('');
  const [kegiatanBelumVerifikasi, setKegiatanBelumVerifikasi] = useState('');
  let user = useSelector(state => state.AuthReducers.user);
  const onSelectSwitch = value => {
    setData(value);
  };

  const getKegiatanUser = async () => {
    let {data} = await axios.get(
      URL.baseURL + `total-semua-kegiatan/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    setKegiatan(data);
  };

  const getKegiatanTerverifikasi = async () => {
    let {data} = await axios.get(
      URL.baseURL + `total-terverifikasi-kegiatan/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    setKegiatanVerifikasi(data);
  };

  const getKegiatanBelumTerverifikasi = async () => {
    let {data} = await axios.get(
      URL.baseURL + `total-belum-verifikasi-kegiatan/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    setKegiatanBelumVerifikasi(data);
  };

  useEffect(() => {
    getKegiatanUser();
    getKegiatanTerverifikasi();
    getKegiatanBelumTerverifikasi();
  }, []);

  const deletePost = async id => {
    setDeleteId(id);
    setModalVisible(!modalVisible);
  };
  const _hapusKegiatan = async () => {
    await axios.delete(URL.baseURL + `hapus-kegiatan/${deletId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    getKegiatanUser();
    getKegiatanTerverifikasi();
    getKegiatanBelumTerverifikasi();
    setModalVisible(false);
  };

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG label="Kegiatan" onPress={() => navigation.goBack()} />
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
                {kegiatan.total_semua_kegiatan}
              </Text>
              <Text style={{width: 50, textAlign: 'center', color: 'black'}}>
                Total Kegiatan
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
                {kegiatanVerifikasi.total_terverifikasi_kegiatan}
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
                {kegiatanBelumVerifikasi.total_belum_verifikasi_kegiatan}
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
            {data == 1 && (
              <FlatList
                data={kegiatanVerifikasi.data_terverifikasi_kegiatan}
                renderItem={({item}) => (
                  <ListItemKegiatan
                    key={item.id}
                    photo={item.thumbnail}
                    title={item.judul}
                    createdAt={item.dibuat_pada}
                    data={item}
                    navigation={navigation}
                    deletePost={() => deletePost(item.id)}
                  />
                )}
                numColumns={2}
                keyExtractor={item => item.id}
              />
            )}

            {data == 2 && (
              <FlatList
                data={kegiatanBelumVerifikasi.data_belum_verifikasi_kegiatan}
                renderItem={({item}) => (
                  <ListItemKegiatan
                    key={item.id}
                    photo={item.thumbnail}
                    title={item.judul}
                    createdAt={item.dibuat_pada}
                    data={item}
                    navigation={navigation}
                    deletePost={() => deletePost(item.id)}
                  />
                )}
                numColumns={2}
                keyExtractor={item => item.id}
              />
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FormTambahKegiatan', {
              key: '',
            })
          }
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 20,
            backgroundColor: 'transparent',
            position: 'absolute',
            top: '80%',
            right: 0,
          }}>
          <ButtonAdd />
        </TouchableOpacity>

        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          justifyContent="center"
          bottom="4"
          size="lg">
          <Modal.Content>
            <Modal.Header>
              Apakah anda yakin akan menghapus kegiatan ini?
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
              <Button colorScheme="error" flex="1" onPress={_hapusKegiatan}>
                Hapus
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    </Fragment>
  );
}
