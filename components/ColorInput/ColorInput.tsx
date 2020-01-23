import React from "react";

import s from "./ColorInput.less";

export interface Props {
  color: string;
}

export const ColorInput: React.FC<Props> = ({ color }) => {
  return (
    <div className={s["root"]}>
      <div className={s["color-wrapper"]}>
        <div
          className={s["color"]}
          style={{
            background: color
          }}
        />
      </div>
    </div>
  );
};
ColorInput.displayName = "ColorInput";

export default ColorInput;
