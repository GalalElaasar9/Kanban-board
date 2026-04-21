import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import initialData from '../data/cards.json';

export interface Card {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

interface BoardState {
  cards: Card[];
  addCard: (card: Omit<Card, 'id'>) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  moveCard: (id: string, newStatus: Card['status']) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      cards: initialData.cards as Card[],

      // Add Card
      addCard: (newCard) =>
        set((state) => ({
          cards: [
            ...state.cards,
            { ...newCard, id: crypto.randomUUID() },
          ],
        })),

      // Update Card 
      updateCard: (id, updates) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, ...updates } : card
          ),
        })),
      // delete Card
      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        })),
      // move Card
      moveCard: (id, newStatus) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, status: newStatus } : card
          ),
        })),
    }),
    {
      name: 'kanban-storage',
      storage:createJSONStorage (() => localStorage),
    }
  )
);