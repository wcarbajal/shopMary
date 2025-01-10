'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Gender, Measure, Product, Size } from '@prisma/client';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
import { User } from '@/interfaces';

cloudinary.config( process.env.CLOUDINARY_URL ?? '' );


export const createUpdateUser = async ( formData: FormData ) => {


  const data = Object.fromEntries( formData );
 

  const { id, imagen, ...rest } = data;
  console.log({data})
  return  'grabado' 

/* 
  try {
    const prismaTx = await prisma.$transaction( async ( tx ) => {

      let user: User;
      

      if ( id ) {
        // Actualizar
        const user12 = await prisma.user.update( {
          where: { id: id },
          data: {
            name: rest.name,

          }
        } );

      } else {
        // Crear

        product = await prisma.product.create( {
          data: {
            title: rest.title,
            description: rest.description,
            inStock: rest.inStock,
            price: rest.price,
            slug: rest.slug,
            descriptionMeasure: rest.descriptionMeasure,
            measure: rest.measure as Measure,
            categoryId: rest.categoryId,
            brandId: rest.brandId,
            gender: rest.gender,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray
            }
          }
        } );

      }
      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas
      if ( formData.getAll( 'images' ) ) {
        // [https://url.jpg, https://url.jpg]
        const images = await uploadImages( formData.getAll( 'images' ) as File[] );
        if ( !images ) {
          throw new Error( 'No se pudo cargar las imágenes, rollingback' );
        }

        await prisma.productImage.createMany( {
          data: images.map( image => ( {
            url: image!,
            productId: product.id,
          } ) )
        } );

      }

      return {
        'product'
      };
    } );


    // Todo: RevalidatePaths
    revalidatePath( '/admin/products' );
    revalidatePath( `/admin/product/${ product.slug }` );
    revalidatePath( `/products/${ product.slug }` );


    return {
      ok: true,
      product: prismaTx.product,
    };


  } 
  catch ( error ) {

    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar/crear'
    };
  } */

};



const uploadImages = async ( images: File[] ) => {

  try {


    const uploadPromises = images.map( async ( image ) => {

      try {
        const Body = await image.arrayBuffer();
        const base64Image = Buffer.from( Body ).toString( 'base64' );
       
        return cloudinary.uploader.upload( `data:image/png;base64,${ base64Image }` )
          .then( r => r.secure_url );

        //return url
          
        

      } catch ( error ) {
        console.log( error );
        return null;
      }
    } );


    const uploadedImages = await Promise.all( uploadPromises );
    return uploadedImages;


  } catch ( error ) {

    console.log( error );
    return null;

  }


};
