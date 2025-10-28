import registerimg from '@/assets/register_image.jpeg';
import { Splashstyles } from '@/styles/style';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupModal() {
  const [visible, setVisible] = useState(true);
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
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  // Media permission logic (same as before)
  const ensureMediaPermission = async (): Promise<boolean> => {
    let perm = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!perm.granted) perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        'Permission required',
        'Please allow photo access in your device settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
    return true;
  };

  const handlePickImage = async () => {
    const ok = await ensureMediaPermission();
    if (!ok) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
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
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.length) {
      setLegalDocs((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const removeLegalDocAt = (i: number) => setLegalDocs((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={() => router.back()}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
        <SafeAreaView style={{ width: '90%', backgroundColor: '#fff', borderRadius: 20, paddingVertical: 16 }}>
          <Pressable
            onPress={() => router.back()}
            style={{ position: 'absolute', right: 16, top: 16, zIndex: 10 }}
          >
            <Ionicons name="close-circle" size={28} color="#0B1F3A" />
          </Pressable>

          {/* Optional header image */}
          <Image
            source={registerimg}
            resizeMode="cover"
            style={{ width: '100%', height: 120, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          />

          <ScrollView
            style={{ paddingHorizontal: 20, marginTop: 10, maxHeight: 550 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={{ fontSize: 24, color: '#0B1F3A', fontWeight: '700', textAlign: 'center', marginBottom: 12 }}>
              Create Account
            </Text>

            {/* Name */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="person-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Full name"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Phone */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="call-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Phone number"
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
                value={cnic}
                onChangeText={setCnic}
              />
            </View>

            {/* Gender */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="male-female-outline" size={20} style={Splashstyles.leftIcon} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1 }}>
                {['Male', 'Female'].map((g) => (
                  <Pressable key={g} onPress={() => setGender(g)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                      name={gender === g ? 'radio-button-on' : 'radio-button-off'}
                      size={18}
                      color="#0B1F3A"
                      style={{ marginRight: 6 }}
                    />
                    <Text style={{ color: '#0B1F3A' }}>{g}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Account Type */}
            <Pressable
              onPress={() => setShowAccountDropdown(!showAccountDropdown)}
              style={Splashstyles.inputContainer}
            >
              <Ionicons name="briefcase-outline" size={20} style={Splashstyles.leftIcon} />
              <Text style={{ flex: 1, color: accountType ? '#0B1F3A' : '#8FA3BF' }}>
                {accountType || 'Select account type'}
              </Text>
              <Ionicons
                name={showAccountDropdown ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#0B1F3A"
              />
            </Pressable>
            {showAccountDropdown && (
              <View style={{ backgroundColor: '#F8FAFC', borderRadius: 8, marginBottom: 8 }}>
                {['Agent', 'Customer', 'Seller'].map((opt) => (
                  <Pressable
                    key={opt}
                    onPress={() => {
                      setAccountType(opt);
                      setShowAccountDropdown(false);
                    }}
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ color: '#0B1F3A' }}>{opt}</Text>
                    {accountType === opt && <Ionicons name="checkmark" size={18} color="#1A3B6B" />}
                  </Pressable>
                ))}
              </View>
            )}

            {/* Email */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="mail-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Password"
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
            <Pressable
              style={[Splashstyles.primaryButton, { marginTop: 20 }]}
              onPress={() => {
                if (accountType === 'Agent' && legalDocs.length === 0) {
                  Alert.alert('Missing documents', 'Please upload at least one legal document.');
                  return;
                }
                Alert.alert('Success', 'Account created successfully!');
                setVisible(false);
              }}
            >
              <Text style={Splashstyles.primaryButtonText}>Create Account</Text>
            </Pressable>

            <Pressable style={Splashstyles.linkCenter} onPress={() => router.push('/login')}>
              <Text style={Splashstyles.linkText}>Already have an account? Log in</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
