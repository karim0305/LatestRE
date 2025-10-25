import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import logo from '../assets/logo.png';
import { Splashstyles } from '../styles/style';

export default function Home() {
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('./login');
    }, 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={Splashstyles.container}>
      <View style={Splashstyles.logoWrap}>
        <View style={Splashstyles.logoCircle}>
          <Image source={logo} style={Splashstyles.logo} resizeMode="cover" />
        </View>
      </View>
      <Text style={Splashstyles.appName}>Real Estate</Text>
      <Text style={Splashstyles.tagline}>Find your next home with confidence</Text>
      <View style={Splashstyles.footer}>
        <Text style={Splashstyles.footerText}>Loading experience...</Text>
      </View>
    </View>
  );
}
