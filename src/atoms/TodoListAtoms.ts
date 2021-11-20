import { atom } from 'recoil'

interface Todo {
  id: string;
  name: string;
  done: boolean;
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: []
});
