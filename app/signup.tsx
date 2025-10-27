import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import React, { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
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

  return (
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
              {accountOpen && (
                <View
                  style={{
                    marginTop: 6,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#1A3B6B',
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 3 },
                    elevation: 2,
                  }}
                >
                  {['Agent', 'Customer', 'Seller'].map((opt, idx) => (
                    <Pressable
                      key={opt}
                      accessibilityRole="button"
                      onPress={() => {
                        setAccountType(opt);
                        setAccountOpen(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 12,
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
                </View>
              )}
            </View>


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
              style={Splashstyles.primaryButton}
              onPress={() => {}}
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
  );
}
