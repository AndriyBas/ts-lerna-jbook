import { Dispatch } from "redux";
import axios from "axios";
import { ActionType } from "../action-types";
import {
  Direction,
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
  Action,
} from "../actions";
import { CellType, Cell } from "../cell";
import bundle from "../../bundler";
import { RootState } from "../reducers";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UpdateCell,
    payload: { id, content },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DeleteCell,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MoveCell,
    payload: { id, direction },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.InsertCellAfter,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BundleStart,
      payload: {
        cellId,
      },
    });
    const result = await bundle(input);
    dispatch({
      type: ActionType.BundleComplete,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FetchCells });
    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({ type: ActionType.FetchCellsComplete, payload: data });
    } catch (error: any) {
      dispatch({ type: ActionType.FetchCellsError, payload: error.message });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const state = getState();
    if (!state.cells) return;
    const cells = state.cells.order.map((id) => state.cells!.data[id]);
    try {
      await axios.post("/cells", { cells });
    } catch (error: any) {
      dispatch({ type: ActionType.SaveCellsError, payload: error.message });
    }
  };
};
