// ...existing code...
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/logo.png';

type PropertyItem = {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency?: string;
  area?: number;
  type: 'sale' | 'rent';
  images: string[];
  status?: string;
  ownerName?: string;
  agents?: string[];
  amenities?: string[];
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  bedrooms?: number;
  bathrooms?: number;
  availableFrom?: string | Date;
  location?: { coordinates: [number, number] };
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

  useEffect(() => {
    let mounted = true;

    // Fetch dummy data and map to the Property schema shape
    fetch('https://dummyjson.com/products?limit=12')
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        const items: PropertyItem[] = (json.products || []).map((p: any, idx: number) => {
          const type: 'sale' | 'rent' = Math.random() > 0.5 ? 'sale' : 'rent';
          const imgs = Array.isArray(p.images) && p.images.length ? p.images : [Logo as any];
          return {
            id: String(p.id ?? idx),
            title: p.title ?? `Property ${idx + 1}`,
            description: p.description,
            price: Number(p.price ?? Math.floor(Math.random() * 300000) + 500),
            currency: 'USD',
            area: Math.floor(Math.random() * 250) + 20,
            type,
            images: imgs,
            status: Math.random() > 0.7 ? 'sold' : 'available',
            ownerName: `Owner ${idx + 1}`,
            agents: Math.random() > 0.6 ? [`Agent ${idx + 1}`] : [],
            amenities: Array.from(new Set(Array.from({ length: 3 }).map(() => rand(AMENITIES)))),
            address: `${Math.floor(Math.random() * 999)} Demo St`,
            city: rand(SAMPLE_CITIES),
            state: 'Demo State',
            country: 'USA',
            bedrooms: Math.floor(Math.random() * 5),
            bathrooms: Math.floor(Math.random() * 3),
            availableFrom: new Date(Date.now() + Math.floor(Math.random() * 30) * 86400000).toISOString(),
            location: { coordinates: [-122 + Math.random() * 10, 37 + Math.random() * 6] as [number, number] },
          };
        });
        setProperties(items);
      })
      .catch(() => {
        setProperties([
          {
            id: 'demo-1',
            title: 'Demo Apartment',
            description: 'A nice demo apartment fetched fallback.',
            price: 120000,
            currency: 'USD',
            area: 90,
            type: 'sale',
            images: [Logo as any],
            status: 'available',
            ownerName: 'Demo Owner',
            agents: [],
            amenities: ['Parking', 'AC'],
            address: '1 Demo St',
            city: 'Demo City',
            state: 'Demo State',
            country: 'Demo Country',
            bedrooms: 2,
            bathrooms: 1,
            availableFrom: new Date().toISOString(),
            location: { coordinates: [0, 0] },
          },
        ]);
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => properties.filter((p) => p.type === tab), [properties, tab]);

  const renderCard = ({ item }: { item: PropertyItem }) => (
    <View
      style={{
        backgroundColor: '#06203a',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#163a63',
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <Image
        source={item.images && item.images.length ? { uri: String(item.images[0]) } : (Logo as any)}
        style={{ width: 84, height: 72, borderRadius: 8, backgroundColor: '#E2E8F0' }}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>{item.title}</Text>
        <Text style={{ color: '#C6D0E0', marginTop: 4 }}>
          {item.city} • {item.bedrooms ?? 0} bd • {item.bathrooms ?? 0} ba
        </Text>
        <Text style={{ color: '#C6D0E0', marginTop: 6, fontWeight: '700' }}>
          {item.currency ?? 'USD'} {Number(item.price ?? 0).toLocaleString()} {item.type === 'rent' ? '/ month' : ''}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Pressable
          onPress={() => setSelected(item)}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            backgroundColor: '#1A3B6B',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>View</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B1F3A' }} edges={['bottom']}>
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>Properties</Text>
        <Text style={{ color: '#C6D0E0', marginTop: 4 }}>Browse properties for sale or rent</Text>
      </View>

      {/* Tabs */}
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
            <Text style={{ color: '#FFFFFF', fontWeight: '600', textTransform: 'capitalize' }}>
              {t}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 16 }}>
        {loading ? (
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <ActivityIndicator size="large" color="#1A3B6B" />
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(i) => i.id}
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
          <View style={{ flex: 1, backgroundColor: '#0A274D', marginTop: 80, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
                <Text style={{ color: '#C6D0E0' }}>
                  {selected?.city ?? '—'} • {selected?.bedrooms ?? 0} bd • {selected?.bathrooms ?? 0} ba
                </Text>
                <Text style={{ color: '#FFFFFF', fontWeight: '800' }}>
                  {selected?.currency} {selected?.price?.toLocaleString()} {selected?.type === 'rent' ? '/ month' : ''}
                </Text>
              </View>

              <View style={{ marginTop: 12 }}>
                <Text style={{ color: '#8FA3BF', fontSize: 12 }}>Address</Text>
                <Text style={{ color: '#FFFFFF', marginTop: 6 }}>{selected?.address ?? '—'}</Text>
              </View>

              <View style={{ marginTop: 12 }}>
                <Text style={{ color: '#8FA3BF', fontSize: 12 }}>Description</Text>
                <Text style={{ color: '#FFFFFF', marginTop: 6 }}>{selected?.description ?? '—'}</Text>
              </View>

              <View style={{ marginTop: 12 }}>
                <Text style={{ color: '#8FA3BF', fontSize: 12 }}>Amenities</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                  {(selected?.amenities ?? []).map((a) => (
                    <View key={a} style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, backgroundColor: '#11253a', marginRight: 8, marginBottom: 8 }}>
                      <Text style={{ color: '#C6D0E0' }}>{a}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={{ marginTop: 12 }}>
                <Text style={{ color: '#8FA3BF', fontSize: 12 }}>Contact</Text>
                <Text style={{ color: '#FFFFFF', marginTop: 6 }}>{selected?.ownerName ?? '—'}</Text>
                <Text style={{ color: '#94A3B8' }}>{(selected?.agents && selected.agents.length) ? selected.agents.join(', ') : 'No agents'}</Text>
              </View>

              <View style={{ marginTop: 18, flexDirection: 'row', gap: 12 }}>
                <Pressable style={{ flex: 1, paddingVertical: 12, backgroundColor: '#1A3B6B', borderRadius: 8, alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>Contact Owner</Text>
                </Pressable>
                <Pressable style={{ flex: 1, paddingVertical: 12, backgroundColor: '#163a63', borderRadius: 8, alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>Request Visit</Text>
                </Pressable>
              </View>

              <View style={{ height: 24 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}