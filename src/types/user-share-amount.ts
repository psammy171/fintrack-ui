import type { PublicUser } from "./public-user";

export type UserShareAmount = PublicUser & {
	amount: number;
};
