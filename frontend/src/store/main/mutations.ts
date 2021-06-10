import { ISendSympathy, ISympathy, IUser, IUserProfile } from '@/interfaces';
import { MainState, AppNotification } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';


export const mutations = {
    setToken(state: MainState, payload: string) {
        state.token = payload;
    },
    setLoggedIn(state: MainState, payload: boolean) {
        state.isLoggedIn = payload;
    },
    setLogInError(state: MainState, payload: boolean) {
        state.logInError = payload;
    },
    setUser(state: MainState, payload: IUser) {
        state.user = payload;
    },
    setSendSympathy(state: MainState, payload: ISendSympathy) {
        state.sendSympathy = payload;
    },
    setSympathies(state: MainState, payload: ISympathy[]) {
        state.sympathies = payload;
    },
    setUserProfile(state: MainState, payload: IUserProfile) {
        state.userProfile = payload;
    },
    setUserId(state: MainState, payload: IUser) {
        state.userId = payload;
    },
    setUserProfileNotShown(state: MainState, payload: IUserProfile) {
        state.userProfileNotShown = payload;
    },
    setUserProfileAvatar(state: MainState, payload: FormData) {
        state.userProfileAvatar = payload;
    },
    setDashboardMiniDrawer(state: MainState, payload: boolean) {
        state.dashboardMiniDrawer = payload;
    },
    setDashboardShowDrawer(state: MainState, payload: boolean) {
        state.dashboardShowDrawer = payload;
    },
    addNotification(state: MainState, payload: AppNotification) {
        state.notifications.push(payload);
    },
    removeNotification(state: MainState, payload: AppNotification) {
        state.notifications = state.notifications.filter((notification) => notification !== payload);
    },
};

const {commit} = getStoreAccessors<MainState | any, State>('');

export const commitSetDashboardMiniDrawer = commit(mutations.setDashboardMiniDrawer);
export const commitSetDashboardShowDrawer = commit(mutations.setDashboardShowDrawer);
export const commitSetLoggedIn = commit(mutations.setLoggedIn);
export const commitSetLogInError = commit(mutations.setLogInError);
export const commitSetToken = commit(mutations.setToken);
export const commitSetUser = commit(mutations.setUser);
export const commitSetUserId = commit(mutations.setUserId);
export const commitSendSympathy = commit(mutations.setSendSympathy);
export const commitGetSympathy = commit(mutations.setSympathies);
export const commitSetUserProfile = commit(mutations.setUserProfile);
export const commitSetUserProfileNotShown = commit(mutations.setUserProfileNotShown);
export const commitSetUserProfileAvatar = commit(mutations.setUserProfileAvatar);
export const commitAddNotification = commit(mutations.addNotification);
export const commitRemoveNotification = commit(mutations.removeNotification);
