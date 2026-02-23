import type { PublicUser } from "./public-user";

export type Settlement = {
	creditor: PublicUser;
	debitor: PublicUser;
	amount: number;
};
