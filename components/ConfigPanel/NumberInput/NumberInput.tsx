import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Input, Slider } from "antd";
import { getConfigValue } from "../../../selectors";
import { setConfigValue } from "../../../actions";

import s from "./NumberInput.less";

export interface Props {
  configKey: string;
}

export const NumberInput: React.FC<Props> = ({ configKey }) => {
  const dispatch = useDispatch();
  const configValue = useSelector(getConfigValue(configKey), shallowEqual);

  return (
    <div className={s["config-input-wrapper"]}>
      <Input
        min={1}
        max={20}
        defaultValue={configValue}
        className={s["config-input"]}
        onBlur={e =>
          dispatch(
            setConfigValue({
              configKey,
              configValue: +e.currentTarget.value
            })
          )
        }
      />
      <Slider
        min={1}
        max={100}
        value={configValue}
        onChange={value =>
          dispatch(
            setConfigValue({
              configKey,
              configValue: value
            })
          )
        }
      />
    </div>
  );
};
NumberInput.displayName = "NumberInput";

export default NumberInput;
