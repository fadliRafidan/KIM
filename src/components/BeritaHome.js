import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import URL from '../../global.json';
import Styles from '../utils/Styles';
import { SkeletonBerita } from './CustomSkeleton';

export default function BeritaHome({navigation, data, loading}) {



  return (
    <View style={{marginTop: 0}}>
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 15,
      }}>
      <Text
        style={{
          fontSize: 14,
          marginVertical: 10,
          fontWeight: '700',
          color: 'black',
        }}>
        Berita Sumedang
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Berita');
        }}>
        <Text
          style={{
            fontSize: 12,
            marginVertical: 10,
            color: 'black',
          }}>
          Lihat Semua
        </Text>
      </TouchableOpacity>
    </View>

    <View
      style={{
        flexDirection: 'column',
        marginBottom: 20,
      }}>
      {data.length >0 ?  data.filter(i=> i.id % 2 === 0).map(row=>(
        loading ? <SkeletonBerita/>: 
      <TouchableOpacity
      key={row.id}
      onPress={() => {
          navigation.navigate('DetailBerita', {
            key: row.id,
            photo: row.thumbnail,
            lampiran: row.lampiran,
            title: row.judul,
            kategori_berita: row.kategori_berita,
            creator : row.creator,
            dibuat_pada:row.dibuat_pada,
            konten: row.konten
          });
        }}
        style={{
          borderRadius: 9,
          width: '100%',
          height: 70,
          flexDirection: 'row',
          display: 'flex',
          marginBottom: 20,
        }}>
        <Image
          source={{ uri:URL.urlFOTO + row.thumbnail}}
          style={{
            width: 70,
            height: 70,
            borderRadius: 16,
            overflow: 'hidden',
            resizeMode: 'cover',
          }}
        />
        <View
          style={{
            marginLeft: 10,
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 1,
              backgroundColor: '#FFF5F5',
              width: 75,
              borderRadius: 20,
              padding: 4,
            }}>
            <Text
              style={[
                Styles.textDefault,
                {
                  fontSize: 13,
                  fontWeight: '500',
                },
              ]}>
              {row.kategori_berita}
            </Text>
          </View>
          <Text numberOfLines={2}
            style={{
              color: 'black',
              fontSize: 13,
              width: 250,
              fontWeight: '500',
              marginTop: 2,
              width: "100%"
            }}>
           {row.judul}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 2,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#767676',
                fontSize: 12,
                fontWeight: '500',
                marginRight: 4,
              }}>
             {row.creator}
            </Text>
            <Icon name="circle" size={6} />
            <Text
              style={{
                color: '#767676',
                fontSize: 12,
                fontWeight: '500',
                marginLeft: 3,
              }}>
             {row.dibuat_pada}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      )) : <SkeletonBerita/> }

      
     
    </View>
  </View>
  )
}


const styles = StyleSheet.create({
    innerFrame: {
      backgroundColor: 'red',
    },
  });