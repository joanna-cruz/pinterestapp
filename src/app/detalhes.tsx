import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { minhasFotos } from '../data/fotos';

export default function DetalhesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const foto = minhasFotos.find((f) => f.id === id) ?? minhasFotos[0];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.conteudo}>
        <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
          <Text style={styles.textoVoltar}>← VOLTAR</Text>
        </Pressable>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={foto.source} style={styles.imagem} resizeMode="cover" />
          <Text style={styles.titulo}>{foto.titulo}</Text>
          <Text style={styles.descricao}>{foto.descricao}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  conteudo: {
    flex: 1,
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: 16,
  },
  botaoVoltar: {
    alignSelf: 'flex-start',
    backgroundColor: '#1A1A1A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginVertical: 12,
  },
  textoVoltar: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imagem: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
  },
  descricao: {
    color: '#A1A3A7',
    fontSize: 15,
    marginTop: 8,
    paddingBottom: 40,
  },
});
