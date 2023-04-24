"use client";

import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { useUserContext } from "../contexts/UserContext";
import { useCartContext } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
	const {
		showLoginForm,
		showRegisterForm,
		isAuthenticated,
		logout,
		getUserOrder,
	} = useUserContext();
	const { toogleModalCart, cart } = useCartContext();
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	useEffect(() => {
		getUserOrder();
	}, []);

	return (
		<div className="w-screen h-20  flex justify-center items-center border-b-gray-100 border-b-2">
			<header className="flex gap-4  justify-between max-w-screen-xl w-full px-8 items-center">
				<h3 className="font-bold text-2xl flex items-center">
					<Link href="/">Mini E-commerce</Link>
				</h3>
				<div className="gap-4 items-center relative md:gap-4 md:items-center md:flex">
					<button
						onClick={() => setIsOpenMenu((old) => !old)}
						className="md:hidden"
					>
						<AiOutlineMenu />
					</button>
					<div
						className={`${`${
							isOpenMenu ? "flex" : "hidden"
						}`} absolute top-9 -right-2 bg-gray-50 rounded-lg w-44 flex-col items-center md:flex-row md:static md:flex md:w-full md:bg-transparent`}
					>
						{isAuthenticated ? (
							<div className="">
								<Link
									className="hover:bg-gray-100 px-5 py-2 rounded-lg font-semibold "
									href="/orders"
								>
									Meus pedidos
								</Link>
								<button
									className="hover:bg-gray-100 px-5 py-2 rounded-lg font-semibold "
									onClick={logout}
								>
									Logout
								</button>
							</div>
						) : (
							<>
								<button
									className="hover:bg-gray-100 px-5 py-2 rounded-lg font-semibold"
									onClick={showLoginForm}
								>
									Entrar
								</button>
								<button
									className="hover:bg-gray-100 px-5 py-2 rounded-lg font-semibold "
									onClick={showRegisterForm}
								>
									Cadastre-se
								</button>
							</>
						)}
						<button
							className="hover:bg-gray-100 rounded-lg font-semibold p-2 relative  w-7 "
							onClick={toogleModalCart}
						>
							<AiOutlineShoppingCart size={25} />
							<span className="text-xs absolute top-0 -right-3 rounded-full border-2  border-gray-100 w-5 bg-gray-200 ">
								{cart?.length || 0}
							</span>
						</button>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Header;
