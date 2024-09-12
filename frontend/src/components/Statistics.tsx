import { useReduce } from "../reducer-context/Reducer-context";
import {Box} from "@material-ui/core"
export function Statistics() {
  let { correct, wrong} = useReduce();
  return (
    <><Box textAlign="center">
      <p style={{color:"blue"}}> Attempted- {correct + wrong}</p>
      <p style={{color:"green"}}> Correct ans- {correct}</p>
      <p style={{color:"red"}}> Wrong ans- {wrong}</p>
    </Box>
    </>

  );
}
