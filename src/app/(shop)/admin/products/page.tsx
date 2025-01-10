
export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedOrders, getPaginatedProductsWithImages } from "@/actions";
import { DeleteButton, Pagination, ViewImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";

import Link from "next/link";
import { redirect } from "next/navigation";


interface Props {
  searchParams: {
    page?: string;
  };
}


export default async function OrdersPage( { searchParams }: Props ) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages( { page } );

  const deleteProduct = async ( productId: string ) => {
    await deleteProduct( productId );
    redirect( '/admin/products' );
  };

  return (
    <>
    <Title title="Mantenimiento de productos" />

    <div className="flex justify-end mb-5">
      <Link href="/admin/product/new" className="btn-primary">
        Nuevo producto
      </Link>
    </div>

    <div className="mb-10">
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900   text-left"
            >
              Imagen
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900   text-left"
            >
              Titulo
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900   text-left"
            >
              Marca
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900   text-left"
            >
              Contenido
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900   text-left"
            >
              Unidad de medida
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900   text-left"
            >
              Precio
            </th>

            <th
              scope="col"
              className="text-sm font-medium text-gray-900   text-left"
            >
              Inventario
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900   text-left"
            >
              Acciones
            </th>

          </tr>
        </thead>
        <tbody>
           { products.map( ( product ) => (
            <tr
              key={ product.id }
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="   text-sm font-medium text-gray-900">
                 <Link href={ `/product/${ product.slug }` }>
                  <ViewImage
                    src={ product.ProductImage[ 0 ]?.url }
                    width={ 80 }
                    height={ 80 }
                    alt={ product.title }
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link> 
              </td>
              <td className="text-sm text-gray-900 font-light   ">
                <Link
                  href={ `/admin/product/${ product.slug }` }
                  className="hover:underline"
                >
                  { product.title }
                </Link>
              </td>
              <td className="text-sm font-bold  text-gray-900   ">
                { product.brand?.name }
              </td>
              <td className="text-sm font-bold  text-gray-900   ">
                { product.descriptionMeasure }
              </td>
              <td className="text-sm font-bold  text-gray-900   ">
                { product.measure }
              </td>
              <td className="text-sm font-bold  text-gray-900   ">
                { currencyFormat( product.price ) }
              </td>

              <td className="text-sm text-gray-900 font-bold   ">
                { product.inStock }
              </td>
              <td className="text-sm text-gray-900 font-bold   ">
                <DeleteButton id={ product.id } />
              </td>
            </tr>
          ) ) } 
        </tbody>
      </table>

      <Pagination totalPages={ totalPages } />
    </div>
  </>
  );
}
