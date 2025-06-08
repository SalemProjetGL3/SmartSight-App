import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Smartphone, Signal, Battery, Wifi, Usb, Globe } from 'lucide-react-native';
import PairingModal from '@/components/PairingModal';
import { useConnectionState } from '@/hooks/useConnectionState';

const { width } = Dimensions.get('window');

const AVAILABLE_DEVICES = [
  { id: '1', name: 'Smart Lens Pro', type: 'bluetooth', battery: 85, signal: 4 },
  { id: '2', name: 'Vision Assistant', type: 'wifi', battery: 92, signal: 3 },
  { id: '3', name: 'Sight Companion', type: 'bluetooth', battery: 67, signal: 2 },
  { id: '4', name: 'Eye Tech Plus', type: 'usb', battery: 100, signal: 5 },
];

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'bluetooth':
      return <Smartphone size={24} color="#60aad1" />;
    case 'wifi':
      return <Wifi size={24} color="#60aad1" />;
    case 'usb':
      return <Usb size={24} color="#60aad1" />;
    case 'network':
      return <Globe size={24} color="#60aad1" />;
    default:
      return <Smartphone size={24} color="#60aad1" />;
  }
};

export default function DevicesScreen() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [pairingDevice, setPairingDevice] = useState<{ id: string; name: string; type: string } | null>(null);
  const { connectionState, connectDevice, isDeviceConnected } = useConnectionState();

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

  const handleConnect = async (device: { id: string; name: string; type: string }) => {
    setPairingDevice(device);

    // Simulate pairing process
    setTimeout(async () => {
      await connectDevice(device.id, device.name);
      setPairingDevice(null);
      router.push(`/device/${device.id}?name=${device.name}`);
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Device Manager</Text>
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
        {/* Available Devices Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Devices</Text>
          {AVAILABLE_DEVICES.map((device) => (
            <View key={device.id} style={styles.deviceCard}>
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
              <TouchableOpacity 
                style={styles.connectButton}
                onPress={() => handleConnect(device)}
              >
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <PairingModal
        visible={!!pairingDevice}
        deviceName={pairingDevice?.name || ''}
        deviceType={pairingDevice?.type || ''}
      />
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
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
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
    marginBottom: 12,
  },
  connectedCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#5ab351',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  deviceDetails: {
    gap: 4,
  },
  deviceName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
  },
  ipAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  deviceStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 4,
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
  lastSeen: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
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
  connectedIndicator: {
    alignItems: 'center',
    gap: 4,
  },
  connectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5ab351',
  },
  connectedText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#5ab351',
  },
});