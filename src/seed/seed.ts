import bcryptjs from 'bcryptjs';


interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: 'men' | 'women' | 'kid' | 'unisex';
}
interface SeedBrand{
  name: string;
  state: 'activo' | 'inactivo';
}

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: 'admin'|'user'
}



type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';

interface SeedData {
  users: SeedUser[];
  categories: string[];
  products: SeedProduct[];
  brands: SeedBrand[];
}




export const initialData: SeedData = {
brands: [
  {
    name: 'Coca Cola', 
    state: 'activo'
  },
  {
    name: 'Nestle',
    state: 'activo'
  },
  {
    name: 'Puma',
    state: 'activo'
  },
  {
    name: 'Reebok',
    state: 'activo'
  },
  {
    name: 'Converse',
    state: 'activo'
  },
  {
    name: 'Skechers',
    state: 'inactivo'
  },
  {
    name: 'Vans',
    state: 'activo'
  }

  
],
  users: [
    {
      email: 'favio@google.com',
      name: 'Favio Carbajal',
      password: bcryptjs.hashSync('123456'),
      role: 'admin'
    },
    {
      email: 'wuilmer@google.com',
      name: 'Wuilmer Carbajal',
      password: bcryptjs.hashSync('123456'),
      role: 'admin'
    },
    {
      email: 'Maria@google.com',
      name: 'Maria Flores',
      password: bcryptjs.hashSync('123456'),
      role: 'user'
    },


  ],


  categories: [
    'Abarrotes',
    'Bebidas', 
    'Cuidado Personal',
    'Higiene',
    'Licores',
    'Todos',
  ],
  products: [
    
      {        
        "description": "Designed for fit, comfort and style, the Men''s 3D T Logo Long Sleeve Tee is made from 100% cotton and features an understated T logo on the left chest.",
        images: [
          'https://res.cloudinary.com/dcdnrrshw/image/upload/v1735964009/gcs7zm1tyuqdntwrtjwx.webp',
          'https://res.cloudinary.com/dcdnrrshw/image/upload/v1735964008/gpmyo6g2eoaf9xb0uwyv.webp'
        ],
        "title": "Men''s 3D T Logo Long Sleeve Tee",
        "inStock": 12,
        type: "shirts",
        "price": 40,
        "sizes": ['XS','XXL'],
        "slug": "men_3d_t_logo_long_sleeve_tee",
        "tags": ["shirt"],
        "gender": "men",                             
        
      },   
    
    
  ]
};