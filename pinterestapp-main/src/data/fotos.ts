export type Foto = {
  id: string;
  titulo: string;
  descricao: string;
  source: any;
};

export const minhasFotos: Foto[] = [
  {
    id: '1',
    titulo: 'Foto 1',
    descricao: 'kinda bossy',
    source: require('../../assets/images/foto1.jpg.jpg'),
  },
  {
    id: '2',
    titulo: 'Foto 2',
    descricao: 'classic',
    source: require('../../assets/images/foto2.jpg.jpg'),
  },
  {
    id: '3',
    titulo: 'Foto 3',
    descricao: 'me being the sunset',
    source: require('../../assets/images/foto3.jpg.jpeg'),
  },
  {
    id: '4',
    titulo: 'Foto 4',
    descricao: 'shadows in the air',
    source: require('../../assets/images/foto4.jpg'),
  },
];
