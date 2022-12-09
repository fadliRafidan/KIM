import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import URL from '../../../global.json';
import CustomHeaderBG from '../../components/CustomHeaderBG';
export default function Notifikasi({navigation}) {
  let user = useSelector(state => state.AuthReducers.user);

  const [notification, setNotifikasi] = useState('');

  const getNotifikasi = async () => {
    let {data} = await axios.get(URL.baseURL + 'notification/' + user.id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setNotifikasi(data.data);
  };

  useEffect(() => {
    getNotifikasi();
  }, []);

  console.log(notification);

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG
          label="Notifikasi"
          onPress={() => navigation.goBack()}
        />

        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <SafeAreaView style={{flex: 1, paddingHorizontal: 25}}>
            {notification
              ? notification.map((row, keyrow) => (
                  <View
                    key={keyrow}
                    style={{
                      flexDirection: 'row',
                      marginBottom: 5,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('DetailNotifikasi', {
                          itemId: row.id,
                          type: row.tipe_file,
                          judul: row.name,
                          description: row.description,
                          waktu: row.waktu,
                        });
                      }}
                      style={{
                        borderRadius: 9,
                        width: '100%',
                        height: 70,
                        flexDirection: 'row',
                        display: 'flex',
                      }}>
                      {row.verifikasi == 2 && (
                        <View
                          style={{
                            backgroundColor: '#FFDEDE',
                            height: 50,
                            width: 50,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon name="exclamation" size={25} color="#790707" />
                        </View>
                      )}
                      {row.verifikasi == 1 && (
                        <View
                          style={{
                            backgroundColor: '#DEF7FF',
                            height: 50,
                            width: 50,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon name="check-square" size={25} color="#2395B9" />
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
                            fontSize: 18,
                            width: 250,
                            fontWeight: '500',
                            marginTop: 2,
                          }}>
                          {row.title}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            marginTop: 2,
                            alignItems: 'center',
                          }}>
                          <Icon name="circle" size={6} />
                          <Text
                            style={{
                              color: '#767676',
                              fontSize: 14,
                              fontWeight: '500',
                              marginLeft: 3,
                            }}>
                            {row.dibuat_pada} - {row.waktu}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              : null}
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}
