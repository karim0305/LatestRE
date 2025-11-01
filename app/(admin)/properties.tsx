// ...existing code...
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import AddPropertyModal from '../Models/AddPropertyModal';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/logo.png';

type PropertyItem = {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  area: number;
  type: 'sale' | 'rent';
  propertyType: string;
  images: string[];
  videos: string[];
  status: 'pending' | 'approved' | 'rejected' | 'sold' | 'rented';
  ownerName: string;
  ownerId: string;
  agents: string[];
  amenities: string[];
  address: string;
  city: string;
  state: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  floorNumber: number;
  isFurnished: boolean;
  availableFrom: string | Date;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  createdAt: string | Date;
  updatedAt: string | Date;
};

const SAMPLE_CITIES = ['New York', 'Los Angeles', 'Chicago', 'Austin', 'Boston', 'Miami'];
const AMENITIES = ['Parking', 'AC', 'Heating', 'Gym', 'Pool', 'Pets allowed'];

function rand<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function PropertiesScreen() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [tab, setTab] = useState<'sale' | 'rent'>('sale');
  const [selected, setSelected] = useState<PropertyItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddProperty = (newProperty: Omit<PropertyItem, '_id' | 'createdAt' | 'updatedAt'>) => {
    // Generate a temporary ID for the new property
    const tempId = `temp-${Date.now()}`;
    const newPropertyWithId: PropertyItem = {
      ...newProperty,
      _id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setProperties(prev => [newPropertyWithId, ...prev]);
    setShowAddModal(false);
    // Here you would typically make an API call to save the property to your backend
    // and update the local state with the response from the server
    console.log('Adding new property:', newProperty);
  };

  useEffect(() => {
    let mounted = true;

    fetch('https://dummyjson.com/products?limit=12')
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        const items: PropertyItem[] = (json.products || []).map((p: any, idx: number) => {
          const type: 'sale' | 'rent' = Math.random() > 0.5 ? 'sale' : 'rent';
          const imgs = Array.isArray(p.images) && p.images.length ? p.images : [Logo as any];
          return {
            _id: String(p.id ?? idx),
            title: p.title ?? `Property ${idx + 1}`,
            description: p.description,
            price: Number(p.price ?? Math.floor(Math.random() * 300000) + 500),
            currency: 'USD',
            area: Math.floor(Math.random() * 250) + 20,
            type,
            propertyType: 'apartment',
            images: imgs,
            videos: [],
            status: Math.random() > 0.7 ? 'approved' : 'pending',
            ownerName: `Owner ${idx + 1}`,
            ownerId: `owner-${idx + 1}`,
            agents: Math.random() > 0.6 ? [`Agent ${idx + 1}`] : [],
            amenities: Array.from(new Set(Array.from({ length: 3 }).map(() => rand(AMENITIES)))),
            address: `${Math.floor(Math.random() * 999)} Demo St`,
            city: rand(SAMPLE_CITIES),
            state: 'Demo State',
            country: 'USA',
            bedrooms: Math.floor(Math.random() * 5),
            bathrooms: Math.floor(Math.random() * 3),
            parkingSpaces: Math.floor(Math.random() * 2),
            floorNumber: Math.floor(Math.random() * 10),
            isFurnished: Math.random() > 0.5,
            availableFrom: new Date(Date.now() + Math.floor(Math.random() * 30) * 86400000).toISOString(),
            contactName: `Contact ${idx + 1}`,
            contactEmail: `contact${idx + 1}@example.com`,
            contactNumber: '+1234567890',
            location: { type: 'Point', coordinates: [-122 + Math.random() * 10, 37 + Math.random() * 6] },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        });
        setProperties(items);
      })
      .catch(() => {
        setProperties([
          {
            _id: 'demo-1',
            title: 'Demo Apartment',
            description: 'A nice demo apartment fetched fallback.',
            price: 120000,
            currency: 'USD',
            area: 90,
            type: 'sale',
            propertyType: 'apartment',
            images: [Logo as any],
            videos: [],
            status: 'approved',
            ownerName: 'Demo Owner',
            ownerId: 'demo-owner-1',
            agents: [],
            amenities: ['Parking', 'AC'],
            address: '1 Demo St',
            city: 'Demo City',
            state: 'Demo State',
            country: 'Demo Country',
            bedrooms: 2,
            bathrooms: 1,
            parkingSpaces: 1,
            floorNumber: 3,
            isFurnished: true,
            availableFrom: new Date().toISOString(),
            contactName: 'John Doe',
            contactEmail: 'john@example.com',
            contactNumber: '+1234567890',
            location: { type: 'Point', coordinates: [0, 0] },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      properties
        .filter((p) => p.type === tab)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [properties, tab]
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderImageCarousel = (images: string[]) => (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const slide = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
          setCurrentImageIndex(slide);
        }}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.carouselImage} resizeMode="cover" />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View key={index} style={[styles.paginationDot, index === currentImageIndex && styles.paginationDotActive]} />
        ))}
      </View>
    </View>
  );

  const renderCard = ({ item }: { item: PropertyItem }) => (
    <View style={styles.card}>
      {item.images && item.images.length > 0 ? (
        renderImageCarousel(item.images)
      ) : (
        <Image source={Logo as any} style={styles.cardImage} resizeMode="cover" />
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.propertyType}>{item.propertyType}</Text>
          </View>
          <Text style={styles.cardPrice}>
            {item.currency} {Number(item.price).toLocaleString()}
            {item.type === 'rent' ? '/month' : ''}
          </Text>
        </View>

        <View style={styles.cardLocationContainer}>
          <Ionicons name="location" size={14} color="#94A3B8" />
          <Text style={styles.cardLocation}>
            {[item.address, item.city, item.state, item.country].filter(Boolean).join(', ')}
          </Text>
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="bed" size={16} color="#94A3B8" />
            <Text style={styles.detailText}>{item.bedrooms} Beds</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water" size={16} color="#94A3B8" />
            <Text style={styles.detailText}>{item.bathrooms} Baths</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="resize" size={16} color="#94A3B8" />
            <Text style={styles.detailText}>
              {item.area} {item.currency === 'USD' ? 'sqft' : 'sqm'}
            </Text>
          </View>
          {item.parkingSpaces > 0 && (
            <View style={styles.detailItem}>
              <Ionicons name="car" size={16} color="#94A3B8" />
              <Text style={styles.detailText}>{item.parkingSpaces}</Text>
            </View>
          )}
        </View>

        {item.amenities && item.amenities.length > 0 && (
          <View style={styles.amenitiesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {item.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityTag}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Updated toggleable status footer */}
        <View style={styles.cardFooter}>
          <Pressable
            onPress={() => {
              const nextStatuses: PropertyItem['status'][] = ['pending', 'approved', 'rejected'];
              const currentIndex = nextStatuses.indexOf(item.status);
              const nextStatus = nextStatuses[(currentIndex + 1) % nextStatuses.length];
              setProperties((prev) =>
                prev.map((p) => (p._id === item._id ? { ...p, status: nextStatus } : p))
              );
            }}
            style={[
              styles.statusBadge,
              item.status === 'approved' && { backgroundColor: 'rgba(46, 125, 50, 0.2)' },
              item.status === 'pending' && { backgroundColor: 'rgba(255, 152, 0, 0.2)' },
              item.status === 'rejected' && { backgroundColor: 'rgba(211, 47, 47, 0.2)' },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === 'approved' && { color: '#4CAF50' },
                item.status === 'pending' && { color: '#FF9800' },
                item.status === 'rejected' && { color: '#D32F2F' },
              ]}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </Pressable>

          <View style={styles.cardActions}>
            <Pressable onPress={() => setSelected(item)} style={[styles.actionButton, styles.viewButton]}>
              <Ionicons name="eye" size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>View</Text>
            </Pressable>

            <Pressable onPress={() => {}} style={[styles.actionButton, styles.editButton]}>
              <Ionicons name="pencil" size={14} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Edit</Text>
            </Pressable>

            <Pressable onPress={() => {}} style={[styles.actionButton, styles.deleteButton]}>
              <Ionicons name="trash" size={14} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B1F3A' }} edges={['bottom']}>
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>Properties</Text>
        <Text style={{ color: '#C6D0E0', marginTop: 4 }}>Browse properties for sale or rent</Text>
      </View>

      <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 8 }}>
        {(['sale', 'rent'] as const).map((t) => (
          <Pressable
            key={t}
            onPress={() => setTab(t)}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: tab === t ? '#1A3B6B' : '#0A274D',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: tab === t ? '#274B82' : '#1A3B6B',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600', textTransform: 'capitalize' }}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity 
          style={styles.fab} 
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <AddPropertyModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddProperty={handleAddProperty}
        />
        {loading ? (
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <ActivityIndicator size="large" color="#1A3B6B" />
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(i) => i._id}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={renderCard}
            ListEmptyComponent={() => (
              <View style={{ alignItems: 'center', marginTop: 24 }}>
                <Text style={{ color: '#94A3B8' }}>No properties for {tab} yet.</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Detail Modal */}
      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#0A274D',
              marginTop: 80,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            <View
              style={{
                padding: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>{selected?.title}</Text>
              <Pressable onPress={() => setSelected(null)} style={{ padding: 8 }}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 40 }}>
              <Image
                source={selected && selected.images.length ? { uri: String(selected.images[0]) } : (Logo as any)}
                style={{ width: '100%', height: 200, borderRadius: 8, backgroundColor: '#E2E8F0' }}
                resizeMode="cover"
              />
              {/* ... rest of modal content unchanged ... */}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: { flex: 1, padding: 16, position: 'relative' },
  card: {
    backgroundColor: '#06203a',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#163a63',
  },
  carouselContainer: { position: 'relative', height: 200 },
  carouselImage: { width: Dimensions.get('window').width - 32, height: 200 },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: 10, alignSelf: 'center' },
  paginationDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)', margin: 3 },
  paginationDotActive: { backgroundColor: '#FFFFFF', width: 20 },
  cardImage: { width: '100%', height: 200, backgroundColor: '#E2E8F0' },
  cardContent: { padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  propertyType: { color: '#94A3B8', fontSize: 12, marginTop: 2 },
  cardLocationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', flex: 1, marginRight: 8 },
  cardPrice: { color: '#4CAF50', fontSize: 16, fontWeight: '700' },
  cardLocation: { color: '#94A3B8', marginBottom: 12 },
  cardDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A3B6B',
    gap: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26,59,107,0.3)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  detailText: { color: '#C6D0E0', fontSize: 12, marginLeft: 4 },
  amenitiesContainer: { marginBottom: 12 },
  amenityTag: {
    backgroundColor: 'rgba(26,59,107,0.3)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  amenityText: { color: '#C6D0E0', fontSize: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 6, flex: 1 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    gap: 4,
    minWidth: 80,
  },
  viewButton: { backgroundColor: '#1A3B6B' },
  editButton: { backgroundColor: '#3B82F6' },
  deleteButton: { backgroundColor: '#EF4444' },
  actionButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A3B6B',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
});
