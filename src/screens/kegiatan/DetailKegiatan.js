import React, {Fragment} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import URL from '../../../global.json';
import Arrow from '../../assets/icons/arrowleft.svg';
import Titik from '../../assets/icons/Titik.svg';
import Logo from '../../assets/logo/logoKIM.svg';
import RenderHtml from 'react-native-render-html';

export default function DetailKegiatan({navigation, route}) {
  const {konten, photo, judul, createdAt, lokasi, tanggal} = route.params;
  const {width} = useWindowDimensions();

  const source = {
    html: konten,
  };
  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
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
                paddingTop: 50,
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
                Detail Kegiatan
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 40,
                paddingRight: 15,
              }}>
              <Logo width={60} height={60} />
            </View>
          </View>

          <SafeAreaView style={{flex: 1, paddingHorizontal: 25, marginTop: 20}}>
            <View>
              <Image
                source={{uri: URL.urlFOTO + photo}}
                style={{
                  width: '100%',
                  height: 250,
                  borderRadius: 16,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'black',
                  lineHeight: 28,
                  marginTop: 20,
                }}>
                {judul}
              </Text>

              <RenderHtml contentWidth={width} source={source} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'black',
                  lineHeight: 28,
                  marginTop: 10,
                }}>
                Detail
              </Text>

              <View style={{alignItems: 'flex-start'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      borderRadius: 25,
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#FAFAFA',
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        borderRadius: 25,
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon name="clock" color="#FF8311" size={20} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          marginLeft: 2,
                          fontWeight: '600',
                        }}>
                        Tempat
                      </Text>
                      <Text style={{color: '#AAAAAA', marginLeft: 2}}>
                        {lokasi}
                      </Text>
                    </View>
                  </View>
                </View>

                <Titik marginLeft={35} />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      borderRadius: 25,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#FAFAFA',
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        borderRadius: 25,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon name="check" color="#60C167" size={17} />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          marginLeft: 2,
                          fontWeight: '600',
                        }}>
                        Tgl. Pelaksanaan
                      </Text>
                      <Text style={{color: '#AAAAAA', marginLeft: 2}}>
                        {tanggal}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}
