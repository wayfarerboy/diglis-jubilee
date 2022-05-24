import _data from '../data/data.json';

const data = [
  {
    title: 'Introduction',
    author: 'Diglis Jubilee',
    description:
      'Introducing Diglis Jubilee Memories, a virtual tour guide of memories from the community of Diglis.',
    id: 'introduction',
    audio: '/audio/introduction.mp3',
    image: '/images/introduction.jpg',
  },
  ..._data,
];

export default data;
