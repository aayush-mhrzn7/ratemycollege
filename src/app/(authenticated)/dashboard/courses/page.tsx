import CustomTable from "@/components/internal/CustomTable";
import { getCourses } from "@/data/course/course";
import columns from "./column";
import { env } from "@/lib/env";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const currentPage = Number((await searchParams).page) || 1;

  const course = await getCourses({ page: currentPage });

  return (
    <div>
      <CustomTable
        totalPages={Math.ceil(course.count / Number(env.NEXT_PUBLIC_LIMIT))}
        data={course.data}
        columns={columns}
        currentPage={currentPage}
      />
    </div>
  );
};

export default page;
