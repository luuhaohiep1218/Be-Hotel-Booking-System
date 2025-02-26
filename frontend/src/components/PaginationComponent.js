import React from "react";

import { Pagination } from "antd";

const PaginationComponent = (props) => {
  const { align, total, onChange, pageSize } = props;
  return (
    <Pagination
      defaultCurrent={1}
      total={total}
      align={align}
      onChange={onChange}
      pageSize={pageSize}
      showSizeChanger={false}
    />
  );
};

export default PaginationComponent;