import { PermissionsAndroid, StyleSheet, View, Text, Alert, Linking } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../../constant/colors";
import { useState } from "react";
import { useNavigation,  } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";

interface Location {
  latitude: number;
  longitude: number;
}

function LocationPicker() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const navigation = useNavigation();




  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      console.log('Permission granted:', granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Permission request error:', err);
      return false;
    }
  }

  const openLocationSettings = () => {
    Alert.alert(
      'Enable Location Services',
      'Please enable location services to use this feature.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() }
      ]
    );
  };

  async function getLocationHandler() {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access location without permission.');
      return;
    }

  
    const location = { latitude: 24.8607, longitude: 67.0011 };
    setCurrentLocation(location);
    console.log('Karachi Location Set:', location);
  }

  const openMapScreen = () => {
    if (!currentLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!'
      );
      return;
    }

    navigation.navigate('MapScreen', { location: currentLocation });
    

    // if (currentLocation) {
    //   navigation.navigate('MapScreen', { location: currentLocation });
    // } else {
    //   Alert.alert('No Location Set', 'Please set a location first.');
    // }
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        {
          currentLocation?
      <MapView
        style={styles.mapContainer}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={currentLocation}
          title="Current Location"
        />
       
      </MapView>:<Text>No Location selected yet</Text>
        }

        {/* <Text>Latitude: {currentLocation ? currentLocation.latitude : 'loading'}</Text>
        <Text>Longitude: {currentLocation ? currentLocation.longitude : 'loading'}</Text> */}
      </View>
      <View style={styles.actions}>
        <OutlineButton icon='map' onPress={getLocationHandler}>
          <View>
            <Text>Show Location</Text>
          </View>
        </OutlineButton>

        {/* {currentLocation && ( */}
          <OutlineButton icon='map' onPress={openMapScreen}>
            <View>
              <Text>Open Maps</Text>
            </View>
          </OutlineButton>
        {/* )} */}
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
