import { useExpenses } from "@/hooks/expenses/use-expenses";
import PopUp from "../shared/ui/pop-up";
import { useAuth } from "@/auth/hooks/use-auth";
import type { FC } from "react";
import type { Settlement } from "@/types/settlements";
import type { UserContext } from "@/types/user-context";

const Settlements = () => {
	const { userContext } = useAuth();
	const {
		settlements,
		showSettlements,
		setShowSettlements,
		fetchingSettlements,
	} = useExpenses();

	return (
		<PopUp
			open={showSettlements}
			close={() => setShowSettlements(false)}
			title="Settlements"
		>
			<p className="text-sm px-2">All users settlements</p>
			<div className="border rounded-md max-h-60 overflow-y-scroll">
				{fetchingSettlements ? (
					<span>
						<p className="bg-gray-100 animate-pulse h-9 py-2 m-2 rounded-sm"></p>
						<p className="bg-gray-100 animate-pulse h-9 py-2 m-2 rounded-sm"></p>
					</span>
				) : (
					<>
						{settlements.length === 0 ? (
							<p className="text-center text-gray-500 py-4">
								No settlements found.
							</p>
						) : (
							settlements.map((settlement) => (
								<SettlementCard
									key={
										settlement.creditor.id +
										settlement.debitor.id
									}
									settlement={settlement}
									userContext={userContext}
								/>
							))
						)}
					</>
				)}
			</div>
		</PopUp>
	);
};

export default Settlements;

const SettlementCard: FC<{
	settlement: Settlement;
	userContext: UserContext | null;
}> = ({ settlement, userContext }) => {
	const { folder, resolveSettlement } = useExpenses();

	return (
		<div
			key={settlement.creditor.id + settlement.debitor.id}
			className="border-b last:border-b-0 py-1.5 px-2 flex items-center gap-x-4"
		>
			<p>
				{settlement.debitor.firstName} owes{" "}
				{settlement.creditor.firstName} ₹ {settlement.amount}
			</p>
			<span className="grow-1"></span>
			{userContext?.userId === settlement.creditor.id && (
				<span
					className="text-sm text-blue-700 hover:scale-105 transition-all duration-100 cursor-pointer"
					onClick={() => {
						if (folder) {
							resolveSettlement(folder.id, settlement.debitor.id);
						}
					}}
				>
					Settle
				</span>
			)}
		</div>
	);
};
