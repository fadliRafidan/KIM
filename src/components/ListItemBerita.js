import React from 'react';
import {
  Dimensions, Image, Text,
  TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import URL from '../../global.json';
import Styles from '../utils/Styles';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default function ListItemBerita({
  photo,
  judul,
  createdAt,
  onPress,
  author,
  kategori_berita
}) {


  return (
    <View
      style={{
        marginRight: 20,
        marginBottom: 20,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderRadius: 9,
          width: '100%',
          height: 70,
          flexDirection: 'row',
          display: 'flex',
        }}>
        <Image
          source={{uri : URL.urlFOTO + photo}}
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
             {kategori_berita}
            </Text>
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              width: 250,
              fontWeight: '500',
              marginTop: 2,
            }}>
            {judul}
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
              {author}
            </Text>
            <Icon name="circle" size={6} />
            <Text
              style={{
                color: '#767676',
                fontSize: 12,
                fontWeight: '500',
                marginLeft: 3,
              }}>
              {createdAt}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
