"use client";

import { useUserContext } from "@/app/contexts/UserContext";
import { convertNumberToBRL } from "@/app/utils/convertNumberToBRL";

const OrderTable = () => {
	const { userOrder: orders } = useUserContext();
	return (
		<div className="w-full rounded-lg  flex lg:justify-center items-center mt-4 overflow-x-auto">
			<table className="w-full table-auto overflow-x-auto  max-w-screen-xl border-2 border-collapse">
				<thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
					<tr>
						<th className="border py-3 px-6 text-left ">Pedido</th>
						<th className="border py-3 px-6 text-left min-w-[270px]">
							Produtos
						</th>
						<th className="border py-3 px-6 text-left">Preço</th>
						<th className="border py-3 px-6 text-left">Status</th>
						<th className="border py-3 px-6 text-left">Criado</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm font-light ">
					{orders?.map((order) => {
						const date = new Date(order.created);
						const formattedDate = `${date.getDate()}/${
							date.getMonth() + 1
						}/${date.getFullYear()}`;
						return (
							<tr key={order._id}>
								<td className="border py-3 px-6 text-left">{order._id}</td>
								<td className="border py-3 px-6 text-left">
									{order.products.map((product) => {
										return (
											<p key={product._id} className="w-full">
												<span>{product.product.name}</span>
												<span className="px-3">-</span>
												<span className="">{`${product.amount} unidade(s)`}</span>
											</p>
										);
									})}
								</td>
								<td className="border py-3 px-6 text-left">
									{convertNumberToBRL(order.total_price)}
								</td>
								<td className="border py-3 px-6 text-left">
									{order.status === "awaiting"
										? "Esperando pagamento"
										: "Encaminhado"}
								</td>
								<td className="border py-3 px-6 text-left">{formattedDate}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default OrderTable;
