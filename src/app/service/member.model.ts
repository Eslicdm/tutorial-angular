export interface Member {
  id?: number;
  name: string;
  age: number;
  owner: string;
  sons: string[];
  deletedDate: Date | null;
}
