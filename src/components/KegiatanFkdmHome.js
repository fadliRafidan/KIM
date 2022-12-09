import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import FrameBlack from '../assets/icons/frameblack.svg';
import Circle from '../assets/icons/circle.svg';
import URL from '../../global.json';
import { SkeletonKegiatan } from './CustomSkeleton';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default function KegiatanFkdmHome({navigation,kegiatanFKDM, loading}) {

  return (
    <View style={{marginTop: 0}}>
            <Text
              style={{
                fontSize: 14,
                marginVertical: 10,
                fontWeight: '700',
                color: 'black',
              }}>
              Kegiatan KIM
            </Text>
            <ScrollView
            
              horizontal={true}
              showsHorizontalScrollIndicator={false}>

            { kegiatanFKDM ? kegiatanFKDM.map((item)=>(
              loading ? <SkeletonKegiatan/> :
              <View
              key={item.id}
                style={{
                  flexDirection: 'row',
                  marginRight: 15,
                  marginBottom: 20,
                  marginLeft: 1,
                }}>
                <TouchableOpacity
                  onPress={() => {navigation.navigate('DetailKegiatan', {
                    key : item.id,
                    photo: item.thumbnail,
                    judul: item.judul,
                    dibuat_pada: item.dibuat_pada,
                    konten: item.konten,
                    lokasi: item.lokasi,
                    tanggal: item.tanggal

          })}}
                  style={{
                    borderRadius: 9,
                    width: ((viewportWidth - 60) * 50) / 100,
                    height: ((viewportWidth - 60) * 70) / 100,
                  }}>
                  <ImageBackground
                    source={{ uri: URL.urlFOTO + item.thumbnail  }}
                    style={{
                      width: '100%',
                      height: '100%',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      borderRadius: 16,
                      overflow: 'hidden',
                      resizeMode: 'cover',
                      position:'relative',
                    }}>
                    <View style={{position:'absolute', zIndex:3}}>
                    <FrameBlack  width={200}/>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        paddingVertical: 7,
                        paddingHorizontal:16,
                        zIndex:4,
                        width:160
                      }}>
                      <Text 
                      ellipsizeMode="tail"
                        style={{
                          color: 'white',
                          fontSize: 13,
                          fontWeight: '700',
                          textAlign:'justify',
                          width:'90%'
                        }}>
                         {item.judul.length < 50
                ? `${item.judul}`
                : `${item.judul.substring(0, 32)}...`}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Circle height={12} width={12} />
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 13,
                            width: 100,
                            marginLeft: 5,
                          }}>
                         {item.dibuat_pada}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )) : <SkeletonKegiatan/>}

    
            
            </ScrollView>

          </View>
  )
}

const styles = StyleSheet.create({
    innerFrame: {
      backgroundColor: 'red',
    },
  });