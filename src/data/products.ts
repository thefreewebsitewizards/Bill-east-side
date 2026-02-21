export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  completePrice: number;
  deckOnlyPrice: number;
  image: string;
  images: string[];
  specs: {
    camber: string;
    concave: string;
    wheelbase: string;
  };
  components: {
    trucks?: string;
    wheels: string;
    bearings: string;
  };
  features: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'The Kahala',
    slug: 'the-kahala',
    description: 'Our flagship board, handcrafted with precision and stained with love. Perfect for smooth pumping and carving through the streets of Kapaa.',
    completePrice: 275.00,
    deckOnlyPrice: 175.00,
    image: '/image0.jpeg',
    images: ['/image0.jpeg'],
    specs: {
      camber: '1 1/2 inches',
      concave: '3/16 inches',
      wheelbase: '37 inches',
    },
    components: {
      trucks: '180mm Kahuna Creation trucks',
      wheels: 'Kahuna Creation 69mm 82A wheels',
      bearings: 'APEC 7 bearings',
    },
    features: ['7-Layer Canadian Maple', 'Hand-painted', 'Made in USA'],
  },
  {
    id: '2',
    name: 'The Sweet Spot',
    slug: 'the-sweet-spot',
    description: 'Named for that perfect balance point. This board delivers exceptional control and smooth rides for your daily pumping pleasure.',
    completePrice: 275.00,
    deckOnlyPrice: 175.00,
    image: '/image1.jpeg',
    images: ['/image1.jpeg'],
    specs: {
      camber: '1 1/2 inches',
      concave: '3/16 inches',
      wheelbase: '37 inches',
    },
    components: {
      wheels: 'Ghost Phathoms 70mm 78A wheels',
      bearings: 'Ghost APEC 7 bearings',
    },
    features: ['7-Layer Canadian Maple', 'Hand-stained', 'Made in USA'],
  },
  {
    id: '3',
    name: 'The Ka Pahu',
    slug: 'the-ka-pahu',
    description: 'Inspired by the traditional Hawaiian drum, this board brings rhythm to your ride. Feel the beat of the pavement beneath you.',
    completePrice: 275.00,
    deckOnlyPrice: 175.00,
    image: '/image2.jpeg',
    images: ['/image2.jpeg'],
    specs: {
      camber: '1 1/2 inches',
      concave: '3/16 inches',
      wheelbase: '37 inches',
    },
    components: {
      wheels: 'Ghost Phathoms 70mm 78A wheels',
      bearings: 'Ghost APEC 7 bearings',
    },
    features: ['7-Layer Canadian Maple', 'Hand-painted', 'Made in USA'],
  },
  {
    id: '4',
    name: 'Pau',
    slug: 'pau',
    description: 'Hawaiian for "finished" or "done" - but your ride is just beginning. A versatile board that handles everything with ease.',
    completePrice: 275.00,
    deckOnlyPrice: 175.00,
    image: '/image3.jpeg',
    images: ['/image3.jpeg'],
    specs: {
      camber: '1 1/2 inches',
      concave: '3/16 inches',
      wheelbase: '37 inches',
    },
    components: {
      wheels: 'Ghost Phathoms 70mm 78A wheels',
      bearings: 'Ghost APEC 7 bearings',
    },
    features: ['7-Layer Canadian Maple', 'Hand-stained', 'Made in USA'],
  },
  {
    id: '5',
    name: 'Dakine',
    slug: 'dakine',
    description: 'Hawaiian slang for "the best." And that\'s exactly what this board is - the best companion for your pumping adventures.',
    completePrice: 275.00,
    deckOnlyPrice: 175.00,
    image: '/image4.jpeg',
    images: ['/image4.jpeg'],
    specs: {
      camber: '1 1/2 inches',
      concave: '3/16 inches',
      wheelbase: '37 inches',
    },
    components: {
      wheels: 'Ghost Phathoms 70mm 78A wheels',
      bearings: 'Ghost APEC 7 bearings',
    },
    features: ['7-Layer Canadian Maple', 'Hand-painted', 'Made in USA'],
  },
];
