
// https://tailwindcomponents.com/component/hoverable-table

import { getPaginatedBrands } from "@/actions";
import { BrandDeleteButton, Pagination, Title } from "@/components";

export const revalidate = 0;

import Link from "next/link";
import { redirect } from "next/navigation";
import { TbEdit } from "react-icons/tb";


export default async function BrandsPage() {

  const { ok, brands = [], message } = await getPaginatedBrands();

  if ( !ok ) {
    console.error('Error al obtener las marcas:', message);
    redirect( "/auth/login" );
  }

  if (brands.length === 0) {
    return <div>No se encontraron marcas. Por favor, agregue algunas marcas.</div>;
  }

  

  return (
    <>
      <Title title="Todas las marcas" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/brand/new" className="btn-primary">
          Nueva marca
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            { brands.map( ( brand ) => (
              <tr
                key={ brand.id }
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  { brand.id.split( "-" ).at( -1 ) }
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  { brand.name }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  { brand.state }
                </td>


                <td className="text-sm text-gray-900 font-light px-6 w-32">
                  <div className="flex gap-2 ">
                    <Link href={ `/admin/brand/${ brand.id }` } className="hover:text-blue-500">
                      <TbEdit size={ 25 } />
                    </Link>

                    <BrandDeleteButton brandId={ brand.id }  />
                  </div>
                </td>
              </tr>
            ) ) }


          </tbody>
        </table>

        <Pagination totalPages={ 1 } />
      </div>
    </>
  );
}
