import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./Objects";
import { AppState } from "../../../types/store";
import { selectObject, deselectObject } from "../../../actions";

export type StateProps = Pick<Props, "selectedObjectIds">;
export type DispatchProps = Pick<Props, "selectObject" | "deselectObject">;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  selectedObjectIds: state.selectedObjectIds
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  selectObject,
  deselectObject
};

export default connect(mapStateToProps, mapDispatchToProps);
