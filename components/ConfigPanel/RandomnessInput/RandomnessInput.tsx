import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Switch, Button } from "antd";
import NumberInput from "../NumberInput";
import { setConfigValue, refreshRandomSnapshot } from "../../../actions";
import { getConfigValue } from "../../../selectors";

import s from "./RandomnessInput.less";

export interface Props {}

export const RandomnessInput: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const withRandomness = useSelector(
    getConfigValue("withRandomness"),
    shallowEqual
  );
  return (
    <>
      <div className={s["top-row"]}>
        <Switch
          defaultChecked={withRandomness}
          className={s["switch"]}
          onChange={() =>
            dispatch(
              setConfigValue({
                configKey: "withRandomness",
                configValue: !withRandomness
              })
            )
          }
        />
        {withRandomness && (
          <Button
            icon="reload"
            className={s["refresh-button"]}
            onClick={() => dispatch(refreshRandomSnapshot())}
          >
            Refresh
          </Button>
        )}
      </div>
      {withRandomness && <NumberInput configKey="randomnessStrength" />}
    </>
  );
};
RandomnessInput.displayName = "RandomnessInput";

export default RandomnessInput;
