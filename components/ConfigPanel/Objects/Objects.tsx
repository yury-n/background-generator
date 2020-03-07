import React from "react";
import classnames from "classnames";
import objects from "../../../objects";
import ImageUpload from "./ImageUpload";
import { Form, Button, Divider } from "antd";
import BorderFrame from "../../BorderFrame";

import s from "./Objects.less";

export interface Props {
  selectedObjectIds: number[];
  selectObject: ({ id: number }) => void;
  selectAsOnlyObject: ({ id: number }) => void;
  deselectObject: ({ id: number }) => void;
}

export const Objects: React.FC<Props> = ({
  selectedObjectIds,
  selectObject,
  selectAsOnlyObject,
  deselectObject
}) => {
  return (
    <Form.Item label="Objects" className={s["form-item-with-show-more"]}>
      <div className={s["layout-items"]}>
        <ImageUpload />
        {objects.map((object, index) => {
          const isSelected = selectedObjectIds.includes(object.id);
          return (
            <BorderFrame
              isActive={isSelected}
              key={index}
              className={classnames(s["item-thumb"])}
              onClick={() =>
                isSelected
                  ? deselectObject({ id: object.id })
                  : selectAsOnlyObject({ id: object.id })
              }
            >
              {!isSelected && (
                <Button
                  className={s["plus-button"]}
                  shape="circle"
                  icon="plus"
                  size="small"
                  onClick={e => {
                    selectObject({ id: object.id });
                    e.stopPropagation();
                  }}
                />
              )}
              <img src={object.src} alt="image.png" />
            </BorderFrame>
          );
        })}
      </div>
      <Divider>
        <Button type="link" icon="down" className={s["show-more"]}>
          Show More
        </Button>
      </Divider>
    </Form.Item>
  );
};
Objects.displayName = "Objects";

export default Objects;
