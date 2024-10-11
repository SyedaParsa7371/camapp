import React, { useState } from 'react';
import { Text, Alert, Button, Image, PermissionsAndroid, Platform, View, StyleSheet } from 'react-native';
import { launchCamera, CameraOptions, CameraType } from 'react-native-image-picker'; // Import the types
import { Colors } from '../../constant/colors';
import OutlineButton from '../UI/OutlineButton';

function ImagePicker({onTakeImage}:any) {
  const [pickedImage, setPickedImage] = useState(null); 
  const [cameraPermission, setCameraPermission] = useState(false);

  // Function to verify and request camera permissions for Android
  async function verifyPermissions() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setCameraPermission(true);
        } else {
          Alert.alert('Camera permission denied');
        }
      } catch (error) {
        console.warn(error);
      }
    } else {
      setCameraPermission(true);
    }
  }

  // Function to handle the image capture
  const takeImageHandler = async () => {
    await verifyPermissions();

    if (!cameraPermission) {
      return;
    }

    // Define the options with the correct types
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1.0,
      cameraType: 'back' as CameraType, // Cast to CameraType
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setPickedImage(source.uri);
        onTakeImage(source.uri) 
        Alert.alert('Photo taken!', `Image URI: ${source.uri}`);
      } else {
        Alert.alert('Unexpected error occurred');
      }
    });
  };


  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        {imagePreview}
      </View>
      <OutlineButton icon='camera' onPress={takeImageHandler} >Take Image</OutlineButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  rootContainer:{
    flex: 1, 
    justifyContent: 'center',
     alignItems: 'center' 
  },
  imageContainer:{
    width: '100%',
     height: 200 ,
     marginVertical:8,
     justifyContent:"center",
     alignItems:'center',
     backgroundColor:Colors.primary100,
     borderRadius:4
  },
  image:{
    width:'100%',
    height:'100%'
  }
})