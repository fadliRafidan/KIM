
import React from 'react'
import { Skeleton, VStack, Center, HStack } from 'native-base';
import { Dimensions } from 'react-native';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export const SkeletonBerita = () => {
    return <Center w="100%" marginBottom="4">
        <HStack w="100%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
        borderColor: "coolGray.500"
      }} _light={{
        borderColor: "coolGray.200"
      }} p="3">
          <Skeleton flex="1" h="50" rounded="md" startColor="coolGray.100" />
        <VStack flex="3" space="2">
        <Skeleton h="3" width="30%" rounded="full" startColor="red.100" />
        <Skeleton h="3" width="100%" rounded="full" />
        <Skeleton h="3" width="100%" rounded="full" />
         
        </VStack>
        </HStack>
      </Center>;
  };


  export const SkeletonBanner = () => {
    return <Center w="100%">
    <HStack w="100%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
    borderColor: "coolGray.500"
  }} _light={{
    borderColor: "coolGray.200"
  }} p="3">
    <VStack flex="3" h="150" space="2">
    <Skeleton h="90" flex={1} rounded="md" startColor="gray.100" />
    <Skeleton h="3" width="100%" rounded="full" />
    <Skeleton h="3" width="100%" rounded="full" />
     
    </VStack>
    </HStack>
  </Center>;
  };
  export const SkeletonKegiatan = () => {
    return <Center w={((viewportWidth - 60) * 50) / 100} marginRight="5">
    <HStack w="100%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
    borderColor: "coolGray.500"
  }} _light={{
    borderColor: "coolGray.200"
  }} p="3">
    <VStack flex="3" h={((viewportWidth - 60) * 50) / 100} space="2">
    <Skeleton h="90" flex={1} rounded="md" startColor="gray.100" />
    <Skeleton h="3" width="100%" rounded="full" />
    <Skeleton h="3" width="100%" rounded="full" />
     
    </VStack>
    </HStack>
  </Center>;
  };
