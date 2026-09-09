import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router'; 

const minhasFotos = [
  { id: '1', source: require('../../assets/images/foto1.jpg.jpg') }, 
  { id: '2', source: require('../../assets/images/foto2.jpg.jpg') }, 
  { id: '3', source: require('../../assets/images/foto3.jpg.jpeg') },
  { id: '4', source: require('../../assets/images/foto4.jpg') },
];

const largTela = Dimensions.get('window').width;
const largMax = largTela > 500 ? 420 : largTela; 
const largCol = (largMax - 48) / 2; 

export default function HomeScreen() {
  const [curtidas, setCurtidas] = useState<string[]>([]);

  const alternarCurtida = (id: string) => {
    setCurtidas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const colunaEsquerda = minhasFotos.filter((_, index) => index % 2 === 0);
  const colunaDireita = minhasFotos.filter((_, index) => index % 2 !== 0);

  const renderCardFoto = (item: { id: string; source: any }) => {
    const isLiked = curtidas.includes(item.id);

    return (
      <View key={item.id} style={styles.cardFoto}>
        <Image source={item.source} style={styles.imagem} resizeMode="cover" />
        
        <TouchableOpacity 
          style={styles.botaoCurtir} 
          onPress={() => alternarCurtida(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoCoracao}>
            {isLiked ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView edges={['top']} style={styles.headerPinterest}>
        <View style={styles.linhaTopo}>
          <Text style={styles.logoPinterest}>Pinterest</Text>
          <View style={styles.iconesDireita}>
            <Text style={styles.textoBotaoTopo}>+</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.abasPesquisa}>
          <Text style={[styles.textoAba, styles.abaAtiva]}>Tudo</Text>
          <Text style={styles.textoAba}>favoritas</Text>
          <Text style={styles.textoAba}>inspofotos</Text>
        </ScrollView>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.muralPinterest}>
          <View style={styles.coluna}>
            {colunaEsquerda.map(renderCardFoto)}
          </View>
          <View style={styles.coluna}>
            {colunaDireita.map(renderCardFoto)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
    alignItems: 'center',
  },
  headerPinterest: {
    width: '100%',
    maxWidth: largMax,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  logoPinterest: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconesDireita: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  textoBotaoTopo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  abasPesquisa: {
    flexDirection: 'row',
    marginTop: 5,
  },
  textoAba: {
    color: '#A1A3A7',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 20,
    paddingBottom: 6,
  },
  abaAtiva: {
    color: '#FFFFFF',
    borderBottomWidth: 3,
    borderBottomColor: '#FFFFFF', 
  },
  scrollContent: {
    width: largMax,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40, 
  },
  muralPinterest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coluna: {
    width: largCol,
  },
  cardFoto: {
    width: largCol,
    height: largCol, 
    backgroundColor: '#1A1A1A', 
    borderRadius: 16, 
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  botaoCurtir: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoCoracao: {
    fontSize: 16,
  },
});