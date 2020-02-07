import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./ColorSidebar";
import { AppState } from "../../types/store";
import { setBackgroundColor } from "../../actions";

export type StateProps = Pick<Props, "backgroundColor">;
export type DispatchProps = Pick<Props, "setBackgroundColor">;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  backgroundColor: state.configColors.backgroundColor
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setBackgroundColor
};

export default connect(mapStateToProps, mapDispatchToProps);
