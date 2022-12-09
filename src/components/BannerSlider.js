import React from 'react';
import {
  Linking,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import URL from '../../global.json';
import Framee from '../assets/icons/framesvg.svg';

export default function BannerSlider({data}) {
  const image = {uri: URL.urlFOTO + data.image};

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(data.link);
    if (supported) {
      await Linking.openURL(data.link);
    } else {
      await Linking.openURL(data.link);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 168,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
          <Framee width="100%" height={49} />
          <Text
            style={{
              color: 'white',
              position: 'absolute',
              fontSize: 13,
              width: 150,
              left: 20,
              bottom: 16,
            }}>
            {data.title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
