import { Email } from './value-objects/email.vo.js';
import { Password } from './value-objects/password.vo.js';
import { UniqueEntityID } from './value-objects/unique-entity-id.vo.js';

interface UserProps {
	name: string;
	email: Email;
	password: Password;
}

export class User {
	private _id: UniqueEntityID;
	private props: UserProps;
	private _createAt: Date;
	private _updateAt: Date;
	private _deleteAt: Date | undefined;

	private constructor(
		{ email, name, password}: UserProps,
		id?: string,
		createAt?: Date,
		updateAt?: Date,
		deleteAt?: Date,
	) {
		this._id = UniqueEntityID.create(id);
		this.props = { email, name, password}
		this._createAt = createAt ?? new Date();
		this._updateAt = updateAt ?? new Date();
		this._deleteAt = deleteAt;
	}

	public static async create(
	{ email, name, password} : Omit<UserProps, "email" | "password"> & { email: string, password: string },
	id?: string,
): Promise<User> {
	const userProps = {
		name,
		email: Email.create(email),
		password: await Password.create(password),
	} satisfies UserProps;

	return new User(userProps, id);
}

public static reconstitute(
	{ email, name, password}: Omit<UserProps, "email" | "password"> & { email: string, password: string },
	id: string,
	createdAt: Date,
	updatedAt: Date,
	deletedAt?: Date,
): User {

	const userProps = {
		name,
		email: Email.create(email),
		password: Password.createFromHash(password)
	} satisfies UserProps;

	return new User(userProps, id, createdAt, updatedAt, deletedAt);
}

	public get id():string {
		return this._id.value;
	}

	public get name() {
		return this.props.name;
	}

	public get email() {
		return this.props.email.value;
	}

	public get password(): string {
		return this.props.password.value;
	}

	public get createAt() {
		return this._createAt;
	}

	public get updateAt() {
		return this._updateAt;
	}

	public get deleteAt() {
		return this._deleteAt;
	}
}
