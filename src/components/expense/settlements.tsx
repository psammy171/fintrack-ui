import { useExpenses } from "@/hooks/expenses/use-expenses";
import PopUp from "../shared/ui/pop-up";
import { useAuth } from "@/auth/hooks/use-auth";

const Settlements = () => {
	const { userContext } = useAuth();
	const { settlements, showSettlements, setShowSettlements } = useExpenses();

	return (
		<PopUp
			open={showSettlements}
			close={() => setShowSettlements(false)}
			title="Settlements"
		>
			<p className="text-sm px-2">All users settlements</p>
			<div className="border rounded-md max-h-60 overflow-y-scroll">
				{settlements.length === 0 ? (
					<p className="text-center text-gray-500">
						No settlements found.
					</p>
				) : (
					settlements.map((settlement) => (
						<div
							key={
								settlement.creditor.userId +
								settlement.debitor.userId
							}
							className="border-b py-1.5 px-2 flex items-center"
						>
							<p>
								{settlement.debitor.firstName} owes{" "}
								{settlement.creditor.firstName} ₹{" "}
								{settlement.amount}
							</p>
							<span className="grow-1"></span>
							{userContext?.userId ===
								settlement.creditor.userId && (
								<span className="text-sm text-blue-700 hover:scale-105 transition-all duration-100 cursor-pointer">
									Settle
								</span>
							)}
						</div>
					))
				)}
			</div>
		</PopUp>
	);
};

export default Settlements;
