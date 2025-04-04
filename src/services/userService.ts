import apiClient from '../utils/apiClient';
import { ApiResponse, UserListResponse, CreateUserRequest, UpdateUserRequest } from '../types/api';
import { User } from '../types';

export const userService = {
  // Get all users
  getUsers: () => {
    return apiClient.get<ApiResponse<UserListResponse>>('/users');
  },

  // Get user by ID
  getUser: (userId: string) => {
    return apiClient.get<ApiResponse<User>>(`/users/${userId}`);
  },

  // Create new user
  createUser: (userData: CreateUserRequest) => {
    return apiClient.post<ApiResponse<User>>('/users', userData);
  },

  // Update user
  updateUser: (userId: string, userData: UpdateUserRequest) => {
    return apiClient.put<ApiResponse<User>>(`/users/${userId}`, userData);
  },

  // Delete user
  deleteUser: (userId: string) => {
    return apiClient.delete<ApiResponse<void>>(`/users/${userId}`);
  },
};