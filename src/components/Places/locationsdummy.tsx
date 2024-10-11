import { PermissionsAndroid, StyleSheet, View, Text, Alert } from 'react-native';
import OutlineButton from '../UI/OutlineButton';
import { Colors } from '../../constant/colors';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getAddress } from '../../util/location';

// Define a consistent Location interface
interface Location {
  lat: number;
  lng: number;
}

function LocationPicker({onPickLocation}) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setCurrentLocation(mapPickedLocation);

    }
  }, [route, isFocused]);

  useEffect(()=>{
    async function handleLocation() {
      
      if(currentLocation){
        const address = await getAddress(currentLocation.lat,currentLocation.lng)
        onPickLocation({...currentLocation, address:address})
      }
    }
    handleLocation()
  },[currentLocation,onPickLocation])

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

  async function getLocationHandler() {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access location without permission.');
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      error => {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Could not fetch location.');
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        {currentLocation ? (
          <MapView
            style={styles.mapContainer}
            initialRegion={{
              latitude: currentLocation.lat,
              longitude: currentLocation.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: currentLocation.lat, longitude: currentLocation.lng }}
              title=" Location
              
              "
            />
          </MapView>
        ) : (
          <Text>No location was selected</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlineButton icon="map" onPress={getLocationHandler}>
          <View>
            <Text>User Location</Text>
          </View>
        </OutlineButton>

        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          <View>
            <Text>Open Maps</Text>
          </View>
        </OutlineButton>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
