import React from 'react'
import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Styles from '../Styles'

const Playlists = () => {
    return (
        <View style={Styles.container}>
            <StatusBar style='auto' />
            <Text>Playlists!</Text>
        </View>
    )
}

export default Playlists