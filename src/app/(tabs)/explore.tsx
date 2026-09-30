import * as Location from 'expo-location';
import { useState } from 'react';
import { Button, Linking, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';

export default function TabTwoScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  async function descobrirLocalizacao() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Permissão de localização negada!');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}> Pertinho de voce! </ThemedText>

      <ThemedText>Ideias por petro!</ThemedText>

      <Button title="Usar minha localização" onPress={descobrirLocalizacao} />

      {latitude !== null && longitude !== null && (
        <ThemedView style={styles.resultado}>
          <ThemedText>Latitude: {latitude.toFixed(5)}</ThemedText>

          <ThemedText>Longitude: {longitude.toFixed(5)}</ThemedText>

          <Button
            title="Ver no mapa"
            onPress={() =>
              Linking.openURL(`https://www.google.com/maps?q=${latitude},${longitude}`)
            }
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: BottomTabInset + Spacing.three,
    justifyContent: 'center',
    gap: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },

  resultado: {
    padding: 20,
    gap: 10,
  },
});
