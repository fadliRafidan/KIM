import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function SearchField({
  label,
  icon,
  value,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText
 
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical:7,
        paddingHorizontal:15,
        marginBottom: 25,
        backgroundColor:'transparent',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        borderColor:'#01C3D5',
        borderWidth:0.5,
        position:'absolute',
        top:120,
        width:350,
        height:50
        
      }}>
      {icon}
     
        <TextInput
        value={value}
        placeholderTextColor="#01C3D5"
        onChangeText={onChangeText}
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color:"#000"}}
        />
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#01C3D5', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}