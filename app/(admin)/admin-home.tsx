import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/logo.png';
import ViewUserModal from '../Models/ViewUserModal';
import AddUserModal from '../Models/addUser';
import EditUserModal from '../Models/EditUser';

type User = { id: string; name: string; phone: string; address: string };

export default function AdminHome() {
  const [tab, setTab] = useState<'Customer' | 'Agent' | 'Admin'>('Customer');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [addUserVisible, setAddUserVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<any>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Users',
      headerTitleAlign: 'left',
      headerStyle: { backgroundColor: '#0B1F3A' },
      headerTintColor: '#FFFFFF',
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
          <Pressable
            onPress={() => {}}
            style={{ padding: 8, marginLeft: 8, borderRadius: 8, backgroundColor: '#0A274D' }}
            hitSlop={8}
          >
            <Ionicons name="funnel-outline" size={18} color="#FFFFFF" />
          </Pressable>

          <Pressable
            onPress={() => {}}
            style={{ padding: 8, marginLeft: 8, borderRadius: 8, backgroundColor: '#0A274D' }}
          >
            <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
          </Pressable>

          {/* <Pressable
            onPress={() => setAddUserVisible(true)}
            style={{ padding: 8, marginLeft: 8, borderRadius: 8, backgroundColor: '#1A3B6B' }}
          >
            <Ionicons name="add-outline" size={20} color="#FFFFFF" />
          </Pressable> */}
        </View>
      ),
    });
  }, [navigation]);

  const customers: User[] = [
    { id: 'c1', name: 'Alice Johnson', phone: '+1 (555) 123-4567', address: '123 Maple St, Springfield' },
    { id: 'c2', name: 'Bob Smith', phone: '+1 (555) 987-6543', address: '456 Oak Ave, Rivertown' },
    { id: 'c3', name: 'Carol Lee', phone: '+1 (555) 222-3344', address: '789 Pine Rd, Lakeview' },
  ];

  const agents: User[] = [
    { id: 'a1', name: 'Dana Williams', phone: '+1 (555) 444-5566', address: '12 Market St, Capital City' },
    { id: 'a2', name: 'Evan Brooks', phone: '+1 (555) 777-8899', address: '34 River Dr, Brookfield' },
  ];

  const admins: User[] = [
    { id: 'ad1', name: 'Franklin Reed', phone: '+1 (555) 101-2020', address: '90 Summit Blvd, Hillcrest' },
  ];

  const data = tab === 'Customer' ? customers : tab === 'Agent' ? agents : admins;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B1F3A' }} edges={['bottom']}>
      {/* Search Input */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#C6D0E0"
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: '#0A274D',
            color: '#FFFFFF',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#1A3B6B',
            width: '100%',
          }}
          returnKeyType="search"
          onSubmitEditing={() => {}}
        />
      </View>

      {/* Body */}
      <View style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 24 }}>
        {/* Tabs */}
        <View style={{ flexDirection: 'row', marginTop: 8, backgroundColor: '#0A274D', borderRadius: 10, padding: 4 }}>
          {['Customer', 'Agent', 'Admin'].map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t as 'Customer' | 'Agent' | 'Admin')}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: tab === t ? '#1A3B6B' : 'transparent',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>{t}</Text>
            </Pressable>
          ))}
        </View>

        {/* User List */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#0A274D',
                borderRadius: 12,
                padding: 12,
                borderWidth: 1,
                borderColor: '#1A3B6B',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image source={Logo} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ color: '#C6D0E0', marginTop: 2, fontSize: 12 }}>{item.phone}</Text>
                <Text style={{ color: '#C6D0E0', marginTop: 2, fontSize: 12 }} numberOfLines={1}>
                  {item.address}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable
                  onPress={() => {
                    // Handle view action
                    setSelectedUser(item);
                    setSheetVisible(true);
                  }}
                  style={({ pressed }) => ({
                    padding: 8,
                    borderRadius: 8,
                    marginLeft: 4,
                    backgroundColor: pressed ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  })}
                >
                  <Ionicons name="eye-outline" size={20} color="#4FD1C5" />
                </Pressable>
                
                <Pressable
                  onPress={() => {
                    setEditingUser(item);
                  }}
                  style={({ pressed }) => ({
                    padding: 8,
                    borderRadius: 8,
                    marginLeft: 4,
                    backgroundColor: pressed ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  })}
                >
                  <Ionicons name="pencil-outline" size={20} color="#F6AD55" />
                </Pressable>
                
                <Pressable
                  onPress={() => {
                    // Handle delete action with confirmation
                    Alert.alert(
                      'Delete User',
                      `Are you sure you want to delete ${item.name}?`,
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'Delete',
                          style: 'destructive',
                          onPress: () => {
                            // Implement delete functionality here
                            console.log('Delete user:', item.id);
                            // Example: handleDeleteUser(item.id);
                          },
                        },
                      ]
                    );
                  }}
                  style={({ pressed }) => ({
                    padding: 8,
                    borderRadius: 8,
                    marginLeft: 4,
                    backgroundColor: pressed ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  })}
                >
                  <Ionicons name="trash-outline" size={20} color="#FC8181" />
                </Pressable>
              </View>
            </View>
          )}
        />

        {/* Modals */}
        <ViewUserModal visible={sheetVisible} user={selectedUser} onClose={() => setSheetVisible(false)} />
      <AddUserModal
        visible={addUserVisible}
        onClose={() => setAddUserVisible(false)}
      />
      
      <EditUserModal
        visible={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={(updatedUser) => {
          // Handle the updated user data
          console.log('Updated user:', updatedUser);
          // Here you would typically update the user in your state/backend
          // For example:
          // updateUserInList(updatedUser);
          setEditingUser(null);
        }}
      />
      </View>

      {/* Floating Button */}
      <Pressable
        onPress={() => setAddUserVisible(true)}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#1A3B6B',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}
