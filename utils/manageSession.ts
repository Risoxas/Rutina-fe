// utils/getCurrentUser.ts
export const getSession = (label: string): any => {
  if (typeof window !== "undefined") {
    const sessionData = localStorage.getItem(label);
    return sessionData ? JSON.parse(sessionData) : null;
  }
  return null;
};

export const setSession = (label: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(label, JSON.stringify(data));
  }
};

export const removeSession = (label: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(label);
  }
};
