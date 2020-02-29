import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./Items";
import { AppState } from "../../../types/store";
import { selectItem, deselectItem } from "../../../actions";

export type StateProps = Pick<Props, "selectedItems">;
export type DispatchProps = Pick<Props, "selectItem" | "deselectItem">;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  selectedItems: state.selectedItems
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  selectItem,
  deselectItem
};

export default connect(mapStateToProps, mapDispatchToProps);
