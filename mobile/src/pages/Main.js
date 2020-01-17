import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -23.538144, longitude: -46.505781 }}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://api.adorable.io/avatars/285/abott@adorable.png"
          }}
        />

        <Callout
          onPress={() => {
            navigation.navigate("Profile", {
              github_username: "diego3g"
            });
          }}
        >
          <View style={styles.callout}>
            <Text style={styles.devName}>Diego Fernandes</Text>
            <Text style={styles.devBio}>
              CTO na @Rocketseat. Apaixonado pelas melhores tecnologias de
              desenvolvimento web e mobile.
            </Text>
            <Text style={styles.devTechs}>Node.js, ReactJS, React Native</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#fff"
  },
  callout: {
    width: 260
  },
  devName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  devBio: {
    marginTop: 5,
    color: "#666"
  },
  devTechs: {
    marginTop: 5
  }
});

export default Main;
