import React from "react";
import { IProduct } from "../contexts/ProductsContext";
import Image from "next/image";
import { convertNumberToBRL } from "../utils/convertNumberToBRL";
import NoImageProduct from "../../public/noImageProduct.png";
import { useCartContext } from "../contexts/CartContext";

interface IProductCard {
	product: IProduct;
}

const ProductCard = ({ product }: IProductCard) => {
	const { addToCart } = useCartContext();
	return (
		<li className="mx-auto bg-white rounded-md overflow-hidden shadow-md w-full max-w-[295px]">
			<Image
				className="object-cover w-full h-56"
				src={product?.image || NoImageProduct}
				priority
				height={200}
				width={200}
				alt="Product Image"
			/>
			<div className="p-4">
				<h2 className="text-gray-900 font-semibold text-lg mb-2 truncate">
					{product.name}
				</h2>

				<p className="text-gray-700 font-medium text-xl mb-2">
					{convertNumberToBRL(product.price)}
				</p>
				<button
					className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2  rounded w-full"
					onClick={() => addToCart(product)}
				>
					Adicionar ao carrinho
				</button>
			</div>
		</li>
	);
};

export default ProductCard;
