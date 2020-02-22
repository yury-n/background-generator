import React, { useState, useRef } from "react";
import classnames from "classnames";
import { ChromePicker } from "react-color";
import { Popover } from "antd";
import { colorObjToString } from "../../utils";
import { Radio } from "antd";
import { Slider } from "antd";
import { Form } from "antd";
import { FillType } from "../../types";

import s from "./ColorInput.less";

export interface Props {
  color: { type: FillType; value: string };
  setColor: ({ color: string }) => void;
}

export const ColorInput: React.FC<Props> = ({ color, setColor }) => {
  const ref = useRef();
  const [fillType, setFillType] = useState(FillType.Solid);
  const [activeColor, setActiveColor] = useState(0);

  return (
    <div ref={ref} className={s["root"]}>
      <Popover
        trigger="click"
        placement="left"
        content={
          <div className={s["popover-content"]}>
            <Radio.Group
              className={s["radio-group"]}
              onChange={f => f}
              value={fillType}
            >
              <Radio.Button
                value={FillType.Solid}
                onChange={() => setFillType(FillType.Solid)}
              >
                Solid
              </Radio.Button>
              <Radio.Button
                value={FillType.Linear}
                onChange={() => setFillType(FillType.Linear)}
              >
                Linear
              </Radio.Button>
              <Radio.Button
                value={FillType.Radial}
                onChange={() => setFillType(FillType.Radial)}
              >
                Radial
              </Radio.Button>
            </Radio.Group>
            {fillType !== FillType.Solid && (
              <div className={s["fill-preview-wrapper"]}>
                <div
                  className={classnames(
                    s["preview-color-box"],
                    activeColor === 0 && s["preview-color-box-active"]
                  )}
                  onClick={() => setActiveColor(0)}
                  style={{ left: 0 }}
                >
                  <div className={s["preview-color-box-inner"]} />
                </div>
                <div
                  className={classnames(
                    s["preview-color-box"],
                    activeColor === 1 && s["preview-color-box-active"]
                  )}
                  onClick={() => setActiveColor(1)}
                  style={{ right: 0 }}
                >
                  <div className={s["preview-color-box-inner"]} />
                </div>
                <div className={s["fill-preview"]} />
              </div>
            )}
            <ChromePicker
              color={color.value}
              onChange={({ rgb }) => setColor({ color: rgb })}
            />
            <Form layout="vertical">
              {fillType === FillType.Linear && (
                <Form.Item label="Angle" className={s["form-item"]}>
                  <Slider
                    className={s["slider"]}
                    min={1}
                    max={100}
                    value={50}
                    onChange={f => f}
                  />
                </Form.Item>
              )}
              {fillType === FillType.Radial && (
                <>
                  <Form.Item label="X-Shift" className={s["form-item"]}>
                    <Slider
                      className={s["slider"]}
                      min={1}
                      max={100}
                      value={50}
                      onChange={f => f}
                    />
                  </Form.Item>
                  <Form.Item label="Y-Shift" className={s["form-item"]}>
                    <Slider
                      className={s["slider"]}
                      min={1}
                      max={100}
                      value={50}
                      onChange={f => f}
                    />
                  </Form.Item>
                </>
              )}
            </Form>
          </div>
        }
      >
        <div
          className={s["color"]}
          style={{
            background: colorObjToString(color)
          }}
        />
      </Popover>
    </div>
  );
};
ColorInput.displayName = "ColorInput";

export default ColorInput;
