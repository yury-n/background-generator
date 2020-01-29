import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./Dimensions";
import { AppState } from "../../types/store";

export type StateProps = Pick<Props, "canvasWidth" | "canvasHeight">;
export type DispatchProps = Pick<Props, never>;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  canvasWidth: state.canvasWidth,
  canvasHeight: state.canvasHeight
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {};

export default connect(mapStateToProps, mapDispatchToProps);
