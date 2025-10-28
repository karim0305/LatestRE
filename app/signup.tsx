import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Linking, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import registerimg from '../assets/register_image.jpeg';
import { Sighnupstyles, Splashstyles } from '../styles/style';

export default function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [accountType, setAccountType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [legalDocs, setLegalDocs] = useState<string[]>([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const ensureMediaPermission = async (): Promise<boolean> => {
    try {
      let perm = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
      if (!perm.granted) {
        Alert.alert(
          'Permission required',
          Platform.OS === 'ios'
            ? 'Allow Photo Library access in Settings to pick images.'
            : 'Allow Photos/Media permission to pick images.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  const handlePickImage = async () => {
    try {
      const ok = await ensureMediaPermission();
      if (!ok) return;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        aspect: [1, 1],
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Error', 'Unable to pick image. Please try again.');
    }
  };

  const handlePickLegalDocs = async () => {
    try {
      const ok = await ensureMediaPermission();
      if (!ok) return;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: 0, // 0 == unlimited on supported platforms
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uris = result.assets.map((a) => a.uri);
        setLegalDocs((prev) => {
          const set = new Set(prev);
          uris.forEach((u) => set.add(u));
          return Array.from(set);
        });
      }
    } catch (e) {
      Alert.alert('Error', 'Unable to pick documents. Please try again.');
    }
  };

  const removeLegalDocAt = (idx: number) => {
    setLegalDocs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePickSingleLegalDoc = async () => {
    try {
      const ok = await ensureMediaPermission();
      if (!ok) return;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setLegalDocs((prev) => [...prev, uri]);
      }
    } catch (e) {
      Alert.alert('Error', 'Unable to pick document. Please try again.');
    }
  };

  return (
    <>
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <View style={{ flex: 1, backgroundColor: '#0B1F3A', position: 'relative' }}>
        <View style={Sighnupstyles.SighnuptopHalfBackground} />
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={{ padding: 8, marginRight: 8, position: 'absolute', top: 16, left: 16, zIndex: 10, elevation: 10 }}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>
        <Image
          style={Sighnupstyles.SighnuptopHalfBackground}
          source={registerimg}
          resizeMode="cover"
        />
        <View style={[Sighnupstyles.container, { backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={Sighnupstyles.RegLabel}>Registration</Text>
          <View style={Splashstyles.formWrap}>
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="person-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Full name"
                placeholderTextColor="#8FA3BF"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="call-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Phone"
                placeholderTextColor="#8FA3BF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="card-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="CNIC"
                placeholderTextColor="#8FA3BF"
                autoCapitalize="characters"
                value={cnic}
                onChangeText={setCnic}
              />
            </View>
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="home-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Address"
                placeholderTextColor="#8FA3BF"
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <View style={Splashstyles.inputContainer}>
              <Ionicons name="image-outline" size={20} style={Splashstyles.leftIcon} />
              <Pressable
                accessibilityRole="button"
                onPress={handlePickImage}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Text style={{ color: photo ? '#0B1F3A' : '#8FA3BF', fontSize: 16 }}>
                  {photo ? 'Change profile photo' : 'Upload profile photo'}
                </Text>
                {photo ? (
                  <Image
                    source={{ uri: photo }}
                    style={{ width: 36, height: 36, borderRadius: 18, marginLeft: 8 }}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#E2E8F0' }} />
                )}
              </Pressable>
            </View>

            {accountType === 'Agent' && (
              <></>
            )}

            <View style={Splashstyles.inputContainer}>
              <Ionicons name="male-female-outline" size={20} style={Splashstyles.leftIcon} />
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setGender('Male')}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 6 }}
                >
                  <Ionicons
                    name={gender === 'Male' ? 'radio-button-on' : 'radio-button-off'}
                    size={18}
                    style={{ color: '#0B1F3A', marginRight: 6 }}
                  />
                  <Text style={{ color: '#0B1F3A', fontSize: 16 }}>Male</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setGender('Female')}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 6 }}
                >
                  <Ionicons
                    name={gender === 'Female' ? 'radio-button-on' : 'radio-button-off'}
                    size={18}
                    style={{ color: '#0B1F3A', marginRight: 6 }}
                  />
                  <Text style={{ color: '#0B1F3A', fontSize: 16 }}>Female</Text>
                </Pressable>
              </View>
            </View>
           
            <View>
              <Pressable
                accessibilityRole="button"
                onPress={() => setAccountOpen((o) => !o)}
                style={Splashstyles.inputContainer}
              >
                <Ionicons name="briefcase-outline" size={20} style={Splashstyles.leftIcon} />
                <Text style={{ flex: 1, color: accountType ? '#0B1F3A' : '#8FA3BF', fontSize: 16 }}>
                  {accountType || 'Account type'}
                </Text>
                <Ionicons name={accountOpen ? 'chevron-up' : 'chevron-down'} size={18} style={{ color: '#0B1F3A' }} />
              </Pressable>
              <Modal
                transparent
                animationType="slide"
                visible={accountOpen}
                onRequestClose={() => setAccountOpen(false)}
              >
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                  <Pressable style={{ flex: 1 }} onPress={() => setAccountOpen(false)} />
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      paddingVertical: 8,
                      borderTopWidth: 1,
                      borderColor: '#E2E8F0',
                    }}
                  >
                    <View style={{ alignItems: 'center', paddingVertical: 6 }}>
                      <View style={{ width: 40, height: 4, backgroundColor: '#CBD5E1', borderRadius: 2 }} />
                    </View>
                    {['Agent', 'Customer', 'Seller'].map((opt, idx) => (
                      <Pressable
                        key={opt}
                        accessibilityRole="button"
                        onPress={() => {
                          setAccountType(opt);
                          setAccountOpen(false);
                        }}
                        style={{
                          paddingVertical: 14,
                          paddingHorizontal: 16,
                          backgroundColor: '#FFFFFF',
                          borderTopWidth: idx === 0 ? 0 : 1,
                          borderTopColor: '#E2E8F0',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text style={{ color: '#0B1F3A', fontSize: 16 }}>{opt}</Text>
                        {accountType === opt && (
                          <Ionicons name="checkmark" size={18} style={{ color: '#1A3B6B' }} />
                        )}
                      </Pressable>
                    ))}
                    <View style={{ height: 8 }} />
                  </View>
                </View>
              </Modal>
            
          </View>

          {accountType === 'Agent' && (
            <View style={{ width: '100%', paddingHorizontal: 24, marginTop: 8 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
              >
                {legalDocs.map((uri, idx) => (
                  <View
                    key={`${uri}-${idx}`}
                    style={{ width: 60, height: 60, borderRadius: 8, overflow: 'hidden', backgroundColor: '#E2E8F0', position: 'relative' }}
                  >
                    <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => removeLegalDocAt(idx)}
                      style={{ position: 'absolute', top: -8, right: -8, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 2 }}
                    >
                      <Ionicons name="close-circle" size={20} style={{ color: '#0B1F3A' }} />
                    </Pressable>
                  </View>
                ))}
                <Pressable
                  accessibilityRole="button"
                  onPress={handlePickSingleLegalDoc}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: '#1A3B6B',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <Ionicons name="add" size={24} style={{ color: '#1A3B6B' }} />
                </Pressable>
              </ScrollView>
            </View>
          )}



            <View style={Splashstyles.inputContainer}>
              <Ionicons name="mail-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Email"
                placeholderTextColor="#8FA3BF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Password"
                placeholderTextColor="#8FA3BF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowPassword((p) => !p)}
                style={Splashstyles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  style={Splashstyles.eyeIcon}
                />
              </Pressable>
            </View>



           <View style={{ width: '100%', paddingHorizontal: 24 }}>
            <Pressable
              style={[Splashstyles.primaryButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#1A3B6B', marginBottom: 12 }]}
              onPress={() => setPreviewOpen(true)}
              accessibilityRole="button"
            >
              <Text style={[Splashstyles.primaryButtonText, { color: '#1A3B6B' }]}>View details</Text>
            </Pressable>
            <Pressable
              style={Splashstyles.primaryButton}
              onPress={() => {
                setSubmitAttempted(true);
                if (accountType === 'Agent' && legalDocs.length === 0) {
                  Alert.alert('Missing documents', 'Please upload at least one legal document to continue.');
                  return;
                }
                // proceed with submit logic here
              }}
              accessibilityRole="button"
            >
              <Text style={Splashstyles.primaryButtonText}>Create account</Text>
            </Pressable>
            <Pressable
              style={Splashstyles.linkCenter}
              onPress={() => router.push('/login')}
              accessibilityRole="button"
            >
              <Text style={Splashstyles.linkText}>Already have an account? Log in</Text>
            </Pressable>
          </View>
          </View>

          
          </View>
        </View>
      </SafeAreaView>
  
      <Modal
        transparent
        animationType="slide"
        visible={previewOpen}
        onRequestClose={() => setPreviewOpen(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ flex: 1, backgroundColor: '#0A274D' }}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
              <View style={{ alignItems: 'center', marginBottom: 16 }}>
                <Pressable onPress={() => setPreviewOpen(false)} style={{ position: 'absolute', right: 0, top: 0, padding: 8 }}>
                  <Ionicons name="close" size={22} color="#FFFFFF" />
                </Pressable>
                {photo ? (
                  <Image source={{ uri: photo }} style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 12 }} />
                ) : (
                  <View style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 12, backgroundColor: '#1A3B6B' }} />
                )}
                <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '800' }}>{name || '—'}</Text>
                <Text style={{ color: '#C6D0E0', marginTop: 4 }}>{email || '—'}</Text>
                <View style={{ marginTop: 8, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 9999, backgroundColor: '#1A3B6B' }}>
                  <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>{accountType || '—'}</Text>
                </View>
              </View>

              {accountType === 'Agent' && (
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ color: '#8FA3BF', fontSize: 12, marginBottom: 8 }}>Legal documents</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                    {legalDocs.length === 0 ? (
                      <Text style={{ color: '#C6D0E0' }}>—</Text>
                    ) : (
                      legalDocs.map((uri, idx) => (
                        <Image key={`${uri}-${idx}`} source={{ uri }} style={{ width: 72, height: 72, borderRadius: 8 }} />
                      ))
                    )}
                  </ScrollView>
                </View>
              )}

              <View style={{ gap: 14 }}>
                <View>
                  <Text style={{ color: '#8FA3BF', fontSize: 12 }}>Full name</Text>
                  <Text style={{ color: '#FFFFFF', marginTop: 4 }}>{name || '—'}</Text>
                </View>
                <View>
                  <Text style={{ color: '#8FA3BF', fontSize: 12 }}>Phone</Text>
                  <Text style={{ color: '#FFFFFF', marginTop: 4 }}>{phone || '—'}</Text>
                </View>
                <View>
                  <Text style={{ color: '#8FA3BF', fontSize: 12 }}>CNIC</Text>
                  <Text style={{ color: '#FFFFFF', marginTop: 4 }}>{cnic || '—'}</Text>
                </View>
                <View>
                  <Text style={{ color: '#8FA3BF', fontSize: 12 }}>Address</Text>
                  <Text style={{ color: '#FFFFFF', marginTop: 4 }}>{address || '—'}</Text>
                </View>
                <View>
                  <Text style={{ color: '#8FA3BF', fontSize: 12 }}>Gender</Text>
                  <Text style={{ color: '#FFFFFF', marginTop: 4 }}>{gender || '—'}</Text>
                </View>
                <View>
                  <Text style={{ color: '#8FA3BF', fontSize: 12 }}>Account type</Text>
                  <Text style={{ color: '#FFFFFF', marginTop: 4 }}>{accountType || '—'}</Text>
                </View>
                <View>
                  <Text style={{ color: '#8FA3BF', fontSize: 12 }}>Email</Text>
                  <Text style={{ color: '#FFFFFF', marginTop: 4 }}>{email || '—'}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
    );
}
