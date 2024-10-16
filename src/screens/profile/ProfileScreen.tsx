import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '../../components'
import auth from '@react-native-firebase/auth'

const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title='Log out' onPress={async () => {auth().signOut()}}/>
    </View>
  )
}

export default ProfileScreen