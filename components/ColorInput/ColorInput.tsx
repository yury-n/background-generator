import React, { useState, useRef } from "react";
import { ChromePicker } from "react-color";
import useOnClickOutside from "use-onclickoutside";
import { colorObjToString } from "../../utils";

import s from "./ColorInput.less";

export interface Props {
  color: string;
  setColor: ({ color: string }) => void;
}

export const ColorInput: React.FC<Props> = ({ color, setColor }) => {
  const ref = useRef();
  const [showColorPicker, setShowColorPicker] = useState(false);
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
          <ChromePicker
            color={color}
            onChange={({ rgb }) => setColor({ color: rgb })}
          />
        </div>
      )}
    </div>
  );
};
ColorInput.displayName = "ColorInput";

export default ColorInput;
