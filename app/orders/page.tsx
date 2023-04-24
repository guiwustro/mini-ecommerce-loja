"use client";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { ModalLogin } from "../components/ModalLogin";
import { ModalRegister } from "../components/ModalRegister";
import Cart from "../components/Cart";
import { useCartContext } from "../contexts/CartContext";
import { useUserContext } from "../contexts/UserContext";
import OrderTable from "./components/OrderTable";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const poppins = Poppins({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
});

export default function Home() {
	const { actualModalForm, isAuthenticated } = useUserContext();
	const { isOpenCart } = useCartContext();
	const navigate = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate.push("/");
		}
	}, []);

	return (
		<>
			<div
				className={`min-h-screen flex-col justify-center ${poppins.variable}`}
			>
				<Header />
				<OrderTable />
				{actualModalForm === "login" && <ModalLogin />}
				{actualModalForm === "register" && <ModalRegister />}
				{isOpenCart && <Cart />}
			</div>
			<Toaster />
		</>
	);
}
