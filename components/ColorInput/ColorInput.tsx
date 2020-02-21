import React, { useState, useRef } from "react";
import { ChromePicker } from "react-color";
import useOnClickOutside from "use-onclickoutside";
import { colorObjToString } from "../../utils";
import { Radio } from "antd";
import { Slider } from "antd";
import { Form } from "antd";

import s from "./ColorInput.less";

export interface Props {
  color: string;
  setColor: ({ color: string }) => void;
}

export const ColorInput: React.FC<Props> = ({ color, setColor }) => {
  const ref = useRef();
  const [showColorPicker, setShowColorPicker] = useState(true);
  useOnClickOutside(ref, () => setShowColorPicker(false));

  return (
    <div
      ref={ref}
      className={s["root"]}
      onClick={() => setShowColorPicker(true)}
    >
      <div
        className={s["color"]}
        style={{
          background: colorObjToString(color)
        }}
      />
      {showColorPicker && (
        <div className={s["color-picker-wrapper"]}>
          <Radio.Group
            className={s["radio-group"]}
            onChange={f => f}
            defaultValue="a"
          >
            <Radio.Button value="a">Solid</Radio.Button>
            <Radio.Button value="b">Linear</Radio.Button>
            <Radio.Button value="c">Radial</Radio.Button>
          </Radio.Group>
          <div className={s["fill-preview-wrapper"]}>
            <div className={s["preview-color-box"]}>
              <div className={s["preview-color-box-inner"]} />
            </div>
            <div className={s["fill-preview"]} />
          </div>
          <ChromePicker
            color={color}
            onChange={({ rgb }) => setColor({ color: rgb })}
          />
          <Form layout="vertical">
            <Form.Item label="Angle">
              <Slider
                className={s["slider"]}
                min={1}
                max={100}
                value={50}
                onChange={f => f}
              />
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};
ColorInput.displayName = "ColorInput";

export default ColorInput;
