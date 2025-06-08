import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ConnectionState {
isConnected: boolean;
connectedDeviceId: string | null;
connectedDeviceName: string | null;
}

const CONNECTION_STATE_KEY = 'connection_state';

export function useConnectionState() {
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isConnected: false,
    connectedDeviceId: null,
    connectedDeviceName: null,
  });

  // Load connection state from storage on mount
  useEffect(() => {
    loadConnectionState();
  }, []);

  const loadConnectionState = async () => {
    try {
      const stored = await AsyncStorage.getItem(CONNECTION_STATE_KEY);
      if (stored) {
        const state = JSON.parse(stored);
        setConnectionState(state);
      }
    } catch (error) {
      console.error('Error loading connection state:', error);
    }
  };

  const saveConnectionState = async (state: ConnectionState) => {
    try {
      await AsyncStorage.setItem(CONNECTION_STATE_KEY, JSON.stringify(state));
      setConnectionState(state);
    } catch (error) {
      console.error('Error saving connection state:', error);
    }
  };

  const connectDevice = async (deviceId: string, deviceName: string) => {
    const newState: ConnectionState = {
      isConnected: true,
      connectedDeviceId: deviceId,
      connectedDeviceName: deviceName,
    };
    await saveConnectionState(newState);
  };

  const disconnectDevice = async () => {
    const newState: ConnectionState = {
      isConnected: false,
      connectedDeviceId: null,
      connectedDeviceName: null,
    };
    await saveConnectionState(newState);
  };

  const isDeviceConnected = (deviceId: string) => {
    return connectionState.isConnected && connectionState.connectedDeviceId === deviceId;
  };

  return {
    connectionState,
    connectDevice,
    disconnectDevice,
    isDeviceConnected,
    refreshConnectionState: loadConnectionState,
  };
}