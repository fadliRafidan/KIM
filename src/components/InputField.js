import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  value
 
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical:7,
        paddingHorizontal:15,
        marginBottom: 25,
        backgroundColor:'#F7F8F8',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        borderColor:'#019ACF',
        borderWidth:0.5
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0,color:'#000000'}}
          placeholderTextColor="#000" 
          secureTextEntry={true}
          value={value}
        onChangeText={onChangeText}
        />
      ) : (
        <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#000" 
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0,color:'#000000'}}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#019ACF', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}