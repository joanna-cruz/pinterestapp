import * as Location from 'expo-location';
import React, { useState } from 'react';
import { Button, Linking, StyleSheet, TextInput, View, Text, ActivityIndicator } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';

export default function TabTwoScreen() {
  // Estados de Localização
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // Estados de CEP
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<any>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Função para Localização GPS
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

  // Função para Buscar CEP
  async function buscarCep() {
    setErro("");
    setEndereco(null);

    if (cep.length !== 8) {
      setErro("Digite um CEP com 8 números.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        setErro("CEP não encontrado.");
        return;
      }
      setEndereco(dados);
    } catch (err) {
      setErro("Não foi possível consultar o CEP.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      {/* SEÇÃO LOCALIZAÇÃO */}
      <ThemedText style={styles.title}>Pertinho de você!</ThemedText>
      <ThemedText>Ideias por perto!</ThemedText>

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

      {/* SEÇÃO BUSCAR CEP */}
      <ThemedText style={[styles.title, { marginTop: 20 }]}>Buscar endereço</ThemedText>
      <Text>Digite um CEP para consultar o endereço:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 93510000"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
        maxLength={8}
      />

      <Button
        title={carregando ? "Buscando..." : "Buscar CEP"}
        onPress={buscarCep}
        disabled={carregando}
      />

      {erro !== "" && <Text style={styles.erroText}>{erro}</Text>}

      {endereco && (
        <View style={styles.resultado}>
          <Text>{endereco.logradouro}</Text>
          <Text>{endereco.bairro}</Text>
          <Text>{endereco.localidade} - {endereco.uf}</Text>
        </View>
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
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  resultado: {
    padding: 15,
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ecdfe3',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ecdfe3',
    padding: 10,
    borderRadius: 6,
    color: '#000',
    backgroundColor: '#dd4141',
  },
  erroText: {
    color: 'red',
    marginTop: 5,
  },
});