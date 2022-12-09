import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import Config from '../../../config.json';
import URL from '../../../global.json';
import Bell from '../../assets/icons/Bell-Icon.svg';
import Logo from '../../assets/logo/logoKIM.svg';
import BannerSlider from '../../components/BannerSlider';

import BeritaHome from '../../components/BeritaHome';
import {SkeletonBanner} from '../../components/CustomSkeleton';
import KegiatanFkdmHome from '../../components/KegiatanFkdmHome';
import LayananHome from '../../components/LayananHome';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const TAB_BAR_HEIGHT = 49;

export default function Home({navigation}) {
  const [carousel, setCarousel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingBerita, setLoadingBerita] = useState(false);
  const [loadingKegiatan, setLoadingKegiatan] = useState(false);
  const [banner, setBanner] = useState('');
  const [berita, setBerita] = useState('');
  const [notifikasi, setNotifikasi] = useState('');
  const [kegiatanFKDM, setKegiatanFKDM] = useState('');
  let [refreshing, setRefreshing] = useState(false);
  let user = useSelector(state => state.AuthReducers.user);

  const onRefresh = async () => {
    setRefreshing(true);
    getBanner();
    getBerita();
    getKegiatanFKDM();
    getNotifikasi();
    setRefreshing(false);
  };
  const getNotifikasi = async () => {
    let {data} = await axios.get(URL.baseURL + 'notification/' + user.id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setNotifikasi(data.data);
  };
  const getBanner = async () => {
    setLoading(true);
    let {data} = await axios.get(URL.baseURL + 'banner', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setLoading(false);
    setBanner(data.data);
  };

  const getBerita = async () => {
    setLoadingBerita(true);
    let {data} = await axios.get(URL.baseURL + 'berita-bnpt', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setLoadingBerita(false);
    setBerita(data.data);
  };

  const getKegiatanFKDM = async () => {
    setLoadingKegiatan(true);
    let {data} = await axios.get(URL.baseURL + 'kegiatan-fkdm', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setLoadingKegiatan(false);
    setKegiatanFKDM(data.data);
  };

  useEffect(() => {
    getBanner();
    getBerita();
    getKegiatanFKDM();
    getNotifikasi();
  }, []);

  const renderBanner = ({item, index}) => {
    return loading ? (
      <SkeletonBanner />
    ) : (
      <BannerSlider key={index} data={item} />
    );
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="white" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: 15,
        }}>
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
          <View
            style={{
              paddingHorizontal: 1,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              alignItems: 'center',
            }}>
            <Logo width={60} height={60} />
            <View
              style={{
                backgroundColor: '#F7F8F8',
                padding: 10,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Notifikasi');
                }}>
                <View
                  style={{
                    backgroundColor: '#019ACF',
                    height: 7,
                    width: 7,
                    borderRadius: 100,
                  }}
                />
                <Bell width={25} height={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 7}}>
            <Text style={{color: '#ADA4A5', fontSize: 18}}>
              Selamat Datang,
            </Text>
            <Text style={{color: '#000', fontSize: 25, fontWeight: '700'}}>
              {user.name || 'User'}
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Carousel
              ref={c => {
                setCarousel(c);
              }}
              data={banner}
              renderItem={renderBanner}
              sliderWidth={viewportWidth - 40}
              itemWidth={300}
              loop={true}
            />
          </View>

          {/* layanan */}
          <LayananHome navigation={navigation} />

          {/* Kegiatan FKDN */}
          <KegiatanFkdmHome
            kegiatanFKDM={kegiatanFKDM}
            loading={loadingKegiatan}
            navigation={navigation}
          />

          {/* Berita */}

          <BeritaHome
            data={berita}
            loading={loadingBerita}
            navigation={navigation}
          />
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  innerFrame: {
    backgroundColor: 'red',
  },
});
