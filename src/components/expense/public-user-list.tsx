import type { PublicUser } from "@/types/public-user";
import type { FC } from "react";
import CheckBox from "../shared/ui/check-box";
import UserLoader from "../shared/ui/loaders/user-loader";

interface Props {
	searchedUsers: PublicUser[];
	selectedUsers: PublicUser[];
	sharedUsers: PublicUser[];
	searching: boolean;
	selectUser: (user: PublicUser) => void;
}

const PublicUserList: FC<Props> = ({
	searchedUsers,
	selectedUsers,
	sharedUsers,
	selectUser,
	searching,
}) => {
	const isUserSelected = (user: PublicUser): boolean => {
		return selectedUsers.some(
			(selectedUser) => selectedUser.id === user.id,
		);
	};

	const getCombinedUsers = (
		selectedUsers: PublicUser[],
		searchedUsers: PublicUser[],
	): PublicUser[] => {
		const searchedNonSelectedUsers = searchedUsers.filter(
			(user) =>
				!selectedUsers.some(
					(selectedUser) => selectedUser.id === user.id,
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
			{searching ? (
				<span>
					{Array.from({ length: 3 }).map(() => (
						<UserLoader />
					))}
				</span>
			) : (
				<>
					{searchedUsers.length === 0 &&
					selectedUsers.length === 0 ? (
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
												sharedUser.id === user.id,
										)}
										key={user.id}
									/>
								),
							)}
						</>
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
		<div
			key={user.id}
			className="flex items-start gap-x-2 border-b pb-3 px-2"
		>
			<CheckBox
				disabled={isUserAlreadyShared}
				checked={isUserAlreadyShared || isUserSelected}
				onChange={() => !isUserAlreadyShared && selectUser(user)}
				className="mt-1.5"
			/>
			<span
				className="cursor-pointer"
				onClick={() => !isUserAlreadyShared && selectUser(user)}
			>
				<p>
					{user.firstName} {user.lastName}
				</p>
				<p className="text-sm text-gray-500">@{user.userName}</p>
			</span>
			{isUserAlreadyShared && (
				<span className="text-xs border rounded-lg px-2 bg-indigo-100 text-indigo-600 border-indigo-600 mt-1">
					Shared
				</span>
			)}
		</div>
	);
};
