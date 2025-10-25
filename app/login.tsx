import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/logo.png';
import { Splashstyles } from '../styles/style';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView>
      <View style={[Splashstyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={Splashstyles.logoWrap}>
          <View style={Splashstyles.logoCircle}>
            <Image source={logo} style={Splashstyles.logo} resizeMode="cover" />
          </View>
        </View>
        <Text style={Splashstyles.appName}>Login</Text>
        <Text style={Splashstyles.tagline}>Welcome back! Please sign in.</Text>
        <View style={Splashstyles.formWrap}>
        <View style={Splashstyles.inputContainer}>
          <Ionicons name="mail" size={20} style={Splashstyles.leftIcon} />
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
          <Ionicons name="lock-closed" size={20} style={Splashstyles.leftIcon} />
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
            onPress={() => setShowPassword((s) => !s)}
            style={Splashstyles.eyeButton}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              style={Splashstyles.eyeIcon}
            />
          </Pressable>
        </View>
      </View>
    <View style={{ width: '100%', paddingHorizontal: 24 }}>
      <Pressable
        style={Splashstyles.primaryButton}
        onPress={() => {}}
        accessibilityRole="button"
      >
        <Text style={Splashstyles.primaryButtonText}>Login</Text>
      </Pressable>
    </View>
      </View>
  
    </SafeAreaView>
  );
}
