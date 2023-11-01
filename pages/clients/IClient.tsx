type Routines = {
  weekDay: number;
  exercises: Record<string, string[]>;
  notes?: string;
};

type weightsHistory = {
  exerciseId: string;
  weight: number;
  date: Date;
};

interface IClient {
  _id: string;
  name: string;
  lastName: string;
  middleName?: string;
  secondLastName?: string;
  age: number;
  objective?: string;
  lastUpdate: string;
  creationDate: string;
  weight: number;
  height: number;
  routines?: Array<Routines> | null;
  weightHistory?: Array<weightsHistory> | null;
}

export default IClient;
