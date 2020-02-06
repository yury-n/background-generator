import React from "react";
import { Icon, Input, Dropdown, Menu } from "antd";
import s from "./Dimensions.less";

export interface Props {
  canvasWidth: number;
  canvasHeight: number;
  setCanvasDimensions: (dimensions: { width: number; height: number }) => void;
  setCanvasHeight: (value: number) => void;
}

const presetDimensions = [
  { width: 1024, height: 768 },
  { width: 800, height: 600 }
];

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
            {presetDimensions.map(({ width, height }, index) => (
              <Menu.Item
                key={index}
                onClick={() => setCanvasDimensions({ width, height })}
              >
                {width} × {height}
              </Menu.Item>
            ))}
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
