import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native'
import { FAB, IconButton, Searchbar } from 'react-native-paper';
import Styles from '../Styles';

const Queue = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
      <View style={Styles.container}>
        <StatusBar style='auto' />
        <Text style={{ margin: 12, fontFamily: 'Roboto', fontSize: 24 }}>Queue!</Text>
        <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ width: 250 }}>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
          <View style={{ width: 85, flexDirection: 'row', justifyContent: 'space-between' }}>
            <IconButton
              icon="filter"
              mode='contained'
              size={24}
              onPress={() => console.log('Pressed')}
              style={{ margin: 0 }}
            />
            <IconButton
              icon="sort"
              mode='contained'
              size={24}
              onPress={() => console.log('Pressed')}
              style={{ margin: 0 }}
            />
          </View>
        </View>
        <FAB icon="plus" label='Add' style={{ position: 'absolute', height: 55, margin: 16, left: 0, right: 0, bottom: 65 }} onPress={() => console.log("Pressed")} />
      </View>
    )
}

export default Queue