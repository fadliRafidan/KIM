import { View, Text } from 'react-native'
import React from 'react'
import { CheckIcon, Select } from 'native-base'

export default function CustomSelect({selectedValue,onValueChange, data,placeholder, title, req}) {
  return (
    <View style={{width: '100%', marginBottom:15, paddingTop:10}}>
  
     <Text
      style={{
        fontSize: 17,
        fontWeight: '400',
        color: 'black',
        marginLeft: 5,
      }}>
     {title}
     <Text  style={{
        fontSize: 17,
        fontWeight: '400',
        color: 'red',
        marginLeft: 15,
      }}>
      {req}
    </Text>
    </Text>
    <Select
      borderColor="#AAAAAA"
      borderWidth="0.5"
      borderRadius={10}
      fontSize="md"
      paddingLeft={4}
      selectedValue={selectedValue}
      minWidth="200"
      accessibilityLabel="Choose Service"
      placeholder={placeholder}
      _selectedItem={{
        bg: 'teal.600',
        endIcon: <CheckIcon size="5" />,
      }}
      mt={1}
      onValueChange={onValueChange}>
         
      {data
        ? data.map(row => (
            <Select.Item
              key={row.id}
              label={row.name}
              value={row.id}
            />
          ))
        : null}
    </Select>
  </View>
  )
}