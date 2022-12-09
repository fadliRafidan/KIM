import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 44,
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderColor: '#01C3D5',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor:'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor:getSelectionMode == 1 ? '#01C3D5' : '#e4e4e4',
          borderBottomWidth:2
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'black' : 'black',
            fontSize: 18,
            fontFamily: 'Roboto-Medium',
            fontWeight:'700'
          }}>
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor:'transparent',
          // backgroundColor: getSelectionMode == 2 ? '#790707' : '#e4e4e4',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor:getSelectionMode == 2 ? '#01C3D5' : '#e4e4e4',
          borderBottomWidth:2
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'black' : 'black',
            fontSize: 18,
            fontFamily: 'Roboto-Medium',
            fontWeight:'700'
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
