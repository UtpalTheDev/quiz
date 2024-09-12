import { Link } from "react-router-dom";
export function NotFound() {
  return (
    <div className="notfound" style={{display:"flex", justifyContent:"center",position:"fixed",top:"30%", left:"0",width:"100vw"}}>
      <div >
        <div>404</div>
        <div>Page Not Found</div>
        <Link to="/">Back to home page</Link>
      </div>
    </div>
  );
}