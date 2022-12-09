import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Styles from '../utils/Styles';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[ Styles.bgDefault,{
       
        padding: 20,
        borderRadius: 30,
        marginBottom: 30,
      }]}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}