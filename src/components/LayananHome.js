import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import BeritaBersama from '../assets/icons/beritabersama.svg';
import Forum from '../assets/icons/forum.svg';
import Kediatanfkdm from '../assets/icons/kediatanKIM.svg';
import Kegiatanmasyarakat from '../assets/icons/kegiatanmasyarakat.svg';
import Kepustakaan from '../assets/icons/kepustakaan.svg';
import Surveikesadaran from '../assets/icons/surveikesadaran.svg';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default function LayananHome({navigation}) {
  return (
    <View style={{marginTop: 10}}>
            <View
              style={{
                paddingHorizontal: 1,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Forum');
                }}
                style={{
                  shadowOffset: {width: 3, height: 5},
                  shadowOpacity: 40,
                  shadowColor: 'rgba(0,0,0,0.5)',
                  elevation: 3,
                  shadowRadius: 15,
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                  width: ((viewportWidth - 60) * 50) / 100,
                  height: ((viewportWidth - 60) * 22.5) / 100,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: '#ECECEC',
                    paddingRight: 10,
                  }}>
                  <Forum />
                </View>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text style={[styles.textBold, {color:'#000000', maxWidth:50}]}>
                    Forum 
                  </Text>
                  <Text style={[styles.textBold, {color:'#000000', maxWidth:50}]}>
                     KIM
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Berita');
                }}
                styleDisabled={{color: 'red'}}
                style={{
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 40,
                  shadowColor: 'rgba(0,0,0,0.5)',
                  elevation: 5,
                  shadowRadius: 15,
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                  width: ((viewportWidth - 60) * 50) / 100,
                  height: ((viewportWidth - 60) * 22.5) / 100,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: '#ECECEC',
                    paddingRight: 10,
                  }}>
                  <BeritaBersama />
                </View>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text style={[styles.textBold, {maxWidth:50,color:'#000000'}]}>
                    Berita 
                  </Text>
                  <Text style={[styles.textBold, {maxWidth:50,color:'#000000'}]}>
                     KIM
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingHorizontal: 1,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Masyarakat');
                }}
                styleDisabled={{color: 'red'}}
                style={{
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 40,
                  shadowColor: 'rgba(0,0,0,0.5)',
                  elevation: 5,
                  shadowRadius: 15,
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                  width: ((viewportWidth - 60) * 50) / 100,
                  height: ((viewportWidth - 60) * 22.5) / 100,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: '#ECECEC',
                    paddingRight: 10,
                  }}>
                  <Kegiatanmasyarakat />
                </View>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text style={[styles.textBold, {maxWidth:90, color:'#000000'}]}>
                    Kegiatan 
                  </Text>
                  <Text style={[styles.textBold, {maxWidth:90, color:'#000000'}]}>
                     KIM
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Survei');
                }}
                styleDisabled={{color: 'red'}}
                style={{
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 40,
                  shadowColor: 'rgba(0,0,0,0.5)',
                  elevation: 5,
                  shadowRadius: 15,
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                  width: ((viewportWidth - 60) * 50) / 100,
                  height: ((viewportWidth - 60) * 22.5) / 100,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: '#ECECEC',
                    paddingRight: 10,
                  }}>
                  <Surveikesadaran />
                </View>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text style={[styles.textBold, {maxWidth:130,color:'#000000'}]}>
                    Survei 
                  </Text>
                  <Text style={[styles.textBold, {maxWidth:130,color:'#000000'}]}>
                     KIM
                  </Text>
                
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingHorizontal: 1,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MediaKepustakaan');
                }}
                styleDisabled={{color: 'red'}}
                style={{
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 40,
                  shadowColor: 'rgba(0,0,0,0.5)',
                  elevation: 5,
                  shadowRadius: 15,
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                  width: ((viewportWidth - 60) * 50) / 100,
                  height: ((viewportWidth - 60) * 22.5) / 100,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: '#ECECEC',
                    paddingRight: 10,
                  }}>
                  <Kepustakaan />
                </View>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text style={[styles.textBold, {maxWidth:90,color:'#000000'}]}>
                    Media 
                  </Text>
                  <Text style={[styles.textBold, {maxWidth:90,color:'#000000'}]}>
                     KIM
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('FKDM');
                }}
                styleDisabled={{color: 'red'}}
                style={{
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 40,
                  shadowColor: 'rgba(0,0,0,0.5)',
                  elevation: 5,
                  shadowRadius: 15,
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                  width: ((viewportWidth - 60) * 50) / 100,
                  height: ((viewportWidth - 60) * 22.5) / 100,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: '#ECECEC',
                    paddingRight: 10,
                  }}>
                  <Kediatanfkdm />
                </View>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text style={[styles.textBold, {maxWidth:70,color:'#000000'}]}>
                    Tentang 
                  </Text>
                  <Text style={[styles.textBold, {maxWidth:70,color:'#000000'}]}>
                    KIM
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
  )
}


const styles = StyleSheet.create({
    innerFrame: {
      backgroundColor: 'red',
    },
  });