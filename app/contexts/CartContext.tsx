"use client";

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { IProduct, useProductsContext } from "./ProductsContext";
import { toast } from "react-hot-toast";
import { api } from "../services/api";
import { useUserContext } from "./UserContext";
const CartContext = createContext<ICartProviderData>({} as ICartProviderData);

interface ICartProps {
	children: ReactNode;
}

export interface IProductCart {
	_id: string;
	name: string;
	price: number;
	amount: number;
	maxAmount: number;
	amountPrice: number;
	is_active: boolean;
	image: string;
}

interface ICartProviderData {
	addToCart: (product: IProduct) => void;
	removeFromCart: (productId: string) => void;
	addOneProduct: (productId: string) => void;
	minusOneProduct: (productId: string) => void;
	amountCart?: number;
	totalCart: number;
	freightCart: number;
	toogleModalCart: () => void;
	isOpenCart: boolean;
	cart?: IProductCart[];
	sendAOrder: () => void;
}

const CartProvider = ({ children }: ICartProps) => {
	let cookieCartJSON;
	if (typeof window !== "undefined") {
		const localStorageCart = localStorage.getItem("@mini-ecommerce:cart");
		if (localStorageCart !== "undefined" && localStorageCart) {
			cookieCartJSON = JSON.parse(localStorageCart);
		}
	}

	const [cart, setCart] = useState<IProductCart[] | undefined>(cookieCartJSON);
	const [freightCart, setFreightCart] = useState(0);
	const [isOpenCart, setIsOpenCart] = useState(false);
	const { showLoginForm, isAuthenticated } = useUserContext();

	const toogleModalCart = () => {
		setIsOpenCart((old) => !old);
	};

	useEffect(() => {
		const cartString = JSON.stringify(cart);
		localStorage.setItem("@mini-ecommerce:cart", cartString);
	}, [cart]);

	const totalCart =
		cart?.reduce((acc, product) => {
			return acc + product.amountPrice;
		}, 0) || 0;

	let productsCartCopy: IProductCart[];
	if (cart) {
		productsCartCopy = [...cart];
	}

	const indexProduct = (currentId: string) => {
		if (cart) {
			return cart?.findIndex(({ _id }) => _id === currentId);
		}
		return 0;
	};

	const updateAmountPrice = (currentId: number) => {
		productsCartCopy[currentId].amountPrice =
			productsCartCopy[currentId].amount * productsCartCopy[currentId].price;
		setCart(productsCartCopy);
	};

	const addToCart = (product: IProduct) => {
		const isOnCart = cart?.some(({ _id }) => _id == product._id);

		if (isOnCart) {
			addOneProduct(product._id);
		} else {
			const productCart: IProductCart = {
				...product,
				amount: 1,
				amountPrice: product.price,
				maxAmount: product.amount,
			};
			setCart((old) => {
				if (typeof old === "undefined") return [productCart];
				const newCart = [...old, productCart];
				return newCart;
			});
		}
	};

	const removeFromCart = (currentId: string) => {
		const currentIndex = indexProduct(currentId);
		if (cart) {
			const newCart = cart?.filter((_, index) => index !== currentIndex);
			setCart(newCart);
		}
	};

	const addOneProduct = (productId: string) => {
		const currentIndex = indexProduct(productId);
		if (
			productsCartCopy[currentIndex].amount ===
			productsCartCopy[currentIndex].maxAmount
		) {
			toast.error(
				`A quantidade máxima disponível em estoque desse produto é de ${productsCartCopy[currentIndex].maxAmount} unidades`
			);
			return;
		}
		productsCartCopy[currentIndex].amount++;
		setCart(productsCartCopy);

		updateAmountPrice(currentIndex);
	};

	const minusOneProduct = (productId: string) => {
		const currentIndex = indexProduct(productId);
		if (productsCartCopy[currentIndex].amount > 1) {
			productsCartCopy[currentIndex].amount--;
			setCart(productsCartCopy);
			updateAmountPrice(currentIndex);
		} else if (productsCartCopy[currentIndex].amount === 1) {
			removeFromCart(productId);
		}
	};

	const sendAOrder = () => {
		if (!isAuthenticated) {
			showLoginForm();
			return;
		}

		const orderRequest = cart?.map((product) => {
			return {
				_id: product._id,
				amount: product.amount,
			};
		});
		const orderRequestJSON = JSON.stringify(orderRequest);
		toast.loading("Enviando pedido, por favor aguarde...");

		api
			.post("/orders", { products: orderRequestJSON })
			.then(() => {
				setCart(undefined);
				toast.dismiss();
				toast.success(
					'Pedido efetuado com sucesso! Você pode conferir o status do pedido em "Meus pedidos"'
				);
			})
			.catch((err) => {
				toast.dismiss();
				toast.error(
					"Ocorreu um erro ao tentar realizar o pedido. Tente novamente mais tarde."
				);
			});
	};

	return (
		<CartContext.Provider
			value={{
				addToCart,
				removeFromCart,
				minusOneProduct,
				addOneProduct,
				totalCart,
				freightCart,
				toogleModalCart,
				isOpenCart,
				cart,
				sendAOrder,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
export const useCartContext = () => useContext(CartContext);
