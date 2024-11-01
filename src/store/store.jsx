import { create } from 'zustand';

const UserStore = create((set) => ({
  users: [],

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
}));

export default UserStore;
