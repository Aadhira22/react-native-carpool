import React, { useEffect, useState } from "react";
import { View, StyleSheet, PermissionsAndroid } from "react-native";
import { WebView } from "react-native-webview";
import Geolocation from "react-native-geolocation-service";

const MapScreen = () => {
  const [location, setLocation] = useState(null);

  // Request location permission & fetch location
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  // Map HTML (Leaflet.js with OpenStreetMap)
  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css"/>
      <style>
        #map { height: 100vh; width: 100vw; }
        .search-bar {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: 80%;
          padding: 10px;
          background: white;
          border-radius: 5px;
          box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
        }
      </style>
    </head>
    <body>
      <input type="text" id="searchBox" class="search-bar" placeholder="Search for a place..." />
      <div id="map"></div>

      <script>
        var map = L.map('map').setView([${location?.latitude || 20}, ${location?.longitude || 78}], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Show user location
        var userMarker = L.marker([${location?.latitude || 20}, ${location?.longitude || 78}], { color: "blue" })
          .addTo(map)
          .bindPopup("You are here")
          .openPopup();

        // Search functionality
        var searchBox = document.getElementById("searchBox");
        searchBox.addEventListener("change", function () {
          fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + searchBox.value)
            .then(response => response.json())
            .then(data => {
              if (data.length > 0) {
                var lat = data[0].lat;
                var lon = data[0].lon;
                var marker = L.marker([lat, lon]).addTo(map).bindPopup(searchBox.value).openPopup();
                map.setView([lat, lon], 13);
              } else {
                alert("Location not found");
              }
            });
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView source={{ html: mapHtml }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default MapScreen;