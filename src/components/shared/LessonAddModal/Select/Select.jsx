import React from "react";
import { Select as AntSelect } from "antd";

export default function Select() {
  return (
    <AntSelect
      allowClear={false}
      options={[
        {
          value: "jack",
          label: "Jack",
        },
        {
          value: "lucy",
          label: "Lucy",
        },
        {
          value: "Yiminghe",
          label: "yiminghe",
        },
        {
          value: "Yiminghe",
          label: "yiminghe",
        },
        {
          value: "Yiminghe",
          label: "yiminghe",
        },
        {
          value: "Yiminghe",
          label: "yiminghe",
        },
        {
          value: "Yiminghe",
          label: "yiminghe",
        },
        {
          value: "disabled",
          label: "Disabled",
          disabled: true,
        },
      ]}
    />
  );
}
