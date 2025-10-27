import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import Logo from '../../assets/logo.png';

export default function AdminLayout() {
  const CustomDrawerContent = (props: any) => (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={{ paddingVertical: 24, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={Logo} style={{ width: 72, height: 72, borderRadius: 36, marginBottom: 10 }} />
        <Text style={{ color: '#0B1F3A', fontSize: 16, fontWeight: '700' }}>John Doe</Text>
        <Text style={{ color: '#1A3B6B', fontSize: 12, marginTop: 2 }}>Administrator</Text>
      </View>
      <View style={{ height: 1, backgroundColor: '#E5E7EB' }} />
      <View style={{ paddingTop: 8 }}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Properties"
          labelStyle={{ color: '#0B1F3A' }}
          icon={({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )}
          onPress={() => { /* TODO: navigate to Properties */ }}
        />
        <DrawerItem
          label="Logout"
          labelStyle={{ color: '#B00020' }}
          icon={({ size }) => (
            <Ionicons name="log-out-outline" size={size} color="#B00020" />
          )}
          onPress={() => { /* TODO: handle logout */ }}
        />
      </View>
    </DrawerContentScrollView>
  );
  const HamburgerIcon = ({ color = '#FFFFFF' }: { color?: string }) => (
    <View style={{ gap: 3, alignItems: 'flex-start' }}>
      <View style={{ width: 24, height: 2, borderRadius: 1, backgroundColor: color }} />
      <View style={{ width: 18, height: 2, borderRadius: 1, backgroundColor: color }} />
      <View style={{ width: 12, height: 2, borderRadius: 1, backgroundColor: color }} />
    </View>
  );

  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#0B1F3A' },
        headerTintColor: '#FFFFFF',
        drawerActiveTintColor: '#1A3B6B',
        drawerInactiveTintColor: '#0B1F3A',
        drawerStyle: { width: 200 },
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer?.()}
            style={{ paddingHorizontal: 12, paddingVertical: 8 }}
            android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: true }}
          >
            <HamburgerIcon color="#FFFFFF" />
          </Pressable>
        ),
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 8 }}>
              <Pressable
                onPress={() => { /* TODO: open notifications */ }}
                style={{ padding: 8, marginRight: 8, borderRadius: 8, backgroundColor: '#0A274D' }}
              >
                <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
              </Pressable>
            </View>
          ),
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="admin-home"
        options={{
          title: 'Admin Home',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginRight: 8 }}>Users</Text>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor="#C6D0E0"
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
                  onSubmitEditing={() => { /* TODO: trigger search */ }}
                />
              </View>
              <Pressable
                onPress={() => { /* TODO: open filters */ }}
                style={{ padding: 8, marginLeft: 8, borderRadius: 8, backgroundColor: '#0A274D' }}
                hitSlop={8}
              >
                <Ionicons name="funnel-outline" size={18} color="#FFFFFF" />
              </Pressable>
            </View>
          ),
          headerTitleContainerStyle: { flex: 1 },
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 8 }}>
              <Pressable
                onPress={() => { /* TODO: open notifications */ }}
                style={{ padding: 8, marginRight: 8, borderRadius: 8, backgroundColor: '#0A274D' }}
              >
                <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
              </Pressable>
              <Pressable
                onPress={() => { /* TODO: add user */ }}
                style={{ padding: 8, borderRadius: 8, backgroundColor: '#1A3B6B' }}
              >
                <Ionicons name="add-outline" size={20} color="#FFFFFF" />
              </Pressable>
            </View>
          ),
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
