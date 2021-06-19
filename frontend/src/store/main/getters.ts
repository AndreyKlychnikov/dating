import { MainState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
    hasAdminAccess: (state: MainState) => {
        return (
            state.user &&
            state.user.is_superuser && state.user.is_active);
    },
    loginError: (state: MainState) => state.logInError,
    dashboardShowDrawer: (state: MainState) => state.dashboardShowDrawer,
    dashboardMiniDrawer: (state: MainState) => state.dashboardMiniDrawer,
    user: (state: MainState) => state.user,
    userProfile: (state: MainState) => state.userProfile,
    userProfileById: (state: MainState) => state.userProfileById,
    userId: (state: MainState) => state.userId,
    userProfileNotShown: (state: MainState) => state.userProfileNotShown,
    userSympathies: (state: MainState) => state.sympathies,
    token: (state: MainState) => state.token,
    isLoggedIn: (state: MainState) => state.isLoggedIn,
    firstNotification: (state: MainState) => state.notifications.length > 0 && state.notifications[0],
};

const {read} = getStoreAccessors<MainState, State>('');

export const readDashboardMiniDrawer = read(getters.dashboardMiniDrawer);
export const readDashboardShowDrawer = read(getters.dashboardShowDrawer);
export const readHasAdminAccess = read(getters.hasAdminAccess);
export const readIsLoggedIn = read(getters.isLoggedIn);
export const readLoginError = read(getters.loginError);
export const readToken = read(getters.token);
export const readUser = read(getters.user);
export const readUserProfile = read(getters.userProfile);
export const readUserProfileById = read(getters.userProfileById);
export const readUserId = read(getters.userId);
export const readUserProfileNotShown = read(getters.userProfileNotShown);
export const readUserSympathies = read(getters.userSympathies);
export const readFirstNotification = read(getters.firstNotification);
