
import { Link } from "react-router-dom";
import { useReduce } from "../reducer-context/Reducer-context";
import {CircularProgress} from "@material-ui/core";
import { useLogin } from "../reducer-context/Login-context";

import {CardActionArea,Card,Grid,CardActions,Button,Typography,CardContent,CardMedia} from "@material-ui/core"
export function Home() {
  
  let { dispatch,data } = useReduce();
  let {loading}=useLogin()

  return (
    <>
     <Grid container justify="center"  spacing={3}>
      {Object.keys(data).map((item) => {
        return (
          <>
          
        <Grid item lg={3} md={3} sm={4} xs={5} style={{}}>
          <Card style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%"}}>
            <CardActionArea style={{}}>
              <CardMedia
              style={{height:"140px"}}
              image={data[item].image}/>
              <CardContent style={{}}>
                <Typography gutterBottom variant="h5" component="h2">
                 {item}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                </Typography>
              </CardContent>
            </CardActionArea>
        <CardActions>
        <Button size="small" color="primary">
        <Link
              key={item}
              to={`quiz/${item}`}
              style={{textDecoration:"none",color:"inherit"}}
              onClick={() => dispatch({ type: "CURRENTQUIZ", payload: item })}
            >
              Practice
        </Link>
        </Button>
        <Button size="small" color="primary">
        <Link
              key={item}
              to={`/learningcurve/${item}`}
              style={{textDecoration:"none",color:"inherit"}}
              onClick={() => dispatch({ type: "CURRENTQUIZ", payload: item })}
            >
              Learning Curve
        </Link>
        </Button>
              </CardActions>

          </Card>
          </Grid>
          
          </>
          
        );
      })}
      </Grid>
      <div style={{position:"fixed",top:"50%",left:"50%"}}>{loading && <CircularProgress/>}</div>

    </>
  );
}
