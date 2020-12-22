interface Identifiable {
  id: number;
}

export interface AbstractEntity<T extends Identifiable> {
  find(id: number): Promise<T>;
  insert(entity: T): Promise<void>;
}
