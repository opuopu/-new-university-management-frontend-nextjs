import { Table } from "antd";
import React from "react";

const TableProvider = ({ dataSource, columns }: any) => {
  console.log("dataSource", dataSource);
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default TableProvider;
