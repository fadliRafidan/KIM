import React from 'react';
import {
  ImageBackground, Text, TouchableOpacity, View
} from 'react-native';
import Arrow from '../assets/icons/arrowleft.svg';
import Logo from '../assets/logo/logoKIM.svg';

export default function CustomHeaderBG({children, label,onPress}) {
  return (
   
        <ImageBackground
          source={require('../assets/images/bgtop.png')}
          style={{
            width: '100%',
            height: 200,
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View style={{
              flexDirection: 'row',
              flex:1,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingLeft:10
            }}>

          <TouchableOpacity  onPress={onPress}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop:50,
              paddingLeft:10
            }}>
            <Arrow />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'black',
                marginLeft: 3,
              }}>
             {label}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop:40,
              paddingRight:15
            }}>
          <Logo width={60} height={60} />
            </View>

          </View>

        {children}
           

        </ImageBackground>
      
  )
}