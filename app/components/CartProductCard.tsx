"use client";
import { IProductCart, useCartContext } from "../contexts/CartContext";
import { MdAdd } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineMinus } from "react-icons/ai";
import Image from "next/image";
import NoImageProduct from "../../public/noImageProduct.png";
import { convertNumberToBRL } from "../utils/convertNumberToBRL";

interface ICartProductCard {
	item: IProductCart;
}
const CartProductCard = ({ item }: ICartProductCard) => {
	const { minusOneProduct, addOneProduct } = useCartContext();

	return (
		<div className="flex items-center border-b border-gray-200 py-4">
			<div className="flex-none w-20 h-20 relative">
				<Image
					className="object-cover w-full h-full rounded-lg"
					src={item?.image || NoImageProduct}
					priority
					height={50}
					width={50}
					alt={item.name}
				/>
			</div>
			<div className="ml-4 flex-auto">
				<div className="flex justify-between">
					<h2 className="font-bold text-lg truncate w-40 hover:text-clip">
						{item.name}
					</h2>
					<span className="font-bold text-lg">
						{convertNumberToBRL(item.price)}
					</span>
				</div>
				<div className="flex justify-between mt-2">
					<div className="flex items-center">
						<button
							onClick={() => minusOneProduct(item._id)}
							className="text-gray-500 hover:text-gray-700"
						>
							{item.amount === 1 ? <FaTrashAlt /> : <AiOutlineMinus />}
						</button>
						<span className="mx-2 text-gray-700">{item.amount}</span>
						<button
							onClick={() => addOneProduct(item._id)}
							className="text-gray-500 hover:text-gray-700"
						>
							<MdAdd />
						</button>
					</div>
					<span className="text-gray-500 text-sm">
						Subtotal: {convertNumberToBRL(item.price * item.amount)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default CartProductCard;
