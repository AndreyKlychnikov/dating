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
export interface IUserCreateOpen {
    email: string;
    full_name?: string;
    password: string;
}

export interface IUserProfile {
    description: string;
    age: number;
    sex: boolean;
    preferred_age_min?: number | null;
    preferred_age_max?: number | null;
    preferred_gender?: boolean | null;
    id?: number;
    user_id?: number;
    avatar?: string;
}
export interface IUserProfileUpdate {
    description?: string;
    age?: number;
    sex?: boolean;
    preferred_age_min?: number | null;
    preferred_age_max?: number | null;
    preferred_gender?: boolean | null;
}

export interface ISympathy {
    sender_id: number;
    receiver_id: number;
}
export interface ISendSympathy {
    receiver_id: number;
}

