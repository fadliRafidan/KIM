import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import URL from '../../../global.json';
import CustomHeaderBG from '../../components/CustomHeaderBG';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default function Forum({navigation}) {
  const [forum, setForum] = useState([]);

  const getForum = async () => {
    let {data} = await axios.get(URL.baseURL + 'daftar-forum', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setForum(data.data);
  };

  useEffect(() => {
    getForum();
  }, []);

  console.log(forum);

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG label="Forum" onPress={() => navigation.goBack()} />
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 20}}>
            <View
              style={{
                overflow: 'hidden',
                paddingBottom: 5,
                paddingHorizontal: 5,
              }}>
              {forum
                ? forum.map(row => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Chat', {
                          idForum: row.id,
                          judul: row.judul,
                          anggota: row.anggota,
                        })
                      }
                      style={{
                        height: 83,
                        width: '100%',
                        shadowOffset: {width: 1, height: 2},
                        shadowOpacity: 10,
                        shadowColor: 'rgba(0,0,0,0.5)',
                        elevation: 5,
                        shadowRadius: 3,
                        borderRadius: 10,
                        backgroundColor: '#ffffff',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10,
                        marginBottom: 10,
                      }}>
                      <Image
                        source={{uri: URL.urlFOTO + row.thumbnail}}
                        style={styles.tinyLogo}
                      />

                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          alignItems: 'center',
                        }}>
                        <View>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 15,
                              fontWeight: '600',
                            }}>
                            {row.judul}
                          </Text>
                          <Text style={{color: '#8497AF', fontSize: 13}}>
                            {row.slug}
                          </Text>
                          <Text
                            style={{
                              color: '#8497AF',
                              fontSize: 13,
                              fontWeight: '600',
                            }}>
                            {row.anggota + ' Anggota'}
                          </Text>
                        </View>
                        <Icon name="chevron-right" />
                      </View>
                    </TouchableOpacity>
                  ))
                : null}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
