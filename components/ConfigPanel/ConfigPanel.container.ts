import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./ConfigPanel";
import { AppState } from "../../types/store";

export type StateProps = Pick<
  Props,
  "selectedObjectCount" | "objectColorCount"
>;
export type DispatchProps = Pick<Props, never>;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  selectedObjectCount: state.selectedObjectIds.length,
  objectColorCount: state.configColors.objectColors.length
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {};

export default connect(mapStateToProps, mapDispatchToProps);
