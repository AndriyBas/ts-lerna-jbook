export enum ActionType {
  // cells
  MoveCell = "move_cell",
  DeleteCell = "delete_cell",
  InsertCellAfter = "insert_cell_after",
  UpdateCell = "update_cell",
  // bundle
  BundleStart = "bundle_start",
  BundleComplete = "bundle_complete",
  // fetch cells
  FetchCells = "fetch_cells",
  FetchCellsComplete = "fetch_cells_complete",
  FetchCellsError = "fetch_cells_error",
  // save cells
  SaveCellsError = "save_cells_error",
}
