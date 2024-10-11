import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../components/UI/IconButton';
import { Colors } from '../constant/colors';

// Define a consistent Location interface
interface Location {
  lat: number;
  lng: number;
}

function Map({route}) {

  const mapRef = useRef<MapView | null>(null);
  const navigation = useNavigation();
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(initialLocation);
  
  const defaultRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const targetRegion = {
    latitude: initialLocation?initialLocation.lat :24.8607,
    longitude:  initialLocation?initialLocation.lng :67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const animateToRegion = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(targetRegion, 1000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      animateToRegion();
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  function selectLocationHandler(event: any) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location picked', 'You have to pick a location first');
      return;
    }
    navigation.navigate('AddPlaces', { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="save"
          size={24}
          color={Colors.primary50}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler,initialLocation]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={defaultRegion}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
