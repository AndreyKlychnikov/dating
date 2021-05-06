export interface IUser {
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    full_name: string;
    id: number;
}

export interface IUserUpdate {
    email?: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserCreate {
    email: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserProfile {
    description?: string;
    age?: number;
    sex?: boolean;
    id?: number;
    avatar?: string;
}
export interface IUserProfileUpdate {
    description?: string;
    age?: number;
    sex?: boolean;
}
export interface IUserProfileCreate {
    description?: string;
    age?: number;
    sex?: boolean;
}

