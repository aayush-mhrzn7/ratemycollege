import { getAffiliations } from "@/data/affiliations/affiliation";
import { createAffiliation } from "./actions";

const page = async () => {
  const affiliations = await getAffiliations({});

  return <div>page</div>;
};

export default page;
