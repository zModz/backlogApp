import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import Styles from '../Styles'

const Settings = () => {
    return (
        <View style={Styles.container}>
            <StatusBar style='auto' />
            <Text>Settings!</Text>
        </View>
    )
}

export default Settings