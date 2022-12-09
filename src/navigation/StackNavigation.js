import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonAdd from '../assets/icons/buttonmenu.svg';
const Tab = createBottomTabNavigator();

import {
  ActivityIndicator,
  Dimensions, Pressable, StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Init } from '../../store/actions';
import {
  Home, LoginScreen, OtpScreen, RegisterScreen,
  RegisterSuccess, UserScreen, VerifikasiSuccess
} from '../screens';
import Berita from '../screens/berita';
import DetailBerita from '../screens/berita/DetailBerita';
import Forum from '../screens/forum';
import Chat from '../screens/forum/Chat';
import DetailKegiatan from '../screens/kegiatan/DetailKegiatan';
import FKDM from '../screens/kegiatan/FKDM';
import Masyarakat from '../screens/kegiatan/Masyarakat';
import MediaKepustakaan from '../screens/media_kepustakaan';
import DetailKepuskaan from '../screens/media_kepustakaan/DetailKepuskaan';
import Notifikasi from '../screens/notifikasi';
import Profil from '../screens/profile';
import Setting from '../screens/setting';
import Survei from '../screens/survei';
import IsiSurvei from '../screens/survei/IsiSurvey';
import SurveyBerhasil from '../screens/survei/SurveyBerhasil';
import TentangAplikasi from '../screens/tentang_aplikasi';
import UnggahBerita from '../screens/unggah_berita';
import FormTambahBerita from '../screens/unggah_berita/FormTambah';
import UnggahKegiatan from '../screens/unggah_kegiatan';
import FormTambahKegiatan from '../screens/unggah_kegiatan/FormTambah';
import UnggahMedia from '../screens/unggah_media';
import FormTambahMedia from '../screens/unggah_media/FormTambah';
import Styles from '../utils/Styles';
import GantiPassword from '../screens/setting/GantiPassword';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const Stack = createNativeStackNavigator();

const options = {
  gestureEnabled: true,
  headerShown: false,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 300 } },
    close: { animation: 'timing', config: { duration: 300 } },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      }
    }
  }
}


const MyStack  = () =>{
  return (
  <Stack.Navigator initialRouteName="Home" >
 


    <Stack.Screen
      name="Home"
      component={HomeNavigationTabs}
      options={{headerShown: false}}
    />

    {/* Berita */}

    <Stack.Screen
      name="Berita"
      component={Berita}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="DetailBerita"
      component={DetailBerita}
      options={options}
    />

    {/* Kegiatan */}
    <Stack.Screen name="FKDM" component={FKDM} options={{headerShown: false}} />
    <Stack.Screen
      name="Masyarakat"
      component={Masyarakat}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="DetailKegiatan"
      component={DetailKegiatan}
      options={{headerShown: false}}
    />

    {/* Forum */}
    <Stack.Screen
      name="Forum"
      component={Forum}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}} />

    {/* Survei */}
    <Stack.Screen
      name="Survei"
      component={Survei}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="IsiSurvei"
      component={IsiSurvei}
      options={{headerShown: false}}
    />
   
    <Stack.Screen
      name="SurveyBerhasil"
      component={SurveyBerhasil}
      options={{headerShown: false}}
    />

    {/* Profile */}
    <Stack.Screen
      name="Profil"
      component={Profil}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SettingProfil"
      component={Setting}
      options={{headerShown: false}}
    />

    {/* Notifikasi */}
    <Stack.Screen
      name="Notifikasi"
      component={Notifikasi}
      options={{headerShown: false}}
    />

    {/* TentangAplikasi */}
    <Stack.Screen
      name="TentangAplikasi"
      component={TentangAplikasi}
      options={{headerShown: false}}
    />

    {/* Media Kepustakaan */}
    <Stack.Screen
      name="MediaKepustakaan"
      component={MediaKepustakaan}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="DetailKepuskaan"
      component={DetailKepuskaan}
      options={{headerShown: false}}
    />

    {/* Media Kepustakaan */}

    {/* Tambah Kegiatan */}
    <Stack.Screen
      name="UnggahKegiatan"
      component={UnggahKegiatan}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="FormTambahKegiatan"
      component={FormTambahKegiatan}
      options={{headerShown: false}}
    />

    {/* Tambah Berita */}
    <Stack.Screen
      name="UnggahBerita"
      component={UnggahBerita}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="FormTambahBerita"
      component={FormTambahBerita}
      options={{headerShown: false}}
    />

    {/* Tambah Media */}

    <Stack.Screen
      name="UnggahMedia"
      component={UnggahMedia}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="FormTambahMedia"
      component={FormTambahMedia}
      options={{headerShown: false}}
    />



    <Stack.Screen
      name="GantiPassword"
      component={GantiPassword}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
)}


