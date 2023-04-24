"use client";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import { ModalLogin } from "./components/ModalLogin";
import { ModalRegister } from "./components/ModalRegister";
import { useUserContext } from "./contexts/UserContext";
import Cart from "./components/Cart";
import { useCartContext } from "./contexts/CartContext";
import ProductList from "./components/ProductList";

const poppins = Poppins({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
});

export default function Home() {
	const { actualModalForm } = useUserContext();
	const { isOpenCart } = useCartContext();

	return (
		<>
			<div
				className={`min-h-screen flex-col justify-center ${poppins.variable}`}
			>
				<Header />
				<ProductList />
				{actualModalForm === "login" && <ModalLogin />}
				{actualModalForm === "register" && <ModalRegister />}
				{isOpenCart && <Cart />}
			</div>
			<Toaster />
		</>
	);
}
