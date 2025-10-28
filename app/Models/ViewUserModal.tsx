import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import Logo from '../../assets/logo.png';

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

export default function ViewUserBottomSheet({ visible, user, onClose, onEdit }: Props) {
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
      {/* Overlay background */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'flex-end',
        }}
      >
        {/* Bottom sheet container */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingHorizontal: 16,
            paddingTop: 8,
            maxHeight: '85%',
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: -3 },
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          {/* Drag handle */}
          <View style={{ alignItems: 'center', paddingVertical: 8 }}>
            <Pressable onPress={onClose}>
              <View
                style={{
                  width: 40,
                  height: 5,
                  backgroundColor: '#CBD5E1',
                  borderRadius: 3,
                }}
              />
            </Pressable>
          </View>

          {/* Scrollable content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {/* Profile header */}
            <View style={{ alignItems: 'center', marginTop: 12 }}>
              <Image
                source={u.photoUri ? { uri: u.photoUri } : Logo}
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  marginBottom: 8,
                  backgroundColor: '#E2E8F0',
                }}
              />

              <Text
                style={{
                  color: '#0B1F3A',
                  fontSize: 20,
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                {u.name || '—'}
              </Text>

              <Text
                style={{
                  color: '#64748B',
                  fontSize: 14,
                  marginTop: 4,
                  textAlign: 'center',
                }}
              >
                {u.phone || '03030030330'}
              </Text>

              <View
                style={{
                  marginTop: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 9999,
                  backgroundColor: '#1A3B6B',
                }}
              >
                <Text style={{ color: '#FFF', fontWeight: '600' }}>
                  {u.accountType || 'Customer'}
                </Text>
              </View>

             
            </View>

            {/* Divider */}
            <View
              style={{
                height: 1,
                backgroundColor: '#E2E8F0',
                marginVertical: 16,
              }}
            />

            {/* Agent legal docs */}
            {u.accountType === 'Agent' && (
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    color: '#64748B',
                    fontSize: 14,
                    fontWeight: '600',
                    marginBottom: 8,
                  }}
                >
                  Legal Documents
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10 }}
                >
                  {!u.legalDocs || u.legalDocs.length === 0 ? (
                    <Text style={{ color: '#94A3B8' }}>No documents uploaded</Text>
                  ) : (
                    u.legalDocs.map((uri, idx) => (
                      <Image
                        key={`${uri}-${idx}`}
                        source={{ uri }}
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 8,
                          backgroundColor: '#E2E8F0',
                        }}
                      />
                    ))
                  )}
                </ScrollView>
              </View>
            )}

            {/* User info */}
            <View style={{ gap: 14 }}>
              {[
                { icon: 'person-outline', label: 'Full Name', value: u.name },
              
                { icon: 'card-outline', label: 'CNIC', value: u.cnic },
                { icon: 'home-outline', label: 'Address', value: u.address },
                { icon: 'male-female-outline', label: 'Gender', value: u.gender },
                { icon: 'briefcase-outline', label: 'Account Type', value: u.accountType },
                { icon: 'mail-outline', label: 'Email', value: u.email },
                { icon: 'lock-closed-outline', label: 'Password', value: '••••••••' },
              ].map((item, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderBottomWidth: i < 7 ? 1 : 0,
                    borderBottomColor: '#E2E8F0',
                  }}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color="#1A3B6B"
                    style={{ width: 28 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: '#64748B',
                        fontSize: 16,
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </Text>
                    <Text style={{ color: '#0B1F3A', fontSize: 14 }}>
                      {item.value || '—'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
