import * as React from 'react';
import { Platform, View, Text, StyleSheet, ViewStyle, PlatformOSType } from 'react-native';

type MapViewProps = {
  style?: ViewStyle;
  region?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  onRegionChangeComplete?: (region: any) => void;
  children?: React.ReactNode;
  provider?: 'google' | 'apple';
  showsUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  showsCompass?: boolean;
  showsPointsOfInterest?: boolean;
  showsBuildings?: boolean;
  toolbarEnabled?: boolean;
  moveOnMarkerPress?: boolean;
  loadingEnabled?: boolean;
  loadingIndicatorColor?: string;
  loadingBackgroundColor?: string;
};

const MapView: React.FC<MapViewProps> = ({
  style,
  region,
  onRegionChangeComplete,
  children,
  provider,
  showsUserLocation,
  showsMyLocationButton,
  showsCompass,
  showsPointsOfInterest,
  showsBuildings,
  toolbarEnabled,
  moveOnMarkerPress,
  loadingEnabled,
  loadingIndicatorColor,
  loadingBackgroundColor,
}) => {
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, style]}>
        <Text>Interactive map is not supported on web in this demo</Text>
        {region && (
          <>
            <Text>Latitude: {region.latitude.toFixed(6)}</Text>
            <Text>Longitude: {region.longitude.toFixed(6)}</Text>
          </>
        )}
      </View>
    );
  }

  // Use dynamic import for native platforms
  let RNMapView;
  try {
    RNMapView = require('react-native-maps').default;
  } catch (error) {
    console.warn('react-native-maps not available:', error);
    return (
      <View style={[styles.container, style]}>
        <Text>Map is not available on this platform</Text>
      </View>
    );
  }
  
  return (
    <RNMapView
      style={[styles.container, style]}
      region={region}
      onRegionChangeComplete={onRegionChangeComplete}
      provider={provider}
      showsUserLocation={showsUserLocation}
      showsMyLocationButton={showsMyLocationButton}
      showsCompass={showsCompass}
      showsPointsOfInterest={showsPointsOfInterest}
      showsBuildings={showsBuildings}
      toolbarEnabled={toolbarEnabled}
      moveOnMarkerPress={moveOnMarkerPress}
      loadingEnabled={loadingEnabled}
      loadingIndicatorColor={loadingIndicatorColor}
      loadingBackgroundColor={loadingBackgroundColor}
    >
      {children}
    </RNMapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default MapView;
