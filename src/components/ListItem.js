import React from 'react';
import {
  Dimensions, ImageBackground,
  Text,
  TouchableHighlight, View
} from 'react-native';
import URL from '../../global.json';
import Circle from '../assets/icons/circle.svg';
import FrameBlack from '../assets/icons/frameblack.svg';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default function ListItem({
  photo,
  title,
  createdAt,
  onPress,
  
}) {





  return (
    <View
      style={{
        marginRight: 20,
        marginBottom: 20,
      }}>
      <TouchableHighlight
        underlayColor="gray"
        onPress={onPress}
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
