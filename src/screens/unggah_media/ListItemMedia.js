import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import OptionsMenu from 'react-native-option-menu';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default function ListItemMedia({
  type,
  judul,
  createdAt,
  author,
  deletePost,
  item,
  navigation,
}) {
  const myIcon = <Icon name="ellipsis-v" size={17} />;
  const editPost = () => {
    navigation.navigate('FormTambahMedia', {
      key: item,
    });
  };
  return (
    <View
      style={{
        marginRight: 20,
        marginBottom: 3,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailKepuskaan', {
            itemId: item.id,
            type: item.tipe_file,
            judul: item.name,
            author: item.creator,
            createdAt: item.createdAt,
            file: item.file,
          })
        }
        style={{
          borderRadius: 9,
          width: '100%',
          height: 70,
          flexDirection: 'row',
          display: 'flex',
        }}>
        {type == 'dokumen' && (
          <View
            style={{
              backgroundColor: '#FFF4D9',
              height: 50,
              width: 50,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="file" size={25} color="#F2994A" />
          </View>
        )}
        {type == 'file' && (
          <View
            style={{
              backgroundColor: '#FFF4D9',
              height: 50,
              width: 50,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="file" size={25} color="#F2994A" />
          </View>
        )}
        {type == 'mp3' && (
          <View
            style={{
              backgroundColor: '#DEF7FF',
              height: 50,
              width: 50,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="music" size={25} color="#2395B9" />
          </View>
        )}
        {type == 'link' && (
          <View
            style={{
              backgroundColor: '#FFEBEB',
              height: 50,
              width: 50,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="youtube" size={25} color="red" />
          </View>
        )}
        {type == 'gambar' && (
          <View
            style={{
              backgroundColor: '#E9FFEA',
              height: 50,
              width: 50,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="image" size={25} color="#00752F" />
          </View>
        )}

        <View
          style={{
            marginLeft: 10,
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-start',
          }}>
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
            options={['Edit', 'Delete', 'Cancel']}
            actions={[editPost, deletePost]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
