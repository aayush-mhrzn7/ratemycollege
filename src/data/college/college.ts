const getCollege = async <T>({ size = 200 }: { size?: number }): Promise<T> => {
  const res = await fetch(
    "https://base.collegeinfonepal.com/api/college/?size=" + String(size)
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

const getCollegeDetails = async <T>({ slug }: { slug: string }): Promise<T> => {
  const res = await fetch(
    "https://base.collegeinfonepal.com/api/college/" + slug
  );
  if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
  return (await res.json()) as T;
};
const getCOllegeCOurse = async <T>({
  size = 200,
}: {
  size?: number;
}): Promise<T> => {
  const res = await fetch(
    "https://base.collegeinfonepal.com/api/course/?size=" + String(size)
  );
  if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);

  return (await res.json()) as T;
};
export { getCollege, getInformations, getCollegeDetails, getCOllegeCOurse };
