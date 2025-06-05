import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Smartphone, Signal, Battery, Wifi, Usb } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const DEVICES = [
  { id: '1', name: 'Smart Lens Pro', type: 'bluetooth', battery: 85, signal: 4 },
  { id: '2', name: 'Vision Assistant', type: 'wifi', battery: 92, signal: 3 },
  { id: '3', name: 'Sight Companion', type: 'bluetooth', battery: 67, signal: 2 },
  { id: '4', name: 'Eye Tech Plus', type: 'usb', battery: 100, signal: 5 },
];

const getDeviceIcon = (type) => {
  switch (type) {
    case 'bluetooth':
      return <Smartphone size={24} color="#60aad1" />;
    case 'wifi':
      return <Wifi size={24} color="#60aad1" />;
    case 'usb':
      return <Usb size={24} color="#60aad1" />;
    default:
      return <Smartphone size={24} color="#60aad1" />;
  }
};

export default function DevicesScreen() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Devices</Text>
        <TouchableOpacity 
          style={[styles.scanButton, scanning && styles.scanningButton]} 
          onPress={handleScan}
        >
          <Signal size={20} color="#FFFFFF" />
          <Text style={styles.scanButtonText}>
            {scanning ? 'Scanning...' : 'Scan'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.deviceList} contentContainerStyle={styles.deviceListContent}>
        {DEVICES.map((device) => (
          <TouchableOpacity
            key={device.id}
            style={styles.deviceCard}
            onPress={() => router.push(`/device/${device.id}?name=${device.name}`)}
          >
            <View style={styles.deviceInfo}>
              {getDeviceIcon(device.type)}
              <View style={styles.deviceDetails}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <View style={styles.deviceStats}>
                  <View style={styles.stat}>
                    <Battery size={16} color="#5ab351" />
                    <Text style={styles.statText}>{device.battery}%</Text>
                  </View>
                  <View style={styles.stat}>
                    <Signal size={16} color="#5ab351" />
                    <Text style={styles.statText}>{device.signal}/5</Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#60aad1',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#60aad1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  scanningButton: {
    backgroundColor: '#5ab351',
  },
  scanButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  deviceList: {
    flex: 1,
  },
  deviceListContent: {
    padding: 20,
    gap: 16,
  },
  deviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  deviceDetails: {
    gap: 8,
  },
  deviceName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
  },
  deviceStats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#5ab351',
  },
  connectButton: {
    backgroundColor: '#60aad1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  connectButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});