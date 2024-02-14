import { create } from "zustand";
import { UserRegisterType } from "../types/user";

type UserState = {
  user: UserRegisterType | null;
  setUser: (user: UserRegisterType | null) => void;
};

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
