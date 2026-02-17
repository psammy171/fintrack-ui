import type { PublicUser } from "@/types/public-user";
import type { FC } from "react";
import CheckBox from "../shared/ui/check-box";

interface Props {
	searchedUsers: PublicUser[];
	selectedUsers: PublicUser[];
	sharedUsers: PublicUser[];
	selectUser: (user: PublicUser) => void;
}

const PublicUserList: FC<Props> = ({
	searchedUsers,
	selectedUsers,
	sharedUsers,
	selectUser,
}) => {
	const isUserSelected = (user: PublicUser): boolean => {
		return selectedUsers.some(
			(selectedUser) => selectedUser.userId === user.userId,
		);
	};

	const getCombinedUsers = (
		selectedUsers: PublicUser[],
		searchedUsers: PublicUser[],
	): PublicUser[] => {
		const searchedNonSelectedUsers = searchedUsers.filter(
			(user) =>
				!selectedUsers.some(
					(selectedUser) => selectedUser.userId === user.userId,
				),
		);

		return [...selectedUsers, ...searchedNonSelectedUsers].sort((a, b) =>
			`${a.firstName} ${a.lastName}`.localeCompare(
				`${b.firstName} ${b.lastName}`,
			),
		);
	};

	return (
		<div className="flex flex-col gap-y-2">
			{searchedUsers.length === 0 && selectedUsers.length === 0 ? (
				<p className="text-center my-4">No users found</p>
			) : (
				<>
					{getCombinedUsers(selectedUsers, searchedUsers).map(
						(user) => (
							<UserComponent
								user={user}
								isUserSelected={isUserSelected(user)}
								selectUser={selectUser}
								isUserAlreadyShared={sharedUsers.some(
									(sharedUser) =>
										sharedUser.userId === user.userId,
								)}
								key={user.userId}
							/>
						),
					)}
				</>
			)}
		</div>
	);
};

export default PublicUserList;

const UserComponent = ({
	user,
	isUserSelected,
	selectUser,
	isUserAlreadyShared,
}: {
	user: PublicUser;
	isUserSelected: boolean;
	selectUser: (user: PublicUser) => void;
	isUserAlreadyShared: boolean;
}) => {
	return (
		<div key={user.userId} className="flex items-center gap-x-2">
			<CheckBox
				disabled={isUserAlreadyShared}
				checked={isUserAlreadyShared || isUserSelected}
				onChange={() => !isUserAlreadyShared && selectUser(user)}
			/>
			<span
				className="cursor-pointer"
				onClick={() => !isUserAlreadyShared && selectUser(user)}
			>
				{user.firstName} {user.lastName}
			</span>
			{isUserAlreadyShared && (
				<span className="text-sm border rounded-lg px-2 bg-indigo-100 text-indigo-600 border-indigo-600">
					Shared
				</span>
			)}
		</div>
	);
};
