"use client";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import Table from "@/components/table/Table";
import { fetchData } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function UsersPage({}) {
  const params = useSearchParams();
  const router = useRouter();
  const session = useSession();
  let currentPage = parseInt(params.get("page") || "1");
  const limit = 10;

  useEffect(() => {
    if (currentPage < 1) {
      router.push("?page=1");
    }
  }, [currentPage]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () =>
      fetchData(
        "users",
        {
          "filter[email][_nnull]": true,
          page: currentPage,
          fields: ["id", "first_name", "last_name", "email", "role.name"],
          limit: limit,
          meta: "total_count",
        },
        session?.data?.access_token as string
      ),
  });

  if (isLoading) {
    return (
      <section className="min-h-[80svh] flex items-center justify-center">
        <Loader />
      </section>
    );
  }

  const columns = [
    { field: "full_name", header: "Full Name" },
    { field: "email", header: "Email" },
    { field: "user_role", header: "Role" },
  ];

  const userData = data.data.map((user: any) => {
    return {
      ...user,
      full_name: user.first_name + " " + user.last_name,
      user_role: user.role.name,
    };
  });

  return (
    <section className="min-h-[80svh] flex flex-col gap-0 items-center justify-center">
      <Table data={userData} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.floor(data.meta.total_count / limit)}
        onPageChange={(page) => {
          router.push(`?page=${page}`);
        }}
      />
    </section>
  );
}
