const getCollege = async <T>(): Promise<T> => {
  const res = await fetch(
    "https://base.collegeinfonepal.com/api/college/?size=10"
  );
  if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
  return (await res.json()) as T;
};
const getInformations = async <T>(): Promise<T> => {
  const res = await fetch(
    "https://base.collegeinfonepal.com/api/information/?size=10"
  );
  if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
  return (await res.json()) as T;
};

export { getCollege, getInformations };
