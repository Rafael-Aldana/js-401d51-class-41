import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Button, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 47.6062,
    longitude: -122.3321,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  });

  const userFlot = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      setErrorMsg('Permission to access current location was denied!');
    }
    let location = await Location.getCurrentPositionAsync({enableHigAccuracy: true});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 8.5,
      longitudeDelta: 8.5,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  }

  useEffect(() => {
    userFlot();
  }, [])
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      mapRegion={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Marker'/>
        </MapView>
        <Button title='Get my location' onPress={userFlot}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});