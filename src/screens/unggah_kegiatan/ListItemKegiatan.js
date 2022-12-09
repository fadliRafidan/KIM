import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import OptionsMenu from 'react-native-option-menu';
import URL from '../../../global.json';
import Circle from '../../assets/icons/circle.svg';
import FrameBlack from '../../assets/icons/frameblack.svg';
import MenuOption from '../../assets/icons/option.svg';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default function ListItemKegiatan({
  navigation,
  photo,
  title,
  createdAt,
  data,
  deletePost,
}) {
  const myIcon = <MenuOption width={45} height={45} />;

  const editPost = () => {
    navigation.navigate('FormTambahKegiatan', {
      key: data,
    });
    console.log(data.id);
  };

  return (
    <View
      style={{
        marginRight: 20,
        marginBottom: 20,
      }}>
      <TouchableHighlight
        underlayColor="gray"
        onPress={() =>
          navigation.navigate('DetailKegiatan', {
            key: data.id,
            photo: data.thumbnail,
            judul: data.judul,
            dibuat_pada: data.dibuat_pada,
            konten: data.konten,
            lokasi: data.lokasi,
            tanggal: data.tanggal,
          })
        }
        style={{
          borderRadius: 9,
          width: ((viewportWidth - 60) * 50) / 100,
          height: ((viewportWidth - 60) * 70) / 100,
        }}>
        <ImageBackground
          source={{uri: URL.urlFOTO + photo}}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            borderRadius: 16,
            overflow: 'hidden',
            resizeMode: 'cover',
          }}>
          <View style={{position: 'absolute', top: -1, right: -4}}>
            <OptionsMenu
              customButton={myIcon}
              destructiveIndex={1}
              options={['Edit', 'Delete']}
              actions={[editPost, deletePost]}
            />
          </View>
          <FrameBlack width="100%" height={99} />
          <View
            style={{
              flexDirection: 'column',
              paddingVertical: 7,
              position: 'absolute',
              paddingHorizontal: 6,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                width: 140,
                fontWeight: '700',
              }}>
              {title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Circle height={12} width={12} />
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  width: 100,
                  marginLeft: 5,
                }}>
                {createdAt}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );
}
