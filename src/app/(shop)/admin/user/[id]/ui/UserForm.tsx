"use client";

import { useForm } from "react-hook-form";
import { User } from "@/interfaces";
import { createUpdateProduct, } from "@/actions";
import { useRouter } from 'next/navigation';
import { State } from '@prisma/client';
import Link from 'next/link';

interface Props {
  user: Partial<User> ;
};


interface FormInputs {
  name: string;
  email: string;
  telefono: string;
  password: string;
  image: string;
  state: State;
  createdAt: Date;
  updatedAt: Date;
}

export const UserForm = ( { user }: Props ) => {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },

  } = useForm<FormInputs>( {
    defaultValues: {
      name: user!.name ?? '',
      email: user!.email ?? '',
      telefono: user!.telefono ?? '',
      password: user!.password ?? '',
      image: undefined,
      state: user!.state ?? undefined,
      createdAt: user!.createdAt ?? undefined,
      updatedAt: user!.updatedAt ?? undefined

    },
  } );

  const onSubmit = async ( data: FormInputs ) => {

    const formData = new FormData();

    if ( user!.id ) {
      formData.append( "id", user!.id ?? "" );
    }

    formData.append( "name", data.name );
    formData.append( "email", data.email );
    formData.append( "telefono", data.telefono );
    formData.append( "password", data.password );
    formData.append( "image", data.image );
    formData.append( "state", data.state );





    const { ok, product: updatedProduct } = await createUpdateProduct( formData );

    if ( !ok ) {
      alert( 'Producto no se pudo actualizar' );
      return;
    }

    router.replace( `/admin/product/${ updatedProduct?.slug }` );


    /* if ( !brand.ok ) {
      alert( 'Producto no se pudo actualizar' );
      return;
    }
    if ( brand.ok ) {
      alert( 'Marca agregada con éxito' );
    }

    window.location.replace( `/admin/brands` ); */


  };

  return (
    <form
      onSubmit={ handleSubmit( onSubmit ) }
      className="flex flex-col px-5 mb-16 gap-3 "
    >
      {/* Textos */ }
      <div className="w-full">

        <div className="flex flex-col mb-2">
          <span>Nombre: </span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100"
            { ...register( "name", {
              required: {
                value: true,
                message: "El nombre es obligatorio",
              },
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 30,
                message: "El nombre no debe tener más de 30 caracteres",
              },
            } ) }
          />
        </div>
        {
          errors.name && (
            <span className="text-red-500">{ errors.name.message }</span>
          )
        }

        <div className="flex flex-col mb-2">
          <span>Estado: </span>
          <select
            className="p-2 border rounded-md bg-gray-100"
            { ...register( "state", { required: true } ) }
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>


        </div>



      </div>

      <div className="flex justify-center gap-2">

        <Link href='/admin/users' className="btn-secondary">Regresar</Link>
        <button className="btn-primary w-32">Guardar</button>
      </div>

    </form>


  );
};
