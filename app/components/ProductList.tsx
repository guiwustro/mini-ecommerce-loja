"use client";

import { useProductsContext } from "../contexts/ProductsContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
	const { allProducts, isLoading } = useProductsContext();
	if (isLoading) {
		return (
			<div className="flex justify-center mt-5">
				<div className="max-w-screen-xl flex justify-start w-full px-8 ">
					Carregando produtos...
				</div>
			</div>
		);
	}
	return (
		<div className="flex justify-center mt-5">
			<main className="max-w-screen-xl flex justify-start w-full px-8 ">
				<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
					{allProducts?.map((product) => {
						if (product.is_active)
							return <ProductCard product={product} key={product._id} />;
					})}
				</ul>
			</main>
		</div>
	);
};

export default ProductList;
