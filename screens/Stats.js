import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import Styles from '../Styles'

const Stats = () => {
    return (
        <View style={Styles.container}>
            <StatusBar style='auto' />
            <Text>Stats!</Text>
        </View>
    )
}

export default Stats