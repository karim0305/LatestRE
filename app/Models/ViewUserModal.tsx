import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import Logo from '../../assets/logo.png';
import { Splashstyles } from '../../styles/style';

export type UserSummary = {
  id: string;
  name: string;
  phone: string;
  address: string;
  email?: string;
  gender?: string;
  cnic?: string;
  accountType?: string;
  photoUri?: string | null;
  legalDocs?: string[];
  password?: string;
};

type Props = {
  visible: boolean;
  user: UserSummary | null;
  onClose: () => void;
  onEdit?: () => void;
};

export default function ViewUserModal({ visible, user, onClose, onEdit }: Props) {
  const defaultUser: UserSummary = {
    id: 'demo',
    name: 'John Doe',
    phone: '+1 (555) 000-0000',
    address: '123 Demo Street, Sample City',
    email: 'john.doe@example.com',
    gender: 'Male',
    cnic: '35202-1234567-1',
    accountType: 'Agent',
    photoUri: null,
    legalDocs: [],
    password: 'password123',
  };
  const u: UserSummary = user ?? defaultUser;
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <View style={{ flex: 1, backgroundColor: '#0A274D' }}>
          <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <Pressable onPress={onClose} style={{ position: 'absolute', right: 0, top: 0, padding: 8 }}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </Pressable>
              {u.photoUri ? (
                <Image source={{ uri: u.photoUri }} style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 12 }} />
              ) : (
                <Image source={Logo} style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 12 }} />
              )}
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '800' }}>{u.name || '—'}</Text>
              <Text style={{ color: '#C6D0E0', marginTop: 4 }}>{u.email || '—'}</Text>
              <View style={{ marginTop: 8, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 9999, backgroundColor: '#1A3B6B' }}>
                <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>{u.accountType || '—'}</Text>
              </View>
              <Pressable
                onPress={() => { if (onEdit) onEdit(); }}
                style={{ marginTop: 10, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 9999, backgroundColor: '#1A3B6B' }}
                accessibilityRole="button"
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Edit</Text>
              </Pressable>
            </View>

            {u.accountType === 'Agent' && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: '#8FA3BF', fontSize: 12, marginBottom: 8 }}>Legal documents</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                  {!u.legalDocs || u.legalDocs.length === 0 ? (
                    <Text style={{ color: '#C6D0E0' }}>—</Text>
                  ) : (
                    u.legalDocs.map((uri, idx) => (
                      <Image key={`${uri}-${idx}`} source={{ uri }} style={{ width: 72, height: 72, borderRadius: 8 }} />
                    ))
                  )}
                </ScrollView>
              </View>
            )}

            <View style={{ gap: 12 }}>
              <View style={Splashstyles.inputContainer}>
                <Ionicons name="person-outline" size={20} style={Splashstyles.leftIcon} />
                <Text style={Splashstyles.textInput}>{u.name || '—'}</Text>
              </View>
              <View style={Splashstyles.inputContainer}>
                <Ionicons name="call-outline" size={20} style={Splashstyles.leftIcon} />
                <Text style={Splashstyles.textInput}>{u.phone || '—'}</Text>
              </View>
              <View style={Splashstyles.inputContainer}>
                <Ionicons name="card-outline" size={20} style={Splashstyles.leftIcon} />
                <Text style={Splashstyles.textInput}>{u.cnic || '—'}</Text>
              </View>
              <View style={Splashstyles.inputContainer}>
                <Ionicons name="home-outline" size={20} style={Splashstyles.leftIcon} />
                <Text style={Splashstyles.textInput}>{u.address || '—'}</Text>
              </View>
              <View style={Splashstyles.inputContainer}>
                <Ionicons name="male-female-outline" size={20} style={Splashstyles.leftIcon} />
                <Text style={Splashstyles.textInput}>{u.gender || 'Male'}</Text>
              </View>
              <View style={Splashstyles.inputContainer}>
                <Ionicons name="briefcase-outline" size={20} style={Splashstyles.leftIcon} />
                <Text style={Splashstyles.textInput}>{u.accountType || 'Agent'}</Text>
              </View>
              <View style={Splashstyles.inputContainer}>
                <Ionicons name="mail-outline" size={20} style={Splashstyles.leftIcon} />
                <Text style={Splashstyles.textInput}>{u.email || 'momin@gmail.com'}</Text>
              </View>
              <View style={Splashstyles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} style={Splashstyles.leftIcon} />
                <Text style={Splashstyles.textInput}>{u.password ? '••••••••' : '********'}</Text>
             
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
