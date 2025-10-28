import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
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
  const [photo, setPhoto] = useState<string | null>(null);
  const [legalDocs, setLegalDocs] = useState<string[]>([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  // ---------------- Permissions & Image picker logic ----------------
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
    } catch {
      return false;
    }
  };

  const handlePickImage = async () => {
    const ok = await ensureMediaPermission();
    if (!ok) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      aspect: [1, 1],
    });
    if (!result.canceled && result.assets?.length) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handlePickSingleLegalDoc = async () => {
    const ok = await ensureMediaPermission();
    if (!ok) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets?.length) {
      setLegalDocs((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const removeLegalDocAt = (idx: number) => {
    setLegalDocs((prev) => prev.filter((_, i) => i !== idx));
  };

  // ---------------- JSX ----------------
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <View style={{ flex: 1, backgroundColor: '#0B1F3A' }}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={{
            padding: 8,
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 10,
          }}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>

        <Image
          style={Sighnupstyles.SighnuptopHalfBackground}
          source={registerimg}
          resizeMode="cover"
        />

        <View
          style={[
            Sighnupstyles.container,
            { backgroundColor: 'transparent', justifyContent: 'center' },
          ]}
        >
          <Text style={Sighnupstyles.RegLabel}>Registration</Text>

          <View style={Splashstyles.formWrap}>
            {/* Name */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="person-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Full name"
                placeholderTextColor="#8FA3BF"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Phone */}
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

            {/* CNIC */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="card-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="CNIC"
                placeholderTextColor="#8FA3BF"
                value={cnic}
                onChangeText={setCnic}
              />
            </View>

            {/* Address */}
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

            {/* Profile photo */}
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
                    style={{ width: 36, height: 36, borderRadius: 18 }}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: '#E2E8F0',
                    }}
                  />
                )}
              </Pressable>
            </View>

            {/* Gender */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="male-female-outline" size={20} style={Splashstyles.leftIcon} />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {['Male', 'Female'].map((g) => (
                  <Pressable
                    key={g}
                    onPress={() => setGender(g)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Ionicons
                      name={gender === g ? 'radio-button-on' : 'radio-button-off'}
                      size={18}
                      style={{ color: '#0B1F3A', marginRight: 6 }}
                    />
                    <Text style={{ color: '#0B1F3A', fontSize: 16 }}>{g}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* ✅ Account Type Dropdown (Inline Selectbox) */}
            <View style={{ marginBottom: 12 }}>
              <Pressable
                onPress={() => setShowAccountDropdown(!showAccountDropdown)}
                style={Splashstyles.inputContainer}
              >
                <Ionicons name="briefcase-outline" size={20} style={Splashstyles.leftIcon} />
                <Text
                  style={{
                    flex: 1,
                    color: accountType ? '#0B1F3A' : '#8FA3BF',
                    fontSize: 16,
                  }}
                >
                  {accountType || 'Select account type'}
                </Text>
                <Ionicons
                  name={showAccountDropdown ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#0B1F3A"
                />
              </Pressable>

              {showAccountDropdown && (
                <View
                  style={{
                    backgroundColor: '#FFF',
                    borderRadius: 8,
                    marginTop: 4,
                    borderWidth: 1,
                    borderColor: '#CBD5E1',
                    overflow: 'hidden',
                  }}
                >
                  {['Agent', 'Customer', 'Seller'].map((opt) => (
                    <Pressable
                      key={opt}
                      onPress={() => {
                        setAccountType(opt);
                        setShowAccountDropdown(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: opt !== 'Seller' ? 1 : 0,
                        borderBottomColor: '#E2E8F0',
                      }}
                    >
                      <Text style={{ color: '#0B1F3A', fontSize: 16 }}>{opt}</Text>
                      {accountType === opt && (
                        <Ionicons name="checkmark" size={18} color="#1A3B6B" />
                      )}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* Agent Legal Docs */}
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
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        overflow: 'hidden',
                        backgroundColor: '#E2E8F0',
                        position: 'relative',
                      }}
                    >
                      <Image
                        source={{ uri }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                      <Pressable
                        onPress={() => removeLegalDocAt(idx)}
                        style={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          backgroundColor: '#FFFFFF',
                          borderRadius: 12,
                          padding: 2,
                        }}
                      >
                        <Ionicons name="close-circle" size={20} color="#0B1F3A" />
                      </Pressable>
                    </View>
                  ))}
                  <Pressable
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
                    <Ionicons name="add" size={24} color="#1A3B6B" />
                  </Pressable>
                </ScrollView>
              </View>
            )}

            {/* Email & Password */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="mail-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Email"
                placeholderTextColor="#8FA3BF"
                keyboardType="email-address"
                autoCapitalize="none"
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
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#1A3B6B"
                />
              </Pressable>
            </View>

            {/* Submit */}
            <View style={{ width: '100%', paddingHorizontal: 24 }}>
              <Pressable
                style={Splashstyles.primaryButton}
                onPress={() => {
                  setSubmitAttempted(true);
                  if (accountType === 'Agent' && legalDocs.length === 0) {
                    Alert.alert('Missing documents', 'Please upload at least one legal document.');
                    return;
                  }
                  // Proceed submit logic...
                }}
              >
                <Text style={Splashstyles.primaryButtonText}>Create account</Text>
              </Pressable>

              <Pressable
                style={Splashstyles.linkCenter}
                onPress={() => router.push('/login')}
              >
                <Text style={Splashstyles.linkText}>Already have an account? Log in</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
