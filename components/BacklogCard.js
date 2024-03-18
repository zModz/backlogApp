import { View, Image } from 'react-native'
import { Button, Modal, Portal, Text } from 'react-native-paper'
import React, { useState } from 'react'
import axios from 'axios'
import modal from './Modal'

const BacklogCard = ({ game }) => {
    return (
        <View style={{
            backgroundColor: '#fff',
            marginBottom: 10,
            borderRadius: 10,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: 5
        }}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: game.images != undefined ? game.images.cover : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png' }} width={120} height={150} style={{ borderRadius: 10, margin: 5 }} />
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    margin: 5,
                }}>
                    <Text variant='bodyMedium' style={{ fontStyle: 'italic', color: '#9b9b9b' }}>{game.category}</Text>
                    <Text variant='titleLarge' style={{ width: 215, fontWeight: 'bold' }}>{game.name != null ? game.name : 'UNKNOWN'}</Text>
                    <Text variant='bodyLarge' style={{ width: 215 }}>{game.genres}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text variant='bodyMedium' >{game.dev}</Text>
                        <Text style={{ margin: 2 }}>•</Text>
                        <Text variant='bodyMedium'>{game.release_date}</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default BacklogCard