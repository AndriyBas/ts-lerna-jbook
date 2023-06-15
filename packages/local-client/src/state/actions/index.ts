import { ActionType } from "../action-types";
import { Cell, CellType } from "../cell";

export interface MoveCellAction {
  type: ActionType.MoveCell;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DeleteCell;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.InsertCellAfter;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export interface UpdateCellAction {
  type: ActionType.UpdateCell;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BundleStart;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BundleComplete;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export interface FetchCellsAction {
  type: ActionType.FetchCells;
}

export interface FetchCellsCompleteAction {
  type: ActionType.FetchCellsComplete;
  payload: Cell[];
}

export interface FetchCellsErrorAction {
  type: ActionType.FetchCellsError;
  payload: string;
}

export interface SaveCellsErrorAction {
  type: ActionType.SaveCellsError;
  payload: string;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction;

export type Direction = "up" | "down";
