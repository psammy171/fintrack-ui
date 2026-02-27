import type { PublicUser } from "./public-user";

export interface Folder {
	id: string;
	name: string;
	shared: boolean;
	userId: string;
	sharedUsers?: PublicUser[];
}
