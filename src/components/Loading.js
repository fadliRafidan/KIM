import React from 'react';
import {
    ActivityIndicator,
    Text,
    View
} from 'react-native';
import Styles from '../utils/Styles';

export default class Loading extends React.Component {
    render() {
        return (
          <View style={{ backgroundColor: 'rgba(255,255,255,0.5)', width: '100%', height: '100%', zIndex: 999, position: "absolute", justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#790707" />
          <Text style={[Styles.textBlack,Styles.textSemiBold]}>Memproses ...</Text>
        </View>
        );
    }
}
