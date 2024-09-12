import {Grid,Button,Box} from "@material-ui/core";
import {  quiz } from "../DataTypes/quiz.types";

export function Answer({ typedata }: { typedata: quiz }){
    


    return(
        <Box textAlign="center">
            <h3>Answers</h3>
        {   
        typedata.questions.map((current,index)=>{

            return(
                <>
                <hr/>
                <Box style={{padding:"1rem,0",letterSpacing:"0.5px"}}>
            <div style={{padding:"0.8rem"}}><b>{index+1}.</b> {current.question}</div>
                 <Grid container  justify="center">
                   {current.options.map((item, index) => {
                    return (
              
                            <Grid item xs={10} sm={5} md={4} lg={3} style={{margin:"0.5rem 0.5rem"}}>
                              <Button
                                
                                style={{width:"100%",background:item.isRight?"lightgreen":"#f2f2f2",height:"100%",fontSize:"12px"}}
                                
                              >
                                {` ${item.text}`}
                              </Button>
                            </Grid>
              
                          );
                   })}
                 </Grid>
               </Box>
                </>
            )
        }) 
       
}</Box>
    )
}