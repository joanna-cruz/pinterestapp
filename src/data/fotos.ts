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
    descricao: 'Escreva aqui a descrição da foto 1.',
    source: require('../../assets/images/foto1.jpg.jpg'),
  },
  {
    id: '2',
    titulo: 'Foto 2',
    descricao: 'Escreva aqui a descrição da foto 2.',
    source: require('../../assets/images/foto2.jpg.jpg'),
  },
  {
    id: '3',
    titulo: 'Foto 3',
    descricao: 'Escreva aqui a descrição da foto 3.',
    source: require('../../assets/images/foto3.jpg.jpeg'),
  },
  {
    id: '4',
    titulo: 'Foto 4',
    descricao: 'Escreva aqui a descrição da foto 4.',
    source: require('../../assets/images/foto4.jpg'),
  },
];
