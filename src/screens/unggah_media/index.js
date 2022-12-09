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
import ButtonAdd from '../../assets/icons/Add.svg';
import CustomHeaderBG from '../../components/CustomHeaderBG';
import CustomSwitch from '../../components/CustomSwitch';
import ListItemMedia from './ListItemMedia';
import URL from '../../../global.json';

export default function UnggahMedia({navigation}) {
  const [data, setData] = useState(1);
  const [Media, setMedia] = useState('');
  const [deletId, setDeleteId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [MediaVerifikasi, setMediaVerifikasi] = useState('');
  const [MediaBelumVerifikasi, setMediaBelumVerifikasi] = useState('');
  let user = useSelector(state => state.AuthReducers.user);
  const onSelectSwitch = value => {
    setData(value);
  };

  const getMediaUser = async () => {
    let {data} = await axios.get(URL.baseURL + `total-semua-media/${user.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setMedia(data);
  };

  const getMediaTerverifikasi = async () => {
    let {data} = await axios.get(
      URL.baseURL + `total-terverifikasi-media/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    setMediaVerifikasi(data);
  };

  const getMediaBelumTerverifikasi = async () => {
    let {data} = await axios.get(
      URL.baseURL + `total-belum-verifikasi-media/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    setMediaBelumVerifikasi(data);
  };

  useEffect(() => {
    getMediaUser();
    getMediaTerverifikasi();
    getMediaBelumTerverifikasi();
  }, [user.id]);

  const deletePost = async id => {
    setDeleteId(id);
    setModalVisible(!modalVisible);
  };

  const _hapusBerita = async () => {
    await axios.delete(URL.baseURL + `hapus-media/${deletId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    getMediaUser();
    getMediaTerverifikasi();
    getMediaBelumTerverifikasi();
    setModalVisible(false);
  };

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG label="Media" onPress={() => navigation.goBack()} />
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
                {Media.total_semua_media}
              </Text>
              <Text style={{width: 50, textAlign: 'center', color: 'black'}}>
                Total Media
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
                {MediaVerifikasi.total_terverifikasi_media}
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
                {MediaBelumVerifikasi.total_belum_verifikasi_media}
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
            {data == 1 && MediaVerifikasi.data_terverifikasi_media
              ? MediaVerifikasi.data_terverifikasi_media.map(item => (
                  <ListItemMedia
                    key={item.id}
                    photo={item.file}
                    type={item.tipe_file}
                    judul={item.name}
                    author={item.creator}
                    createdAt={item.dibuat_pada}
                    deletePost={() => deletePost(item.id)}
                    item={item}
                    navigation={navigation}
                  />
                ))
              : null}

            {data == 2 && MediaBelumVerifikasi.data_belum_verifikasi_media
              ? MediaBelumVerifikasi.data_belum_verifikasi_media.map(item => (
                  <ListItemMedia
                    key={item.id}
                    photo={item.file}
                    type={item.tipe_file}
                    judul={item.name}
                    author={item.creator}
                    createdAt={item.dibuat_pada}
                    deletePost={() => deletePost(item.id)}
                    item={item}
                    navigation={navigation}
                  />
                ))
              : null}
          </View>
        </ScrollView>
        {/* <TouchableOpacity onPress={()=>navigation.navigate('FormTambahMedia')} style={{justifyContent:'flex-end', alignItems:'flex-end', padding:20, backgroundColor:'transparent', position:'absolute', top:'80%', right:0}}>
   <ButtonAdd/>
</TouchableOpacity> */}

        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          justifyContent="center"
          bottom="4"
          size="lg">
          <Modal.Content>
            <Modal.Header>
              Apakah anda yakin akan menghapus media ini?
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
