import { create } from 'zustand';
import zukeeper from 'zukeeper';

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
