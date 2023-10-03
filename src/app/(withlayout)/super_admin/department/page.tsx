"use client";
import TableProvider from "@/components/table/TableProvider";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { columns, dataSource } from "@/constants/global";
import { useGetallDepartmentsQuery } from "@/redux/api/departmentApi";
import { useDebounced } from "@/redux/hooks";

import { Button, Input } from "antd";
import Link from "next/link";
import { useState } from "react";

const ManageDepartmentPage = () => {
  const [searchTerm, setInputValue] = useState("");
  const query: Record<string, any> = {};
  query["searchTerm"] = searchTerm;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 2000,
  });
  console.log(searchTerm);
  if (!!debouncedTerm) query["searchTerm"] = debouncedTerm;
  const { data }: any = useGetallDepartmentsQuery({ ...query });

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />

      <h1>Department List</h1>
      <div>
        <Input
          placeholder="search here"
          style={{
            width: "20%",
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <Link href="/super_admin/department/create">
        <TableProvider dataSource={data?.departments} columns={columns} />
      </Link>
    </div>
  );
};

export default ManageDepartmentPage;
