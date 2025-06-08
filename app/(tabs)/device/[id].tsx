import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Battery, Signal, Smartphone, WifiOff, ArrowLeft } from 'lucide-react-native';
import { useConnectionState } from '@/hooks/useConnectionState';
import { useCallback } from 'react';

const { width } = Dimensions.get('window');

export default function DeviceScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const { isDeviceConnected, disconnectDevice, refreshConnectionState } = useConnectionState();

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });

  // Check connection state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshConnectionState();
    }, [refreshConnectionState])
  );

  if (!fontsLoaded) {
    return null;
  }

  const deviceId = Array.isArray(id) ? id[0] : id;
  const deviceName = Array.isArray(name) ? name[0] : name;
  const isConnected = isDeviceConnected(deviceId);

  const handleDisconnect = async () => {
    await disconnectDevice();
    router.push('/devices');
  };

  const handleBackToDevices = () => {
    router.push('/devices');
  };

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToDevices}
          >
            <ArrowLeft size={24} color="#60aad1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Device Status</Text>
        </View>

        <View style={styles.disconnectedContent}>
          <View style={styles.disconnectedIcon}>
            <WifiOff size={64} color="#DC2626" />
          </View>

          <Text style={styles.disconnectedTitle}>No Devices Connected</Text>
          <Text style={styles.disconnectedSubtitle}>
            Your device has been disconnected. Connect to a device to continue using Smart Sight features.
          </Text>

          <View style={styles.disconnectedCard}>
            <Text style={styles.disconnectedCardTitle}>What you can do:</Text>
            <View style={styles.featureList}>
              <Text style={styles.featureItem}>• Scan for nearby devices</Text>
              <Text style={styles.featureItem}>• Connect to available devices</Text>
              <Text style={styles.featureItem}>• Manage device settings</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.connectDevicesButton}
            onPress={handleBackToDevices}
          >
            <Text style={styles.connectDevicesButtonText}>Connect Devices</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToDevices}
        >
          <ArrowLeft size={24} color="#60aad1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{deviceName}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.deviceIcon}>
          <Smartphone size={48} color="#60aad1" />
        </View>

        <Text style={styles.title}>{deviceName}</Text>
        
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Connected</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Battery size={24} color="#5ab351" />
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Battery</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.stat}>
              <Signal size={24} color="#5ab351" />
              <Text style={styles.statValue}>4/5</Text>
              <Text style={styles.statLabel}>Signal</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleBackToDevices}
          >
            <Text style={styles.buttonText}>Back to Devices</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.disconnectButton]}
            onPress={handleDisconnect}
          >
            <Text style={[styles.buttonText, styles.disconnectText]}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  deviceIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1E293B',
    marginBottom: 32,
  },
  statusCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    marginBottom: 40,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5ab351',
    marginRight: 8,
  },
  statusText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#5ab351',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
    gap: 8,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  button: {
    backgroundColor: '#60aad1',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  disconnectButton: {
    backgroundColor: '#FEE2E2',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  disconnectText: {
    color: '#DC2626',
  },
  // Disconnected state styles
  disconnectedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  disconnectedIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  disconnectedTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  disconnectedSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 320,
  },
  disconnectedCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    marginBottom: 32,
  },
  disconnectedCardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 16,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  connectDevicesButton: {
    backgroundColor: '#60aad1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 200,
  },
  connectDevicesButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});