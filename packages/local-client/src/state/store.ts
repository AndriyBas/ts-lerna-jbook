import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistMiddleware } from "./middlewares/persists-middleware";
// import { ActionType } from "./action-types";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, persistMiddleware)
);

// store.dispatch({
//   type: ActionType.InsertCellAfter,
//   payload: {
//     id: null,
//     type: "text",
//   },
// });
// store.dispatch({
//   type: ActionType.InsertCellAfter,
//   payload: {
//     id: null,
//     type: "code",
//   },
// });
// store.dispatch({
//   type: ActionType.InsertCellAfter,
//   payload: {
//     id: null,
//     type: "text",
//   },
// });
// console.log(store.getState());
// const id0 = store.getState().cells?.order[0]!;
// const id1 = store.getState().cells?.order[1]!;
// console.log(id0);

// store.dispatch({
//   type: ActionType.UpdateCell,
//   payload: {
//     id: id1,
//     content:
//       "const App = () => { return <div>Hello there!</div>;}\nconsole.log(App);\nshow(<App />);",
//   },
// });
// store.dispatch({
//   type: ActionType.UpdateCell,
//   payload: {
//     id: id0,
//     content: "# Header\n**Hello world!!!**",
//   },
// });
