"use client";

import { useEffect, useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";

import { useCartContext } from "../contexts/CartContext";
import CartProductCard from "./CartProductCard";
import Modal from "./Modal";
import { convertNumberToBRL } from "../utils/convertNumberToBRL";
import { useUserContext } from "../contexts/UserContext";

const Cart = () => {
	const { freightCart, totalCart, toogleModalCart, sendAOrder, cart } =
		useCartContext();
	const modalRef = useRef<HTMLHeadingElement>(null);
	const { actualModalForm } = useUserContext();
	useEffect(() => {
		function handleOutClick(event: any) {
			const value = modalRef?.current;
			if (
				value &&
				!value.contains(event.target) &&
				actualModalForm === "closed"
			) {
				toogleModalCart();
			}
		}
		document.addEventListener("mousedown", handleOutClick);

		return () => {
			document.removeEventListener("mousedown", handleOutClick);
		};
	}, [actualModalForm]);

	return (
		<Modal className="items-start justify-end">
			<div
				ref={modalRef}
				className="flex w-full bg-white h-screen md:w-1/2  lg:w-2/5 xl:w-1/3 relative"
			>
				<div className="fixed p-4 gap-4 flex items-center shadow-md w-[inherit]">
					<button onClick={toogleModalCart}>
						<AiOutlineLeft />
					</button>
					<h3 className="font-semibold text-2xl">Carrinho</h3>
				</div>
				<div className="overflow-y-auto mt-16 w-full px-4 max-h-screen h-[calc(100vh-166px-64px)]">
					{totalCart === 0 ? (
						<div className="flex-col items-center my-32 mx-4">
							<h2 className="font-semibold text-4xl text-gray-900 text-center mb-5">
								Carrinho vazio
							</h2>
							<p className="mt-1 text-center ">
								Adicione alguns produtos ao seu carrinho e volte aqui para
								finalizar sua compra!
							</p>
						</div>
					) : (
						cart?.map((item) => <CartProductCard item={item} key={item._id} />)
					)}
				</div>

				<div className="fixed self-end w-[inherit] p-4">
					<div className="border-t-2 border-gray-500 pb-2" />
					<div className="flex-col gap-4">
						<div className="flex justify-between">
							<p>Subtotal</p>
							<p>{convertNumberToBRL(totalCart)}</p>
						</div>
						<div className="flex justify-between">
							<p>Frete</p>
							<p>{convertNumberToBRL(freightCart)}</p>
						</div>
						<div className="flex justify-between">
							<p className="total">Total</p>
							<strong className="soma">{convertNumberToBRL(totalCart)}</strong>
						</div>
					</div>
					<div className="flex justify-center">
						<button
							type="button"
							className="font-bold text-lg text-center mt-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 w-full disabled:bg-gray-500"
							disabled={totalCart > 0 ? false : true}
							onClick={sendAOrder}
						>
							Finalizar Pedido
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default Cart;
