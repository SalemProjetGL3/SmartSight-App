import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';

export default function SettingsScreen() {
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    loadSettings();
    loadVoices();
  }, []);

  const loadSettings = async () => {
    try {
      const vibration = await AsyncStorage.getItem('vibrationEnabled');
      const tts = await AsyncStorage.getItem('ttsEnabled');
      const voice = await AsyncStorage.getItem('selectedVoice');
      
      setVibrationEnabled(vibration === 'true');
      setTtsEnabled(tts === 'true');
      if (voice) setSelectedVoice(JSON.parse(voice));
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadVoices = async () => {
    const availableVoices = await Speech.getAvailableVoicesAsync();
    setVoices(availableVoices);
  };

  const toggleVibration = async (value) => {
    setVibrationEnabled(value);
    if (value) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    await AsyncStorage.setItem('vibrationEnabled', value.toString());
  };

  const toggleTts = async (value) => {
    setTtsEnabled(value);
    await AsyncStorage.setItem('ttsEnabled', value.toString());
  };

  const selectVoice = async (voice) => {
    setSelectedVoice(voice);
    await AsyncStorage.setItem('selectedVoice', JSON.stringify(voice));
    if (ttsEnabled) {
      Speech.speak('Voice selected', { voice: voice.identifier });
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Haptic Feedback</Text>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Enable Vibration</Text>
          <Switch
            value={vibrationEnabled}
            onValueChange={toggleVibration}
            trackColor={{ false: '#E2E8F0', true: '#5ab351' }}
            thumbColor={vibrationEnabled ? '#FFFFFF' : '#9CA3AF'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text-to-Speech</Text>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Enable TTS</Text>
          <Switch
            value={ttsEnabled}
            onValueChange={toggleTts}
            trackColor={{ false: '#E2E8F0', true: '#5ab351' }}
            thumbColor={ttsEnabled ? '#FFFFFF' : '#9CA3AF'}
          />
        </View>

        {ttsEnabled && (
          <View style={styles.voicesList}>
            <Text style={styles.voicesTitle}>Select Voice</Text>
            {voices.map((voice, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.voiceItem,
                  selectedVoice?.identifier === voice.identifier && styles.selectedVoice
                ]}
                onPress={() => selectVoice(voice)}
              >
                <Text style={[
                  styles.voiceText,
                  selectedVoice?.identifier === voice.identifier && styles.selectedVoiceText
                ]}>
                  {voice.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
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
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#60aad1',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
  },
  voicesList: {
    marginTop: 16,
  },
  voicesTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  voiceItem: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedVoice: {
    backgroundColor: '#EEF2FF',
    borderColor: '#60aad1',
    borderWidth: 1,
  },
  voiceText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
  },
  selectedVoiceText: {
    color: '#60aad1',
    fontFamily: 'Inter-Bold',
  },
});