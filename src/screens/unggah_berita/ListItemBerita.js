import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import OptionsMenu from 'react-native-option-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import URL from '../../../global.json';
import Styles from '../../utils/Styles';
import Draggable from 'react-native-draggable';
import ButtonAdd from '../../assets/icons/Add.svg';
import MenuOption from '../../assets/icons/option.svg';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default function ListItemBerita({
  photo,
  judul,
  createdAt,
  navigation,
  author,
  kategori_berita,
  deletePost,
  item,
}) {
  const myIcon = <Icon name="ellipsis-v" size={17} />;
  const editPost = () => {
    navigation.navigate('FormTambahBerita', {
      key: item,
    });
    console.log(item.id);
  };
  return (
    <View>
      <View
        style={{
          marginRight: 20,
          marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailBerita', {
              key: item.id,
              photo: item.thumbnail,
              lampiran: item.lampiran,
              title: item.judul,
              kategori_berita: item.kategori_berita,
              creator: item.creator,
              dibuat_pada: item.dibuat_pada,
              konten: item.konten,
            })
          }
          style={{
            borderRadius: 9,
            width: '100%',
            height: 70,
            flexDirection: 'row',
            display: 'flex',
            zIndex: 2,
          }}>
          <Image
            source={{uri: URL.urlFOTO + photo}}
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
          <View style={{marginTop: 15}}>
            <OptionsMenu
              customButton={myIcon}
              destructiveIndex={1}
              options={['Edit', 'Delete']}
              actions={[editPost, deletePost]}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
