import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { Center, NativeBaseProvider } from 'native-base';
import userCircle from './assets/bat.png';

export default function App() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 47.6062,
    longitude: -122.3321,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  });

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access current location was denied!');
      return;
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {errorMsg ? (
          <Text>{errorMsg}</Text>
        ) : (
          <Center>
            <MapView style={styles.map} region={mapRegion}>
              <Marker
                coordinate={mapRegion}
                title='Marker'
                image={userCircle}
                tappable={true}
              />
            </MapView>
          </Center>
        )}
      </View>
      <Button
        title='Get my location'
        color='red'
        onPress={getUserLocation}
        style={styles.button}
      />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
});

// import React, { useEffect, useState } from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
// import * as Location from 'expo-location';
// import { Center, NativeBaseProvider } from 'native-base';
// import userCircle from './assets/bat.png';

// export default function App() {
//   // const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 47.6062,
//     longitude: -122.3321,
//     latitudeDelta: 8.5,
//     longitudeDelta: 8.5,
//   });

//   const userFlot = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       setErrorMsg('Permission to access current location was denied!');
//     }
//     let location = await Location.getCurrentPositionAsync({ enableHigAccuracy: true });
//     setMapRegion({
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       altitude: location.coords.altitude,
//       latitudeDelta: 8.5,
//       longitudeDelta: 8.5,
//     });
//     console.log(location);
//   }

//   useEffect(() => {
//     userFlot();
//   }, [])

//   return (
//     < NativeBaseProvider>
//       <View style={styles.container}>
//         {
//           errorMsg ? <Text>Permission Denied</Text> :
//             < Center>
//               <MapView style={styles.map}
//                 mapRegion={mapRegion}
//               >
//                 <Marker
//                   coordinate={mapRegion}
//                   title='Marker'
//                   image={userCircle}
//                   onPress={userFlot}
//                   tappable={true}
//                   style={{ backgroundColor: 'red', padding: 10 }} />
//               </MapView>
//             </Center>
//         }
//       </View>
//       <Button
//         title='Get my location'
//         color='red'
//         onPress={userFlot}
//         style={{
//           alignItems: 'center',
//           justifyContent: 'center',
//           paddingVertical: 12,
//           paddingHorizontal: 32,
//           borderRadius: 4,
//           elevation: 3,
//           backgroundColor: 'black'
//         }} />
//     </NativeBaseProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });