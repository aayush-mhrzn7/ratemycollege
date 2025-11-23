import { getAffiliations } from "@/data/affiliations/affiliation";

const page = async () => {
  const affiliations = await getAffiliations({});
  return <div>page</div>;
};

export default page;
