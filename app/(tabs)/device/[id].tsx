import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Battery, Signal, Smartphone } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DeviceScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.deviceIcon}>
          <Smartphone size={48} color="#60aad1" />
        </View>
        
        <Text style={styles.title}>{name}</Text>
        
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
            onPress={() => router.push('/devices')}
          >
            <Text style={styles.buttonText}>Back to Devices</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.disconnectButton]}
            onPress={() => router.push('/devices')}
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
});