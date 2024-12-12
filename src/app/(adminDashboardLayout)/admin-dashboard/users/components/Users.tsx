"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllUsers } from "@/hooks/user.hook";
import { IUser } from "@/types";
import { useState } from "react";
import { columns } from "./data-table/columns";
import { UserDataTable } from "./data-table/data-table";

const Users = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetAllUsers([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching users.</p>;
  }

  const users: IUser[] = data?.data || [];
  const totalRows = data?.meta?.total || 0;

  return (
    <>
      <UserDataTable
        data={users}
        columns={columns}
        pagination={{
          page,
          pageSize,
          totalRows: totalRows,
          onPageChange: setPage,
          onPageSizeChange: setPageSize,
        }}
      />
    </>
  );
};

export default Users;
