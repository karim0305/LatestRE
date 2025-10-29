import { Splashstyles } from '@/styles/style';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
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
  View,
} from 'react-native';

type AddUserModalProps = {
  visible: boolean;
  onClose: () => void;
};

type UserType = 'Agent' | 'Customer' | 'Admin';

export default function AddUserModal({ visible, onClose }: AddUserModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [accountType, setAccountType] = useState<UserType>('Customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [legalDocs, setLegalDocs] = useState<string[]>([]);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const ensureMediaPermission = async (): Promise<boolean> => {
    let perm = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    if (!perm.granted) {
      Alert.alert('Permission required', 'Please allow photo access in your device settings.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]);
      return false;
    }
    return true;
  };

  const handlePickImage = async () => {
    // If photo exists, show delete confirmation
    if (photo) {
      Alert.alert(
        'Remove Photo',
        'Are you sure you want to remove this photo?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => setPhoto(null),
          },
        ]
      );
      return;
    }

    // Otherwise, pick a new image
    const ok = await ensureMediaPermission();
    if (!ok) return;
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handlePickLegalDoc = async () => {
    try {
      const ok = await ensureMediaPermission();
      if (!ok) return;
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        allowsMultipleSelection: true,
      });

      if (!result.canceled && result.assets?.length) {
        const newDocs = result.assets.map(asset => asset.uri);
        setLegalDocs(prev => [...prev, ...newDocs]);
      }
    } catch (error) {
      console.error('Error picking documents:', error);
      Alert.alert('Error', 'Failed to select documents. Please try again.');
    }
  };

  const removeLegalDoc = (index: number) => {
    Alert.alert(
      'Remove Document',
      'Are you sure you want to remove this document?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setLegalDocs(prev => prev.filter((_, i) => i !== index));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSubmit = async () => {
    // Basic form validation
    if (!name || !email || !phone || !cnic || !address || !gender || !accountType || !password) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    if (accountType === 'Agent' && legalDocs.length === 0) {
      Alert.alert('Document Required', 'Agents must upload at least one legal document');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Phone number validation (basic)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number');
      return;
    }

    // CNIC validation (basic)
    const cnicRegex = /^[0-9]{13}$/;
    if (!cnicRegex.test(cnic.replace(/[^0-9]/g, ''))) {
      Alert.alert('Invalid CNIC', 'CNIC must be 13 digits');
      return;
    }

    // Password validation
    if (password.length < 8) {
      Alert.alert('Weak Password', 'Password must be at least 8 characters long');
      return;
    }

    try {
      // Here you would typically make an API call to create the user
      const userData = {
        name,
        phone: phone.replace(/[^0-9]/g, ''),
        cnic: cnic.replace(/[^0-9]/g, ''),
        address,
        gender,
        accountType,
        email,
        password, // In a real app, this should be hashed
        photo,
        legalDocs,
        status: 'pending', // or 'active' depending on your flow
        createdAt: new Date().toISOString(),
      };

      console.log('Creating user:', userData);
      
      // Simulate API call
      // const response = await api.post('/users', userData);
      
      Alert.alert(
        'Success', 
        accountType === 'Agent' 
          ? 'Agent account created successfully and pending approval!'
          : 'User created successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setName('');
              setEmail('');
              setPhone('');
              setCnic('');
              setAddress('');
              setGender('');
              setPassword('');
              setPhoto(null);
              setLegalDocs([]);
              onClose();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Error', 'Failed to create user. Please try again.');
    }
  };

  return (
    <Modal 
      visible={visible} 
      transparent 
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          width: '90%',
          maxHeight: '90%',
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1A3B6B',
            }}>Edit User</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </Pressable>
          </View>

          <ScrollView style={{ maxHeight: '80%' }}>
            {/* Profile Photo */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Pressable 
                onPress={handlePickImage}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: '#F0F4F8',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  borderWidth: 2,
                  borderColor: photo ? '#1A3B6B' : '#E2E8F0',
                  position: 'relative',
                }}
              >
                {photo ? (
                  <>
                    <Image 
                      source={{ uri: photo }} 
                      style={{ width: '100%', height: '100%' }} 
                      resizeMode="cover"
                    />
                    <View 
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 4,
                      }}
                    >
                      <Ionicons name="close" size={16} color="white" />
                    </View>
                  </>
                ) : (
                  <Ionicons name="person" size={40} color="#888" />
                )}
              </Pressable>
              <Text 
                style={{ 
                  marginTop: 8, 
                  color: photo ? '#1A3B6B' : '#666',
                  fontSize: 12,
                  textAlign: 'center'
                }}
                onPress={handlePickImage}
              >
                {photo ? 'Change Photo' : 'Add Photo'}
              </Text>
            </View>

            {/* Name */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Phone */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#666" />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* CNIC */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="card-outline" size={20} color="#666" />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="CNIC (without dashes)"
                value={cnic}
                onChangeText={setCnic}
                maxLength={13}
              />
            </View>

            {/* Address */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
            </View>

            {/* Gender Selection */}
            <View style={[Splashstyles.inputContainer, { paddingVertical: 10 }]} >
              <Ionicons name="male-female-outline" size={20} color="#666" />
              <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }} >
                {['Male', 'Female', 'Other'].map((g) => (
                  <Pressable
                    key={g}
                    onPress={() => setGender(g)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Ionicons
                      name={gender === g ? 'radio-button-on' : 'radio-button-off'}
                      size={18}
                      color={gender === g ? '#1A3B6B' : '#666'}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={{ color: gender === g ? '#1A3B6B' : '#666' }}>{g}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Account Type */}
            <View style={{ marginBottom: 16 }}>
              <Pressable
                onPress={() => setShowAccountDropdown(!showAccountDropdown)}
                style={[Splashstyles.inputContainer, { justifyContent: 'space-between' }]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="briefcase-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                  <Text style={{ color: accountType ? '#000' : '#999' }}>
                    {accountType || 'Select Account Type'}
                  </Text>
                </View>
                <Ionicons
                  name={showAccountDropdown ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#666"
                />
              </Pressable>
              
              {showAccountDropdown && (
                <View style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  marginTop: 4,
                  borderWidth: 1,
                  borderColor: '#ddd',
                  overflow: 'hidden',
                }}>
                  {(['Agent', 'Customer', 'Admin'] as UserType[]).map((type) => (
                    <Pressable
                      key={type}
                      onPress={() => {
                        setAccountType(type);
                        setShowAccountDropdown(false);
                      }}
                      style={{
                        padding: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: accountType === type ? '#F0F4F8' : '#fff',
                      }}
                    >
                      <Ionicons
                        name={
                          type === 'Agent' ? 'person' :
                          type === 'Customer' ? 'people' : 'shield-checkmark'
                        }
                        size={18}
                        color={accountType === type ? '#1A3B6B' : '#666'}
                        style={{ marginRight: 10 }}
                      />
                      <Text style={{ 
                        color: accountType === type ? '#1A3B6B' : '#333',
                        fontWeight: accountType === type ? '600' : '400'
                      }}>
                        {type}
                      </Text>
                      {accountType === type && (
                        <Ionicons
                          name="checkmark"
                          size={18}
                          color="#1A3B6B"
                          style={{ marginLeft: 'auto' }}
                        />
                      )}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* Password */}
            <View style={Splashstyles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" />
              <TextInput
                style={[Splashstyles.textInput, { flex: 1 }]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable 
                onPress={() => setShowPassword(!showPassword)}
                style={{ padding: 8 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#666"
                />
              </Pressable>
            </View>

            {/* Legal Documents (Conditional for Agents) */}
            {accountType === 'Agent' && (
              <View style={{ marginTop: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ 
                    color: '#666', 
                    fontWeight: '500',
                    fontSize: 16,
                  }}>
                    Legal Documents
                  </Text>
                  <Text style={{ color: legalDocs.length === 0 ? '#E53E3E' : '#38A169', fontSize: 12 }}>
                    {legalDocs.length === 0 ? 'Required' : `${legalDocs.length} document(s) uploaded`}
                  </Text>
                </View>
                
                <Pressable
                  onPress={handlePickLegalDoc}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16,
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: legalDocs.length === 0 ? '#E53E3E' : '#1A3B6B',
                    borderRadius: 8,
                    marginBottom: 12,
                    backgroundColor: legalDocs.length === 0 ? '#FFF5F5' : '#F8FAFC',
                  }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <Ionicons 
                      name="cloud-upload-outline" 
                      size={32} 
                      color={legalDocs.length === 0 ? '#E53E3E' : '#1A3B6B'} 
                      style={{ marginBottom: 8 }}
                    />
                    <Text style={{ 
                      color: legalDocs.length === 0 ? '#E53E3E' : '#1A3B6B',
                      textAlign: 'center',
                      fontWeight: '500'
                    }}>
                      {legalDocs.length === 0 
                        ? 'Upload Required Documents' 
                        : 'Add More Documents'}
                    </Text>
                    <Text style={{ 
                      color: '#718096', 
                      fontSize: 12, 
                      marginTop: 4,
                      textAlign: 'center'
                    }}>
                      {legalDocs.length === 0 
                        ? 'At least one document is required for agent registration'
                        : 'PNG, JPG, PDF up to 5MB'}
                    </Text>
                  </View>
                </Pressable>

                {legalDocs.length > 0 && (
                  <View style={{ marginBottom: 16 }}>
                    {legalDocs.map((docUri, index) => {
                      const fileName = docUri.split('/').pop() || `Document ${index + 1}`;
                      const fileType = fileName.split('.').pop()?.toLowerCase();
                      const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileType || '');
                      
                      return (
                        <View 
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 12,
                            backgroundColor: '#F8FAFC',
                            borderRadius: 8,
                            marginBottom: 8,
                            borderWidth: 1,
                            borderColor: '#E2E8F0',
                          }}
                        >
                          <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 4,
                            backgroundColor: '#EBF8FF',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 12,
                          }}>
                            {isImage ? (
                              <Image 
                                source={{ uri: docUri }}
                                style={{ width: '100%', height: '100%', borderRadius: 4 }}
                                resizeMode="cover"
                              />
                            ) : (
                              <Ionicons 
                                name="document-text-outline" 
                                size={24} 
                                color="#3182CE" 
                              />
                            )}
                          </View>
                          
                          <View style={{ flex: 1 }}>
                            <Text 
                              numberOfLines={1} 
                              style={{ 
                                color: '#2D3748',
                                fontWeight: '500',
                                marginBottom: 2,
                              }}
                            >
                              {fileName}
                            </Text>
                            <Text style={{ color: '#718096', fontSize: 12 }}>
                              {fileType?.toUpperCase()} • {Math.round((docUri.length * 2) / 1024)} KB
                            </Text>
                          </View>
                          
                          <Pressable 
                            onPress={() => removeLegalDoc(index)}
                            style={({ pressed }) => ({
                              padding: 8,
                              opacity: pressed ? 0.7 : 1,
                            })}
                          >
                            <Ionicons name="trash-outline" size={20} color="#E53E3E" />
                          </Pressable>
                        </View>
                      );
                    })}
                  </View>
                )}
                
                <Text style={{ 
                  color: '#718096', 
                  fontSize: 12, 
                  marginTop: -8,
                  marginBottom: 8,
                  fontStyle: 'italic'
                }}>
                  Acceptable documents: CNIC, Passport, Driving License, or other government-issued ID
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Action Buttons */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 20,
            borderTopWidth: 1,
            borderTopColor: '#eee',
            paddingTop: 16,
          }}>
            <Pressable
              onPress={onClose}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                marginRight: 12,
                borderWidth: 1,
                borderColor: '#E53E3E',
              }}
            >
              <Text style={{ color: '#E53E3E', fontWeight: '600' }}>Cancel</Text>
            </Pressable>
            
            <Pressable
              onPress={handleSubmit}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 24,
                borderRadius: 8,
                backgroundColor: '#1A3B6B',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>Update User</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
