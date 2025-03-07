
import { create } from 'zustand';
import { User } from '../../services/userService';

const useAuthStore = create((set) => ({
  user: null,
  login: (userData : User) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;