import React from "react";
import classnames from "classnames";
import { Form, Button, Divider } from "antd";
import BorderFrame from "../../BorderFrame";
import layouts from "../../../layouts";

import s from "./Layouts.less";

export interface Props {
  selectedLayoutId: number;
  selectLayout: ({ id: number }) => void;
}

export const Layouts: React.FC<Props> = ({
  selectedLayoutId,
  selectLayout
}) => {
  return (
    <Form.Item label="Layouts" className={s["form-item-with-show-more"]}>
      <div className={s["layouts"]}>
        {layouts.map((layout, index) => (
          <BorderFrame
            key={index}
            isActive={layout.id === selectedLayoutId}
            className={classnames(s["layout-thumb"])}
            onClick={() => selectLayout({ id: layout.id })}
          >
            <img src={layout.src} alt="image.png" />
          </BorderFrame>
        ))}
      </div>
      <Divider>
        <Button type="link" icon="down" className={s["show-more"]}>
          Show More
        </Button>
      </Divider>
    </Form.Item>
  );
};
Layouts.displayName = "Layouts";

export default Layouts;
