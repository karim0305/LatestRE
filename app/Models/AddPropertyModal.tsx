import { AddPropertystyles } from '@/styles/style';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  Linking,
  Modal, Platform, Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from '../components/MapView';
import { PropertyItem } from '../types/property';

// Type for extended location with additional properties
type ExtendedLocation = Location.LocationGeocodedLocation & {
  city?: string;
  country?: string;
  region?: string;
  administrativeArea?: string;
};

type AddPropertyModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddProperty: (property: Omit<PropertyItem, '_id' | 'createdAt' | 'updatedAt'>) => void;
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapHint: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 5,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 12,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
  },
  errorText: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#ff3b30',
  },
});

export default function AddPropertyModal({ visible, onClose, onAddProperty }: AddPropertyModalProps) {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); // Add this line
  const propertyTypes = ['sale', 'rent'];
  const propertyCategories = ['apartment', 'house', 'villa', 'office', 'land', 'commercial'];

  const [location, setLocation] = useState({
    latitude: 24.8607, // Default to Islamabad coordinates
    longitude: 67.0011,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Location state management
  const [locationState, setLocationState] = useState<{
    status: 'idle' | 'loading' | 'granted' | 'denied' | 'error';
    error?: string;
  }>({ status: 'idle' });

  // Debounce function to limit the number of API calls
  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return function(this: any, ...args: any[]) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        timeoutId = null;
      }, delay);
    };
  };

  // Function to search for an address
  const searchAddress = useCallback(debounce(async (address: string) => {
    if (!address.trim()) return;
    
    try {
      const results = await Location.geocodeAsync(address);
      if (results.length > 0) {
        const { latitude, longitude } = results[0];
        const newLocation = {
          latitude,
          longitude,
          latitudeDelta: 0.005, // Zoom in closer for search results
          longitudeDelta: 0.005,
        };
        
        setLocation(newLocation);
        
        // Update form data with new location
        setFormData(prev => ({
          ...prev,
          address: address,
          location: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          // Get address components with proper type safety
          city: (results[0] as ExtendedLocation)?.city || (results[0] as ExtendedLocation)?.region || prev.city,
          country: (results[0] as ExtendedLocation)?.country || prev.country,
          state: (results[0] as ExtendedLocation)?.region || (results[0] as ExtendedLocation)?.administrativeArea || prev.state,
        }));
      }
    } catch (error) {
      console.log('Error searching address:', error);
    }
  }, 1000), []); // 1 second debounce

  // Function to request location permission and get current position
  const requestLocation = useCallback(async () => {
    try {
      setLocationState({ status: 'loading' });
      
      // Check if location services are enabled
      const isEnabled = await Location.hasServicesEnabledAsync();
      if (!isEnabled) {
        setLocationState({ 
          status: 'error',
          error: 'Location services are disabled. Please enable them in your device settings.'
        });
        return;
      }

      // Request foreground location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationState({ 
          status: 'denied',
          error: 'Permission to access location was denied. Please enable it in your device settings.'
        });
        return;
      }

      // Get current position with higher accuracy
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // 5 seconds
      });

      const { latitude, longitude } = currentLocation.coords;
      const newLocation = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setLocation(newLocation);
      setLocationState({ status: 'granted' });

      // Update form data with current location
      setFormData(prev => ({
        ...prev,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      }));

      // Reverse geocode to get address
      try {
        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (address.length > 0) {
          const first = address[0];
          setFormData(prev => ({
            ...prev,
            address: `${first.streetNumber ? first.streetNumber + ' ' : ''}${first.street || ''}`.trim(),
            city: first.city || '',
            state: first.region || '',
            country: first.country || 'Pakistan',
          }));
        }
      } catch (geocodeError) {
        console.warn('Error reverse geocoding:', geocodeError);
      }

    } catch (error) {
      console.error('Error getting location:', error);
      setLocationState({ 
        status: 'error',
        error: 'Unable to get your current location. Please try again or enter your address manually.'
      });
    }
  }, []);

  // Call this effect when the component mounts
  useEffect(() => {
    if (Platform.OS !== 'web') {
      requestLocation();
    }
  }, [requestLocation]);

  const handleMapPress = async (e: any) => {
    const { coordinate } = e.nativeEvent;
    setLocation(prev => ({
      ...prev,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    }));
    
    // Update form data with new location
    setFormData(prev => ({
      ...prev,
      location: {
        type: 'Point',
        coordinates: [coordinate.longitude, coordinate.latitude]
      }
    }));

    // Reverse geocode to get address
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });

      if (address.length > 0) {
        const first = address[0];
        setFormData(prev => ({
          ...prev,
          address: formData.address || `${first.streetNumber ? first.streetNumber + ' ' : ''}${first.street || ''}`.trim(),
          city: formData.city || first.city || '',
          state: formData.state || first.region || '',
          country: formData.country || first.country || 'Pakistan',
        }));
      }
    } catch (error) {
      console.log('Reverse geocoding not available, using manual address input', error);
      // If reverse geocoding fails, we'll just keep the existing address values
      // and let the user input them manually
    }
  };

  const [formData, setFormData] = useState<Omit<PropertyItem, '_id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    description: '',
    price: 0,
    currency: 'USD',
    area: 0,
    type: 'sale',
    propertyType: 'apartment',
    images: [],
    videos: [],
    status: 'pending',
    ownerName: '',
    ownerId: '',
    agents: [],
    amenities: [],
    address: '',
    city: '',
    state: '',
    country: 'Pakistan',
    bedrooms: 0,
    bathrooms: 0,
    parkingSpaces: 0,
    floorNumber: 0,
    isFurnished: false,
    availableFrom: new Date().toISOString(),
    contactName: '',
    contactEmail: '',
    contactNumber: '',
    location: { type: 'Point', coordinates: [0, 0] },
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const ensureMediaPermission = async (): Promise<boolean> => {
    let perm = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    if (!perm.granted) {
      Alert.alert('Permission required', 'Please allow photo access in your device settings.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]);
      return false;
    }
    return true;
  };

  const handlePickImage = async () => {
    const ok = await ensureMediaPermission();
    if (!ok) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets?.length) {
      const newImages = result.assets.map(asset => asset.uri);
      setSelectedImages(prev => [...prev, ...newImages]);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const removeImage = (index: number) => {
    Alert.alert('Remove Image', 'Are you sure you want to remove this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          const newImages = [...selectedImages];
          newImages.splice(index, 1);
          setSelectedImages(newImages);
          setFormData(prev => ({
            ...prev,
            images: newImages,
          }));
        },
      },
    ]);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.address || !formData.price) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Please add at least one image');
      return;
    }

    onAddProperty({
      ...formData,
      images: selectedImages,
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={AddPropertystyles.modalOverlay}>
        <View style={AddPropertystyles.modalContent}>
          <View style={AddPropertystyles.modalHeader}>
            <Text style={AddPropertystyles.modalTitle}>Add New Property</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </Pressable>
          </View>

          <ScrollView style={AddPropertystyles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Property Images */}
            <View style={AddPropertystyles.section}>
              <Text style={AddPropertystyles.sectionTitle}>Property Images *</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={AddPropertystyles.imagesContainer}
              >
                <Pressable onPress={handlePickImage} style={AddPropertystyles.addImageButton}>
                  <Ionicons name="add" size={32} color="#666" />
                  <Text style={AddPropertystyles.addImageText}>Add Images</Text>
                  <Text style={AddPropertystyles.imageCount}>
                    {selectedImages.length}{' '}
                    {selectedImages.length === 1 ? 'image' : 'images'} selected
                  </Text>
                </Pressable>

                {selectedImages.map((uri, index) => (
                  <View key={index} style={AddPropertystyles.imageWrapper}>
                    <Image source={{ uri }} style={AddPropertystyles.image} resizeMode="cover" />
                    <Pressable
                      style={AddPropertystyles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <Ionicons name="close" size={16} color="white" />
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Basic Information */}
            <View style={AddPropertystyles.section}>
              <Text style={AddPropertystyles.sectionTitle}>Basic Information</Text>

              <View style={[AddPropertystyles.inputContainer, AddPropertystyles.fieldSpacing]}>
                <Ionicons name="pricetag-outline" size={20} color="#666" />
                <TextInput
                  style={AddPropertystyles.textInput}
                  placeholder="Property Title *"
                  value={formData.title}
                  onChangeText={(text) => setFormData({ ...formData, title: text })}
                />
              </View>

              <View style={[AddPropertystyles.fieldSpacing, { 
                marginBottom: 80,  // Increased from 24 to 32
                zIndex: 1  // Lower z-index than the dropdown
              }]}>
                <View style={[AddPropertystyles.inputContainer, { 
                  alignItems: 'flex-start',
                  paddingTop: 12,
                  paddingBottom: 12, // Increased padding
                  minHeight: 120,
                }]}>
                  <Ionicons 
                    name="document-text-outline" 
                    size={20} 
                    color="#666" 
                    style={{ marginTop: 4, marginRight: 10 }}
                  />
                  <TextInput
                    style={[{
                      flex: 1,
                      height: '100%',
                      textAlignVertical: 'top',
                      padding: 0,
                      margin: 0,
                      fontSize: 16,
                      color: '#1A202C',
                      minHeight: 100,
                    }]}
                    placeholder="Description"
                    placeholderTextColor="#A0AEC0"
                    multiline
                    value={formData.description}
                    onChangeText={(text) => setFormData({ ...formData, description: text })}
                  />
                </View>
              </View>

              <View style={[AddPropertystyles.formRow, AddPropertystyles.fieldSpacing, {
                zIndex: 2  // Higher z-index than the description field
              }]}>
                <View style={[AddPropertystyles.inputContainer, { flex: 2, marginRight: 8 }]}>
                  <Ionicons name="cash-outline" size={20} color="#666" />
                  <TextInput
                    style={AddPropertystyles.textInput}
                    placeholder="Price *"
                    keyboardType="numeric"
                    value={formData.price ? formData.price.toString() : ''}
                    onChangeText={(text) => setFormData({ ...formData, price: Number(text) })}
                  />
                </View>
                <View style={[AddPropertystyles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <TextInput
                    style={AddPropertystyles.textInput}
                    value={formData.currency}
                    onChangeText={(text) => setFormData({ ...formData, currency: text })}
                  />
                </View>
                <View style={[AddPropertystyles.inputContainer, { flex: 1.5, zIndex: 1000 }]}>
                  <Pressable 
                    style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                    onPress={() => {
                      setShowTypeDropdown(!showTypeDropdown);
                      setShowCategoryDropdown(false); // Close category dropdown
                    }}
                  >
                    <Ionicons name="pricetag" size={18} color="#666" style={{ marginRight: 8 }} />
                    <Text style={{ flex: 1, color: formData.type ? '#1A202C' : '#A0AEC0' }}>
                      {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
                    </Text>
                    <Ionicons 
                      name={showTypeDropdown ? 'chevron-up' : 'chevron-down'} 
                      size={16} 
                      color="#666" 
                    />
                  </Pressable>
                  {showTypeDropdown && (
                    <View style={AddPropertystyles.dropdown}>
                      {propertyTypes.map((type) => (
                        <Pressable
                          key={type}
                          style={[AddPropertystyles.dropdownItem, formData.type === type && AddPropertystyles.dropdownItemSelected]}
                          onPress={() => {
                            setFormData({ ...formData, type: type as 'sale' | 'rent' });
                            setShowTypeDropdown(false);
                          }}
                        >
                          <Text style={AddPropertystyles.dropdownItemText}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              <View style={[AddPropertystyles.formRow, AddPropertystyles.fieldSpacing]}>
                <View style={[AddPropertystyles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Ionicons name="home-outline" size={20} color="#666" />
                  <TextInput
                    style={AddPropertystyles.textInput}
                    placeholder="e.g. 34x23"
                    keyboardType="numbers-and-punctuation"
                    value={formData.area ? formData.area.toString().replace('x', '×') : ''}
                    onChangeText={(text) => {
                      // Only allow numbers and 'x' or 'X'
                      const formattedText = text.replace(/[^0-9xX×]/g, '').toLowerCase();
                      // If empty, set to 0
                      if (!formattedText) {
                        setFormData({ ...formData, area: 0 });
                        return;
                      }
                      // If it's a valid format (e.g., 34x23), calculate the area
                      if (/^\d+[x×]\d*$/.test(formattedText)) {
                        const [length, width] = formattedText.split(/[x×]/);
                        if (length && width) {
                          const area = parseFloat(length) * parseFloat(width);
                          setFormData({ ...formData, area });
                        } else if (length) {
                          // If user is still typing the second number
                          setFormData({ ...formData, area: parseFloat(length) });
                        }
                      } else if (/^\d+$/.test(formattedText)) {
                        // If user is still typing the first number
                        setFormData({ ...formData, area: parseFloat(formattedText) });
                      }
                    }}
                  />
                </View>
                <View style={[AddPropertystyles.inputContainer, { flex: 1, zIndex: 1000 }]}>
                  <Pressable 
                    style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                    onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  >
                    <Ionicons name="business-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                    <Text style={{ flex: 1, color: formData.propertyType ? '#1A202C' : '#A0AEC0' }}>
                      {formData.propertyType || 'Select Property Type'}
                    </Text>
                    <Ionicons 
                      name={showCategoryDropdown ? 'chevron-up' : 'chevron-down'} 
                      size={16} 
                      color="#666" 
                    />
                  </Pressable>
                  {showCategoryDropdown && (
                    <View style={AddPropertystyles.dropdown}>
                      {propertyCategories.map((type) => (
                        <Pressable
                          key={type}
                          style={({ pressed }) => [
                            AddPropertystyles.dropdownItem, 
                            formData.propertyType === type && AddPropertystyles.dropdownItemSelected,
                            pressed && { backgroundColor: '#f5f5f5' }
                          ]}
                          onPress={() => {
                            setFormData({ ...formData, propertyType: type });
                            setShowCategoryDropdown(false);
                          }}
                        >
                          <Text style={AddPropertystyles.dropdownItemText}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Text>
                          {formData.propertyType === type && (
                            <Ionicons name="checkmark" size={16} color="#4F46E5" />
                          )}
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Property Details */}
            <View style={AddPropertystyles.section}>
              <Text style={AddPropertystyles.sectionTitle}>Property Details</Text>

              <View style={[AddPropertystyles.formRow, AddPropertystyles.fieldSpacing]}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
                  <Ionicons name="bed-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                  <TextInput
                    style={[AddPropertystyles.textInput, { flex: 1 }]}
                    placeholder="Bedrooms"
                    keyboardType="numeric"
                    value={formData.bedrooms ? formData.bedrooms.toString() : ''}
                    onChangeText={(text) => setFormData({ ...formData, bedrooms: Number(text) })}
                  />
                </View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="water-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                  <TextInput
                    style={[AddPropertystyles.textInput, { flex: 1 }]}
                    placeholder="Bathrooms"
                    keyboardType="numeric"
                    value={formData.bathrooms ? formData.bathrooms.toString() : ''}
                    onChangeText={(text) => setFormData({ ...formData, bathrooms: Number(text) })}
                  />
                </View>
              </View>

              <View style={[AddPropertystyles.formRow, AddPropertystyles.fieldSpacing]}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
                  <Ionicons name="car-sport-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                  <TextInput
                    style={[AddPropertystyles.textInput, { flex: 1 }]}
                    placeholder="Parking Spaces"
                    keyboardType="numeric"
                    value={formData.parkingSpaces ? formData.parkingSpaces.toString() : ''}
                    onChangeText={(text) => setFormData({ ...formData, parkingSpaces: Number(text) })}
                  />
                </View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="layers-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                  <TextInput
                    style={[AddPropertystyles.textInput, { flex: 1 }]}
                    placeholder="Floor Number"
                    keyboardType="numeric"
                    value={formData.floorNumber ? formData.floorNumber.toString() : ''}
                    onChangeText={(text) => setFormData({ ...formData, floorNumber: Number(text) })}
                  />
                </View>
              </View>

              <View style={[AddPropertystyles.formRow, AddPropertystyles.fieldSpacing, { alignItems: 'center' }]}>
                <Ionicons name="cube-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                <Text style={{ marginRight: 16 }}>Furnished</Text>
                <Pressable
                  onPress={() => setFormData({ ...formData, isFurnished: !formData.isFurnished })}
                  style={{
                    width: 50,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: formData.isFurnished ? '#1A3B6B' : '#E2E8F0',
                    justifyContent: 'center',
                    paddingHorizontal: 4,
                  }}
                >
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      backgroundColor: 'white',
                      transform: [{ translateX: formData.isFurnished ? 22 : 0 }],
                    }}
                  />
                </Pressable>
              </View>
            </View>

            {/* Location */}
            <View style={AddPropertystyles.section}>
              <Text style={AddPropertystyles.sectionTitle}>Location</Text>

              <View style={[AddPropertystyles.inputContainer, AddPropertystyles.fieldSpacing]}>
                <Ionicons name="location-outline" size={20} color="#666" />
                <TextInput
                  style={AddPropertystyles.textInput}
                  placeholder="Address *"
                  value={formData.address}
                  onChangeText={(text) => {
                    setFormData(prev => ({ ...prev, address: text }));
                    searchAddress(text);
                  }}
                />
              </View>

              <View style={[styles.mapContainer, AddPropertystyles.fieldSpacing]}>
                {locationState.status === 'loading' && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Getting your location...</Text>
                  </View>
                )}

                {locationState.status === 'denied' || locationState.status === 'error' ? (
                  <View style={styles.errorContainer}>
                   <Ionicons name="alert-circle-outline" size={48} color="#ff3b30" />

                    <Text style={styles.errorText}>{locationState.error}</Text>
                    <Button 
                      title="Try Again" 
                      onPress={requestLocation} 
                      color="#007AFF"
                    />
                  </View>
                ) : (
                  <MapView
                    style={styles.map}
                    region={location}
                    onRegionChangeComplete={handleMapPress}
                    provider="google"
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    showsPointsOfInterest={true}
                    showsBuildings={true}
                    toolbarEnabled={true}
                    moveOnMarkerPress={true}
                    loadingEnabled={true}
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#f8f9fa"
                  >
                    <Marker
                      coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }}
                      title="Property Location"
                      description="Drag to adjust the location"
                      draggable
                      onDragEnd={handleMapPress}
                    />
                  </MapView>
                )}
                <Text style={styles.mapHint}>Tap on the map to set property location or search for an address above</Text>
              </View>

              <View style={[AddPropertystyles.formRow, AddPropertystyles.fieldSpacing]}>
                <View style={[AddPropertystyles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <TextInput
                    style={ AddPropertystyles.textInput}
                    placeholder="City"
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                  />
                </View>
                <View style={[ AddPropertystyles.inputContainer, { flex: 1 }]}>
                  <TextInput
                    style={ AddPropertystyles.textInput}
                    placeholder="State/Province"
                    value={formData.state}
                    onChangeText={(text) => setFormData({ ...formData, state: text })}
                  />
                </View>
              </View>

              <View style={[ AddPropertystyles.inputContainer, AddPropertystyles.fieldSpacing]}>
                <Ionicons name="earth-outline" size={20} color="#666" />
                <TextInput
                  style={ AddPropertystyles.textInput}
                  placeholder="Country"
                  value={formData.country}
                  onChangeText={(text) => setFormData({ ...formData, country: text })}
                />
              </View>
            </View>
          </ScrollView>

          <View style={AddPropertystyles.modalFooter}>
            <Pressable style={[AddPropertystyles.button, AddPropertystyles.cancelButton]} onPress={onClose}>
              <Text style={AddPropertystyles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={[AddPropertystyles.button, AddPropertystyles.submitButton]} onPress={handleSubmit}>
              <Text style={AddPropertystyles.submitButtonText}>Add Property</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
