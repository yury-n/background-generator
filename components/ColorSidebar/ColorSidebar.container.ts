import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./ColorSidebar";
import { AppState } from "../../types/store";
import { setBackgroundColor, setItemColor } from "../../actions";

export type StateProps = Pick<Props, "configColors">;
export type DispatchProps = Pick<Props, "setBackgroundColor" | "setItemColor">;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  configColors: state.configColors
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setBackgroundColor,
  setItemColor
};

export default connect(mapStateToProps, mapDispatchToProps);
