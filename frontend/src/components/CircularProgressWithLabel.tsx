import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export function CircularProgressWithLabel(props: CircularProgressProps & { value: number,total:number }) {
  return (
    <Box position="relative" display="inline-flex" >
      <CircularProgress  style={{width:"70px",height:"70px",color:"green"}}variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${
          Math.round((props.value)*props.total/100)
          
        } sec`}</Typography>
      </Box>
    </Box>
  );
}


