import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
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
import {useDispatch, useSelector} from 'react-redux';
import URL from '../../../global.json';
import {LogoutAction} from '../../../store/actions';
import Arrow from '../../assets/icons/arrowleft.svg';
import CircleLeft from '../../assets/icons/circleprofil.svg';
import CircleRight from '../../assets/icons/circleright.svg';
import pngwing from '../../assets/icons/pngwing.png';
import Logo from '../../assets/logo/logoKIM.svg';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default function Profil({navigation}) {
  const [users, setUsers] = useState('');
  const [berita, setBerita] = useState('');
  const [kegiatan, setKegiatan] = useState('');
  let [refreshing, setRefreshing] = useState(false);

  let user = useSelector(state => state.AuthReducers.user);
  const dispatch = useDispatch();
  const _logoutAsync = () => {
    dispatch(LogoutAction());
  };

  const getUser = async () => {
    let {data} = await axios.get(
      URL.baseURL + `identitas-pengguna/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    setUsers(data.data);
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

  useEffect(() => {
    getUser();
    getKegiatanUser();
    getBeritaUser();
  }, [user.id]);

  const onRefresh = async () => {
    setRefreshing(true);
    getUser();
    getKegiatanUser();
    getBeritaUser();
    setRefreshing(false);
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="white" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
        <ScrollView
          vertical={true}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Config.themeColors.danger, Config.themeColors.primary]}
            />
          }>
          {/* HeaderDetail */}
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
                paddingTop: 20,
                paddingLeft: 10,
              }}>
              <Arrow />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: 'black',
                  marginLeft: 3,
                }}>
                Profil
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // paddingTop: 40,
                paddingRight: 15,
              }}>
              <Logo width={60} height={60} />
            </View>
          </View>

          <SafeAreaView style={{flex: 1, paddingHorizontal: 25, marginTop: 20}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
           
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    
                  }}>
                  <View style={{height:85, width:85, backgroundColor:'#019ACF', borderRadius:100, justifyContent:'center', alignItems:'center'}}>
                  <Image
                    source={users.foto_profile ? {
                      uri:
                        URL.urlFOTO + users.foto_profile 
                    } :
                        require('../../assets/icons/userr.png')}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 100,
                      resizeMode: 'cover',
                    }}
                  />
                  </View>

                  <View style={{marginLeft: 5, maxWidth: 200}}>
                    <Text style={{color: 'black', fontWeight: '600', textAlign:'center'}}>
                      #{users.id}
                    </Text>
                    <Text
                      style={{color: 'black', fontWeight: '600', fontSize: 16, textAlign:'center' }}>
                      {users.name?.toUpperCase()}
                    </Text>
                    <Text style={{color: 'black', fontWeight: '600', textAlign:'center'}}>
                      Kab. Sumedang
                    </Text>
                  </View>
                  <View style={{height:20, marginTop:10,width:50, justifyContent:'center', alignItems:'center', backgroundColor:'#EDFDFF', borderRadius:20}}>
                    <Text style={{color:'#01C3D5'}}>
                      KIM
                    </Text>
                  </View>
                </View>

              <View
                style={{
                  height: 100,
                  width: '100%',
                  backgroundColor: '#FAFAFA',
                  borderRadius: 20,
                  overflow: 'hidden',
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 40,
                }}>
                <View style={{position: 'absolute', top: -15, left: -20}}>
                  <CircleLeft />
                </View>
                <View style={{position: 'absolute', bottom: -30, right: -35}}>
                  <CircleRight />
                </View>

                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: '700', fontSize: 20}}>
                      {berita.total_semua_berita}
                    </Text>
                    <Text>Berita</Text>
                  </View>

                  <View
                    style={{
                      borderLeftWidth: 1.5,
                      marginHorizontal: 10,
                      borderLeftColor: '#E7E7E7',
                    }}
                  />

                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: '700', fontSize: 20}}>
                      {kegiatan.total_semua_kegiatan}
                    </Text>
                    <Text>Kegiatan</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('UnggahKegiatan')}
                style={{
                  height: 83,
                  width: '100%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    backgroundColor: '#EDFDFF',
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="bookmark" size={23} color="#01C3D5" />
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                      Kegiatan
                    </Text>
                  </View>
                  <Icon name="chevron-right" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('UnggahBerita')}
                style={{
                  width: '100%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#EDFDFF',
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="newspaper" size={23} color="#01C3D5" />
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                      Berita
                    </Text>
                  </View>
                  <Icon name="chevron-right" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('UnggahMedia')}
                style={{
                  height: 83,
                  width: '100%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#EDFDFF',
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="photo-video" size={23} color="#01C3D5" />
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                      Media
                    </Text>
                  </View>
                  <Icon name="chevron-right" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SettingProfil',{
                  key :users.id,
                  profinsiID: Number(users.province_id),
                  kabupatenID : Number(users.regency_id),
                  kecamatanID: Number(users.district_id),
                  desaID:Number(users.village_id),
                  data:users
                })}
                style={{
                  width: '100%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#EDFDFF',
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="cog" size={23} color="#01C3D5" />
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                      Pengaturan
                    </Text>
                  </View>
                  <Icon name="chevron-right" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('TentangAplikasi')}
                style={{
                  height: 83,
                  width: '100%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#EDFDFF',
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="info" size={23} color="#01C3D5" />
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                      Tentang Aplikasi
                    </Text>
                  </View>
                  <Icon name="chevron-right" />
                </View>
              </TouchableOpacity>

              {/* Logout */}
              <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                <TouchableOpacity
                  onPress={_logoutAsync}
                  style={{
                    height: 40,
                    width: 150,
                    borderRadius: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#01C3D5',
                    borderWidth: 2,
                  }}>
                  <Text style={{color: '#01C3D5', fontSize: 15, fontWeight: '600'}}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}
