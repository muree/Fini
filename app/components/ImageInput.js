import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Alert, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import colors from '../config/colors'

export default function ImageInput({ imageUri, onChangeImage }) {
  
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if(!granted) alert('You need to request permission to access the library.');
  }

  const handlePress = () => {
    if(!imageUri) selectImage();
    else Alert.alert('Delete', 'Are you sure you want to delete this image', [
      {text: 'Yes', onPress: () => onChangeImage(null)},
      {text: 'No'}
    ])
  }

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5
      })
      if(!result.cancelled) {
        onChangeImage(result.uri)
      }
    } catch (e) {
      console.log('Error reading image', e);
    }
  }

  useEffect(() => {
    requestPermission();
  }, [])

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && <MaterialCommunityIcons name='camera' size={40} color={colors.mediumGrey} />}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    color: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  }
})