import IClient from "../pages/clients/IClient";

type Name = {
  name: string;
  lastName: string;
  middleName?: string;
  secondLastName?: string;
};

type ClientTable = {
  displayName: string;
  weight: string;
  height?: string;
  weekDay: number;
  objective: string;
  lastUpdate: string;
};

export const formatName = (name: Name): string => {
  const isMiddle = !!name.middleName;
  const isSecondLastName = !!name.secondLastName;

  return `${name.name} ${isMiddle ? name.middleName : ""} ${name.lastName} ${
    isSecondLastName ? name.secondLastName : ""
  }`.trim();
};

export const formatClientTable = (client: IClient): ClientTable => ({
  displayName: formatName({
    name: client.name || "-",
    lastName: client.lastName || "-",
    middleName: client.middleName,
    secondLastName: client.secondLastName,
  }),
  weight: `${client.weight} kg` || "-",
  height: `${client.height} cm` || "-",
  weekDay: client.routines?.length
    ? client.routines[client.routines.length - 1].weekDay
    : 0,
  objective: client.objective || "-",
  lastUpdate: client.lastUpdate || "-",
});

export const formatExerciseTable = (exercise: any) => {
  return {
    name: exercise.name,
    videoUrl: exercise.videoUrl,
    update: exercise.update,
  };
};

export const formatRoutineTable = (routine: any) => {
  return {
    weekDay: routine.weekDay,
    exercises: routine.exercises,
    notes: routine.notes,
  };
};

export const equalObjects = (obj1: any, obj2: any) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

const isDateString = (value: any) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return typeof value === "string" && datePattern.test(value);
};

export const parseDatesInObject = (obj: any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isDateString(obj[key])) {
        obj[key] = new Date(obj[key]);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        parseDatesInObject(obj[key]);
      }
    }
  }
  return obj;
};

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
