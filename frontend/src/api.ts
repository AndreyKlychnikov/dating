import axios from 'axios';
import { apiUrl } from '@/env';
import { IUser, IUserUpdate, IUserCreate,
  IUserProfile, IUserProfileUpdate,
  IUserProfileCreate, IUserCreateOpen, ISendSympathy, ISympathy
} from './interfaces';

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`${apiUrl}/api/v1/login/access-token`, params);
  },
  // UsersMe
  async getMe(token: string) {
    return axios.get<IUser>(`${apiUrl}/api/v1/users/me`, authHeaders(token));
  },
  async updateMe(token: string, data: IUserUpdate) {
    return axios.put<IUser>(`${apiUrl}/api/v1/users/me`, data, authHeaders(token));
  },
  async getUser(token: string,id: number) {
    return axios.get<IUser>(`${apiUrl}/api/v1/users/${id}`, authHeaders(token));
  },
  // Profiles

  async getMyProfile(token: string) {
    return axios.get<IUserProfile>(`${apiUrl}/api/v1/profiles/me`, authHeaders(token));
  },
  async updateProfile(token: string, data: IUserProfileUpdate) {
    return axios.put<IUserProfileUpdate>(`${apiUrl}/api/v1/profiles`, data, authHeaders(token));
  },
  async createProfile(token: string, data: IUserProfileCreate) {
    return axios.post<IUserProfileCreate>(`${apiUrl}/api/v1/profiles`, data,  authHeaders(token));
  },
  async uploadAvatar(token: string, data: FormData) {
    return axios.post(`${apiUrl}/api/v1/profiles/upload_avatar/`, data, authHeaders(token));
  },
  // Users
  async getUsers(token: string) {
    return axios.get<IUser[]>(`${apiUrl}/api/v1/users/`, authHeaders(token));
  },
  async updateUser(token: string, userId: number, data: IUserUpdate) {
    return axios.put(`${apiUrl}/api/v1/users/${userId}/`, data, authHeaders(token));
  },
  async createUser(token: string, data: IUserCreate) {
    return axios.post(`${apiUrl}/api/v1/users/`, data, authHeaders(token));
  },
  async createUserOpen(data: IUserCreateOpen) {
    return axios.post(`${apiUrl}/api/v1/users/open/`, data);    
  },
  async notShown(token: string) {
    return axios.get(`${apiUrl}/api/v1/users/not_shown/`,authHeaders(token));    
  },
  async sendSympathy(token: string,data: ISendSympathy) {
    return axios.post(`${apiUrl}/api/v1/users/sympathy/`,data,authHeaders(token));    
  },
  async getSympathies(token: string) {
    return axios.get<ISympathy[]>(`${apiUrl}/api/v1/users/sympathy/`,authHeaders(token));    
  },
  // Password
  async passwordRecovery(email: string) {
    return axios.post(`${apiUrl}/api/v1/password-recovery/${email}/`);
  },
  async resetPassword(password: string, token: string) {
    return axios.post(`${apiUrl}/api/v1/reset-password/`, {
      new_password: password,
      token,
    });
  },
};
