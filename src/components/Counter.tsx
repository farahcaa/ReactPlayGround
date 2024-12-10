import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../state/slices/counterSlice";
const Counter = () => {
  const count = useSelector(
    (state: RootState) => state.rootReducer.counter.value
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="justify-center items-center flex flex-col h-screen border">
      <h1 className="justify-center items-center flex">{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>
        incrementByAmount
      </button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;
