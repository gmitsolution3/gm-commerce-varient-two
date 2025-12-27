import { getProductDetails } from '@/lib/products';
import React from 'react'

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductDetails =async ({ params }: ProductPageProps) => {
    const {slug} = await params;


    const result =await getProductDetails(slug)

    console.log("get product details", result)


  return <div>ProductDetails</div>;
};

export default ProductDetails
