import { ISendSympathy, ISympathy, IUser, IUserProfile, IUserProfileUpdate } from '@/interfaces';

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
    userId: IUser | null;
    userProfileNotShown: IUserProfile | null;
    userProfileAvatar: FormData | null;
    sendSympathy: ISendSympathy | null;
    sympathies: ISympathy[] | null;
    dashboardMiniDrawer: boolean;
    dashboardShowDrawer: boolean;
    notifications: AppNotification[];
}
