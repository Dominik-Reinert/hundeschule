interface Identifiable {
  id: string;
}

export interface AbstractEntity<T extends Identifiable> {
  find(id: string): Promise<T>;
  insert(entity: T): Promise<void>;
}
