import React from "react";
import { Icon, Input, Dropdown, Menu } from "antd";
import s from "./Dimensions.less";

export interface Props {
  canvasWidth: number;
  canvasHeight: number;
}

export const Dimensions: React.FC<Props> = ({ canvasWidth, canvasHeight }) => {
  return (
    <div className={s["dimensions-form-wrapper"]}>
      <Input className={s["dimensions-input"]} defaultValue={canvasWidth} />
      <span className={s["dimensions-x"]}>×</span>
      <Input className={s["dimensions-input"]} defaultValue={canvasHeight} />
      <Dropdown.Button
        className={s["dimensions-dropdown"]}
        size="large"
        icon={<Icon type="down" />}
        overlay={
          <Menu>
            <Menu.Item key="1">1024 × 768</Menu.Item>
            <Menu.Item key="2">800 × 600</Menu.Item>
          </Menu>
        }
      >
        Dimensions
      </Dropdown.Button>
    </div>
  );
};
Dimensions.displayName = "Dimensions";

export default Dimensions;
