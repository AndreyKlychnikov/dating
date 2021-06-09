import { IUser, IUserProfile, IUserProfileUpdate } from '@/interfaces';

export interface AppNotification {
    content: string;
    color?: string;
    showProgress?: boolean;
}

export interface MainState {
    token: string;
    isLoggedIn: boolean | null;
    logInError: boolean;
    user: IUser | null;
    userProfile: IUserProfile | IUserProfileUpdate | null;
    userProfileAvatar: FormData | null;
    dashboardMiniDrawer: boolean;
    dashboardShowDrawer: boolean;
    notifications: AppNotification[];
}
