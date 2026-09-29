import { Link, router, Stack } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { minhasFotos } from '../../data/fotos';

const largTela = Dimensions.get('window').width;
const largMax = largTela > 500 ? 420 : largTela;
const largCol = (largMax - 48) / 2;

export default function HomeScreen() {
  const [curtidas, setCurtidas] = useState<string[]>([]);
  const [menuAberto, setMenuAberto] = useState(false);

  const alternarCurtida = (id: string) => {
    const jaCurtida = curtidas.includes(id);

    setCurtidas((prev) =>
      jaCurtida ? prev.filter((item) => item !== id) : [...prev, id]
    );

    // Ao curtir (e não ao descurtir), abre a tela de detalhes da foto
    if (!jaCurtida) {
      router.push({ pathname: '/detalhes', params: { id } });
    }
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
          <TouchableOpacity onPress={() => setMenuAberto(!menuAberto)}>
            <Text style={styles.textoBotaoTopo}>☰</Text>
          </TouchableOpacity>
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

      {menuAberto && (
        <View style={styles.menu}>
          <Link href="/" style={styles.itemMenu} onPress={() => setMenuAberto(false)}>
            Início
          </Link>
          <Link
            href={{ pathname: '/detalhes', params: { id: '1' } }}
            style={styles.itemMenu}
            onPress={() => setMenuAberto(false)}
          >
            Ver detalhes
          </Link>
        </View>
      )}

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
  menu: {
    position: 'absolute',
    top: 90,
    left: 16,
    zIndex: 10,
    elevation: 10,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 160,
  },
  itemMenu: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
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
