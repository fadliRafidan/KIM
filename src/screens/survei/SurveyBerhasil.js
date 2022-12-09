import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Done from '../../assets/icons/Done.svg';
import Styles from '../../utils/Styles';
import {StatusBar} from 'native-base';
import CustomHeaderBG from '../../components/CustomHeaderBG';

export default function SurveyBerhasil({navigation, route}) {
  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeaderBG
          label="Survey Masyarakat"
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Done width={250} height={200} marginTop={50} />
          <Text
            style={[
              Styles.textBlack,
              {fontWeight: 'bold', fontSize: 18, marginBottom: 2},
            ]}>
            Terimakasih Sudah melakukan survey
          </Text>

      
          <View
            style={{
              marginTop: 30,
              width: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#01C3D5',
                height: 45,
                width: 160,
                borderRadius: 23,
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
                Selanjutnya
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
