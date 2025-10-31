import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
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
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          ),
        }}
      />
    <Drawer.Screen
  name="admin-home"
  options={{
    title: 'Admin Home',
    drawerIcon: ({ color, size }) => (
      <Ionicons name="person-circle-outline" size={size} color={color} />
    ),
  }}
/>
<Drawer.Screen
  name="properties"
  options={{
    title: 'Properties',
    drawerIcon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="home-outline" size={size} color={color} />
    ),
  }}
/>
    </Drawer>
    
  );
}
