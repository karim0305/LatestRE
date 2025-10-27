import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import loginimg from '../assets/login_img.jpg';
import logo from '../assets/logo.png';
import { Splashstyles } from '../styles/style';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
     
      <View style={{ flex: 1, backgroundColor: '#0B1F3A', position: 'relative' }}>
        <View style={Splashstyles.topHalfBackgroundContainer}>
          <Image source={loginimg} style={Splashstyles.topHalfBackground} resizeMode="cover" />
        </View>
        <View style={[Splashstyles.container, { backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }]}>
          <View style={Splashstyles.logoWrap}>
            <View style={Splashstyles.logoCircle}>
              <Image source={logo} style={Splashstyles.logo} resizeMode="cover" />
            </View>
          </View>
          <Text style={Splashstyles.appName}>Login</Text>
          <Text style={Splashstyles.tagline}>Welcome back! Please sign in.</Text>
        
          <View style={Splashstyles.formWrap}>
            <View style={[
              Splashstyles.inputContainer,
              emailFocused && Splashstyles.inputFocused,
              emailError && Splashstyles.inputError,
            ]}>
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
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>
            <View style={[
              Splashstyles.inputContainer,
              passwordFocused && Splashstyles.inputFocused,
              passwordError && Splashstyles.inputError,
            ]}>
              <Ionicons name="lock-closed" size={20} style={Splashstyles.leftIcon} />
              <TextInput
                style={Splashstyles.textInput}
                placeholder="Password"
                placeholderTextColor="#8FA3BF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
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
            <View style={{ width: '100%', paddingHorizontal: 24 }}>
          <Pressable
            style={Splashstyles.primaryButton}
            onPress={() => {
              const emailInvalid = email.trim().length === 0;
              const passwordInvalid = password.trim().length === 0;
              setEmailError(emailInvalid);
              setPasswordError(passwordInvalid);
            }}
            accessibilityRole="button"
          >
            <Text style={Splashstyles.primaryButtonText}>Login</Text>
          </Pressable>
          <Pressable style={Splashstyles.linkCenter} onPress={() => { /* TODO: navigate to reset */ }}>
            <Text style={Splashstyles.linkText}>Forgot password?</Text>
          </Pressable>
          <Pressable
            style={Splashstyles.secondaryButton}
            onPress={() => router.push('/signup')}
            accessibilityRole="button"
          >
            <Text style={Splashstyles.secondaryButtonText}>Sign up</Text>
          </Pressable>
        </View>
        <View style={Splashstyles.dividerRow}>
          <View style={Splashstyles.dividerLine} />
          <Text style={Splashstyles.dividerText}>or continue with</Text>
          <View style={Splashstyles.dividerLine} />
        </View>
        <View style={{ width: '100%', paddingHorizontal: 24 }}>
          <Pressable
            style={Splashstyles.socialButton}
            onPress={() => { /* TODO: wire Google auth */ }}
            accessibilityRole="button"
          >
            <Ionicons name="logo-google" size={20} style={Splashstyles.socialIcon} />
            <Text style={Splashstyles.socialButtonText}>Continue with Google</Text>
          </Pressable>
        </View>
          </View>
       
        </View>
      </View>
    </SafeAreaView>
  );
}
