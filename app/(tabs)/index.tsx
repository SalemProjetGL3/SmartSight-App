import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { Eye } from 'lucide-react-native';

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/image.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Smart Sight</Text>
          <Text style={styles.subtitle}>See Beyond</Text>
          <View style={styles.featureContainer}>
            <View style={styles.feature}>
              <Eye size={24} color="#60aad1" />
              <Text style={styles.featureText}>
                Advanced vision assistance powered by cutting-edge technology
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Connect your device to get started
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    width: width * 0.5,
    aspectRatio: 1,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 42,
    color: '#60aad1',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    color: '#5ab351',
    marginBottom: 40,
    letterSpacing: 2,
  },
  featureContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    flex: 1,
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94A3B8',
  },
});