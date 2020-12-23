interface Identifiable {
  id?: number;
}

export interface Entity<T extends Identifiable> {
  find(id: number): Promise<T>;
  insert(entity: T): Promise<T["id"]>;
  getTablename(): string;
}
