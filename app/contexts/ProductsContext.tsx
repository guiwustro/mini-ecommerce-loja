"use client";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { api } from "../services/api";

export interface IProduct {
	_id: string;
	name: string;
	price: number;
	amount: number;
	image: string;
	is_active: boolean;
	created: string;
	updated: string;
}

interface IProductsProviderData {
	allProducts: IProduct[] | undefined;
	isLoading: boolean;
	nextPage: () => void;
	previousPage: () => void;
	currentPage: number;
	modalProduct: IModalProduct;
	openModalProduct: (_id: string) => void;
	closeModalProduct: () => void;
}

interface IProductsProps {
	children: ReactNode;
}

export interface IModalProduct {
	_id: string;
	isOpen: boolean;
}

interface IProductsResponse {
	data: {
		products: IProduct[];
		totalCount: number;
		totalPages: number;
		currentPage: number;
	};
}

const ProductsContext = createContext({} as IProductsProviderData);

export const ProductsProvider = ({ children }: IProductsProps) => {
	const [allProducts, setAllProducts] = useState<IProduct[]>();
	const [currentPage, setCurrentPage] = useState(1);
	const [modalProduct, setModalProduct] = useState<IModalProduct>({
		_id: "",
		isOpen: false,
	});
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const nextPage = () => {
		setCurrentPage((old) => old + 1);
	};

	const previousPage = () => {
		if (currentPage === 1) return;
		setCurrentPage((old) => old - 1);
	};

	const openModalProduct = (_id: string) => {
		setModalProduct({
			_id,
			isOpen: true,
		});
	};
	const closeModalProduct = () => {
		setModalProduct({
			_id: "",
			isOpen: false,
		});
	};

	useEffect(() => {
		api
			.get("/products", {
				params: {
					page: currentPage,
				},
			})
			.then((response: IProductsResponse) => {
				setAllProducts(response.data.products);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [currentPage]);

	return (
		<ProductsContext.Provider
			value={{
				allProducts,
				isLoading,
				nextPage,
				previousPage,
				currentPage,
				openModalProduct,
				closeModalProduct,
				modalProduct,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export const useProductsContext = () => useContext(ProductsContext);
