import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable, FlatList, Image } from 'react-native';
import Logo from '../../assets/logo.png';
import { Ionicons } from '@expo/vector-icons';
import ViewUserModal from '../Models/ViewUserModal';

export default function AdminHome() {
  const [tab, setTab] = useState<'Customer' | 'Agent' | 'Admin'>('Customer');
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string; phone: string; address: string } | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const customers = [
    { id: 'c1', name: 'Alice Johnson', phone: '+1 (555) 123-4567', address: '123 Maple St, Springfield' },
    { id: 'c2', name: 'Bob Smith', phone: '+1 (555) 987-6543', address: '456 Oak Ave, Rivertown' },
    { id: 'c3', name: 'Carol Lee', phone: '+1 (555) 222-3344', address: '789 Pine Rd, Lakeview' },
  ];
  const agents = [
    { id: 'a1', name: 'Dana Williams', phone: '+1 (555) 444-5566', address: '12 Market St, Capital City' },
    { id: 'a2', name: 'Evan Brooks', phone: '+1 (555) 777-8899', address: '34 River Dr, Brookfield' },
  ];
  const admins = [
    { id: 'ad1', name: 'Franklin Reed', phone: '+1 (555) 101-2020', address: '90 Summit Blvd, Hillcrest' },
  ];

  const data = tab === 'Customer' ? customers : tab === 'Agent' ? agents : admins;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B1F3A' }} edges={['bottom']}>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 24, paddingTop: 0 }}>
        

        <View style={{ flexDirection: 'row', marginTop: 0, backgroundColor: '#0A274D', borderRadius: 10, padding: 4 }}>
          <Pressable
            onPress={() => setTab('Customer')}
            style={{ flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: tab === 'Customer' ? '#1A3B6B' : 'transparent', alignItems: 'center' }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Customer</Text>
          </Pressable>
          <Pressable
            onPress={() => setTab('Agent')}
            style={{ flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: tab === 'Agent' ? '#1A3B6B' : 'transparent', alignItems: 'center' }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Agent</Text>
          </Pressable>
          <Pressable
            onPress={() => setTab('Admin')}
            style={{ flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: tab === 'Admin' ? '#1A3B6B' : 'transparent', alignItems: 'center' }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Admin</Text>
          </Pressable>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: '#0A274D', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#1A3B6B', flexDirection: 'row', alignItems: 'center' }}>
              <Image source={Logo} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ color: '#C6D0E0', marginTop: 2, fontSize: 12 }}>{item.phone}</Text>
                <Text style={{ color: '#C6D0E0', marginTop: 2, fontSize: 12 }} numberOfLines={1}>{item.address}</Text>
              </View>
              <Pressable
                onPress={() => { setSelectedUser(item); setSheetVisible(true); }}
                style={{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#1A3B6B', borderRadius: 8 }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>View</Text>
              </Pressable>
            </View>
          )}
        />

        <ViewUserModal visible={sheetVisible} user={selectedUser} onClose={() => setSheetVisible(false)} />
      </View>
    </SafeAreaView>
  );
}
