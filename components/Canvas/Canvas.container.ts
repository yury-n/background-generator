import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./Canvas";
import { AppState } from "../../types/store";

export type StateProps = Pick<Props, "width" | "height" | "configColors">;
export type DispatchProps = Pick<Props, never>;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  width: state.canvasWidth,
  height: state.canvasHeight,
  configColors: state.configColors
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {};

export default connect(mapStateToProps, mapDispatchToProps);
