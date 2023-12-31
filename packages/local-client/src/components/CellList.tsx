import * as React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import "./CellList.css";
import { useActions } from "../hooks/useActions";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    if (!cells) return [];
    return cells.order.map((id) => cells.data[id]);
  });
  const { fetchCells } = useActions();

  React.useEffect(() => {
    fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React.useEffect(() => {
  //   saveCells();
  // }, [JSON.stringify(cells)]);

  return (
    <div className="cell-list">
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {cells.map((cell) => (
        <React.Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CellList;
