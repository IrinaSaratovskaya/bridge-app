import create from 'zustand';

interface Store {
    loggedIn: any;
    setLoggedIn: (bool: boolean) => void;
}

export const useStore = create<Store>(set => ({
    loggedIn: JSON.parse(localStorage.getItem('loggedIn') as string),
    setLoggedIn: (bool: boolean) =>  set(state => ({ loggedIn: bool })),
}));