import React from "react";
import { Icon, Input, Dropdown, Menu } from "antd";
import s from "./Dimensions.less";

export interface Props {
  canvasWidth: number;
  canvasHeight: number;
  setCanvasDimensions: (dimensions: { width: number; height: number }) => void;
  setCanvasHeight: (value: number) => void;
}

export const Dimensions: React.FC<Props> = ({
  canvasWidth,
  canvasHeight,
  setCanvasDimensions
}) => {
  return (
    <div className={s["dimensions-form-wrapper"]}>
      <Input
        className={s["dimensions-input"]}
        defaultValue={canvasWidth}
        onBlur={e =>
          setCanvasDimensions({ width: +e.target.value, height: canvasHeight })
        }
        onKeyUp={e => {
          if (e.key === "Enter") {
            setCanvasDimensions({
              width: +e.currentTarget.value,
              height: canvasHeight
            });
          }
        }}
      />
      <span className={s["dimensions-x"]}>×</span>
      <Input
        className={s["dimensions-input"]}
        defaultValue={canvasHeight}
        onBlur={e =>
          setCanvasDimensions({ width: canvasWidth, height: +e.target.value })
        }
        onKeyUp={e => {
          if (e.key === "Enter") {
            setCanvasDimensions({
              width: canvasWidth,
              height: +e.currentTarget.value
            });
          }
        }}
      />
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