const AuthStack = () => {
  return (
    <Stack.Navigator >
   <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="RegisterSuccess"
      component={RegisterSuccess}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="OtpScreen"
      component={OtpScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="VerifikasiSuccess"
      component={VerifikasiSuccess}
      options={{headerShown: false}}
    />
    </Stack.Navigator>
  )
}

export default RootNavigation = () => {
  const token = useSelector(state => state.AuthReducers.token);


  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
  }

  useEffect(() => {
    init()
  }, [])

  // if (loading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center'}}>
  //       <ActivityIndicator size="large" color="#790707" />
  //     </View>
  //   )
  // }
  
  return (
    <>
      {
        token === null ?
          <AuthStack /> : <MyStack />
      }
    </>
  )
}


export function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export function UsersNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profil" component={Profil} />
    </Stack.Navigator>
  );
}

export function BeritaNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  );
}

export function HomeNavigationTabs({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const DisabledTabBarButton = ({ style, ...props }) => (
    <Pressable disabled style={[{ opacity: 1 }, style]} {...props} />
  )
  const MenuList = () => (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        padding: 16,
        position: 'relative',
        zIndex: 30,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
      }}>
      <View
        style={{
          position: 'relative',
          backgroundColor: '#019ACF',
          top: 10,
          height: 5,
          width: 25,
          position: 'absolute',
          left: viewportWidth / 2 - 12.5,
          borderRadius: 12.5,
        }}></View>
      <Text
        style={[
          {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '700',
            paddingVertical: 20,
          },
          Styles.textDefault,
        ]}>
        Tambah / Unggah Data
      </Text>
      <View
        style={{
          borderTopColor: '#F3F3F3',
          borderTopWidth: 1,
          marginTop: 5,
        }}></View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'column',
          paddingVertical: 20,
        }}>
        <TouchableOpacity
          onPress={() => {navigation.navigate('FormTambahBerita', {
            key:''
          }),setModalVisible(false)}}
          style={{
            height: 53,
            width: '100%',
            shadowOffset: {width: 1, height: 2},
            shadowOpacity: 10,
            shadowColor: 'rgba(0,0,0,0.5)',
            elevation: 2,
            shadowRadius: 3,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            marginTop: 15,
          }}>
          <View
            style={[
              Styles.bgDefault,
              {
                height: 20,
                width: 20,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}></View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 10,
              alignItems: 'center',
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                Unggah Berita / Artikel
              </Text>
            </View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {navigation.navigate('FormTambahKegiatan',{
            key:''
          }),setModalVisible(false)}}
          style={{
            height: 53,
            width: '100%',
            shadowOffset: {width: 1, height: 2},
            shadowOpacity: 10,
            shadowColor: 'rgba(0,0,0,0.5)',
            elevation: 2,
            shadowRadius: 3,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            marginTop: 15,
          }}>
          <View
            style={[
              Styles.bgDefault,
              {
                height: 20,
                width: 20,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}></View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 10,
              alignItems: 'center',
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                Unggah Kegiatan Masyarakat
              </Text>
            </View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {navigation.navigate('FormTambahMedia',{
            key:''
          }),setModalVisible(false)}}
          style={{
            height: 53,
            width: '100%',
            shadowOffset: {width: 1, height: 2},
            shadowOpacity: 10,
            shadowColor: 'rgba(0,0,0,0.5)',
            elevation: 2,
            shadowRadius: 3,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            marginTop: 15,
          }}>
          <View
            style={[
              Styles.bgDefault,
              {
                height: 20,
                width: 20,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}></View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 10,
              alignItems: 'center',
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                Unggah Media Pustaka
              </Text>
            </View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: {height: 50},
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Icon
                name="home"
                size={24}
                color={focused ? '#019ACF' : '#ADA4A5'}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="BeritaTab"
        
        component={BeritaNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <ButtonAdd />
              </TouchableOpacity>
              <Modal
                animationIn={'bounceInUp'}
                animationInTiming={800}
                style={{margin: 0, justifyContent: 'flex-end'}}
                isVisible={isModalVisible}
                onSwipeComplete={() => {
                  setModalVisible(false);
                }}
                onBackdropPress={() => {
                  setModalVisible(false);
                }}
                onBackButtonPress={() => {
                  setModalVisible(false);
                }}
                useNativeDriverForBackdrop
                backdropColor="black"
                backdropOpacity={0.2}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={300}
                >
                <View style={{maxHeight: '100%'}}>
                  <MenuList />
                </View>
              </Modal>
            </View>
          ),
          tabBarButton: DisabledTabBarButton,
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={UsersNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Icon
                name="user"
                size={24}
                color={focused ? '#019ACF' : '#ADA4A5'}
              />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
