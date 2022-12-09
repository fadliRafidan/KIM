import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  TextInput,
  Share
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import URL from '../../../global.json';
import Arrow from '../../assets/icons/arrowleft.svg';
import Logo from '../../assets/logo/logoKIM.svg';
import Styles from '../../utils/Styles';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function DetailBerita({navigation, route}) {
  const {
    key,
    photo,
    title,
    creator,
    dibuat_pada,
    konten,
  } = route.params;
  const {width} = useWindowDimensions();
  let user = useSelector(state => state.AuthReducers.user);
  const [komentar, setKomentar] = useState('');
  const [totalKomentar, setTotalKomentar] = useState('');
  const [textKomentar, setTextKomentar] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState('');
  const source = {
    html: konten,
  };

  const getUser = async () => {
    let {data} = await axios.get(
      URL.baseURL + `identitas-pengguna/${user.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    setUsers(data.data);
  };



  const getKomentar = async () => {
    let {data} = await axios.get(URL.baseURL + `komentar-berita/${key}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setTotalKomentar(data.data.length);
    setKomentar(data.data);

  };


  const config = {
    headers: {'Content-Type': 'multipart/form-data; '},
  };

  const _kirimKomentar = ()=>{
  let formdata= new FormData()
  formdata.append('content', textKomentar)
  formdata.append('article_id', key)
  formdata.append('creator', user.id)

  axios
      .post(URL.baseURL+ 'tambah-komentar-berita' ,formdata,config )
      .then((res) => {
        setLoading(false)
        console.log(res);
        if(res.status === 200) {
          console.log("post success ", res.status);
          setLoading(false)      
        }
        setTextKomentar('')
        getKomentar()
      })
      .catch((err) => {
        console.log(err);

      });

  }

  useEffect(() => {
    getKomentar();
    getUser()
  }, []);

  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message:
  //         'React Native | A framework for building native apps using React',
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };


  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
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
                Berita
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

          <SafeAreaView style={{flex: 1, paddingHorizontal: 25}}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'black',
                  lineHeight: 28,
                }}>
                {title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 2,
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: '#767676',
                    fontSize: 12,
                    fontWeight: '500',
                    marginRight: 4,
                  }}>
                  {creator}
                </Text>
                <Icon name="circle" size={6} />
                <Text
                  style={{
                    color: '#767676',
                    fontSize: 12,
                    fontWeight: '500',
                    marginLeft: 3,
                  }}>
                  {dibuat_pada}
                </Text>
              </View>

              <Image
                source={{uri: URL.urlFOTO + photo}}
                style={{
                  width: '100%',
                  height: 250,
                  borderRadius: 16,
                }}
              />

              <RenderHtml contentWidth={width} source={source} />

              <View
                style={{
                  borderBottomWidth: 1.5,
                  borderBottomColor: '#EDEDED',
                  marginTop: 40,
                }}
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    backgroundColor: '#FAFAFA',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 25,
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon name="comment" />
                  <Text style={{color: '#7A7A7A', marginLeft: 2}}>{totalKomentar}</Text>
                </View>

                {/* <TouchableOpacity
                onPress={onShare}
                  style={[
                    Styles.bgDefault,
                    {
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      borderRadius: 25,
                      marginTop: 10,
                      alignItems: 'center',
                    },
                  ]}>
                  <Text style={{color: '#fff', marginLeft: 2}}>Share</Text>
                </TouchableOpacity> */}
              </View>

              <View
                style={{
                  backgroundColor: '#F8F8F8',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 25,
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                 <Image
                      source={users.foto_profile ? {
                      uri:
                        URL.urlFOTO + users.foto_profile
                    } :
                        require('../../assets/icons/userr.png')}
                    
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 100,
                        resizeMode: 'cover',
                      }}
                    />
                

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    alignItems:'center'
                  }}>
                  <TextInput onChangeText={(e)=>setTextKomentar(e)} value={textKomentar} style={{marginLeft: 10, padding:5}} placeholder="Tambahkan Komentar"/>
                  <TouchableOpacity onPress={_kirimKomentar}>
                  <Text style={{marginLeft: 10, color: '#01C3D5'}}>
                     Kirim
                  </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                {komentar ?
                  komentar.map((row, index) => (
                    
                    <View
                      key={index}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 25,
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
 <Image
                      source={row.foto_user ? {
                      uri:
                        URL.urlFOTO + row.foto_user
                    } :
                        require('../../assets/icons/userr.png')}
                    
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 100,
                        resizeMode: 'cover',
                      }}
                    />

                   

                      <View style={{flexDirection: 'column', flex: 1}}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                          <Text
                            style={{
                              marginLeft: 10,
                              color: 'black',
                              fontSize: 13,
                            }}>
                           {row.nama_user}
                          </Text>
                          <Text style={{marginLeft: 10, color: '#7A7A7A'}}>
                            {row.content}
                          </Text>
                        </View>

                        <View style={{flexDirection: 'row', flex: 1}}>
                          <Text
                            style={{
                              marginLeft: 10,
                              fontSize: 12,
                              color: '#7A7A7A',
                            }}>
                          {row.tanggal_dibuat}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )) : null}
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}
