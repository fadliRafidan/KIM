import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function InputTextSetting({
    title,
    value,
    onChangeText,
    placeholder
}) {
  return (
    <View style={{paddingVertical: 10}}>
    <Text
      style={{
        fontSize: 17,
        fontWeight: '400',
        color: 'black',
        paddingBottom: 6,
        marginLeft: 5,
      }}>
     {title}
    </Text>
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderColor: '#AAAAAA',
        borderWidth: 0.5,
      }}>
      <TextInput
        value={value}
      onChangeText={onChangeText}
        placeholder={title}
        placeholderTextColor="#000" 
        style={{flex: 1, paddingVertical: 0, color:'#000'}}
      />
    </View>
  </View>
  )
}