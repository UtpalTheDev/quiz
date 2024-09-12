export type quiz = {
  quizName: string;
  image:string,
  questions: question[];
};
export type question = {
  question: string;
  points: number;
  options: option[];
};
export type option = {
  text: string;
  isRight: boolean;
};
export type Quizdata = {
  [key: string]: quiz;
};


export type UserState = {
  _id: string;
  name: string;
  email: string;
};
export type statustype = "starting" | "finished" | "Running";

export type quizstate = {
  user: UserState;
  score: number;
  status: statustype;
  currentQsnNo: number;
  currentquiz: string;
  correct: number;
  wrong: number;
  data: Quizdata;
  categorydata: string[];
};

export type actiontype =
  | {type:  "LOAD"; payload:{data:Quizdata} }
  | { type: "RESET" }
  | { type: "INCREMENT_SCORE"; payload: { score: number } }
  | { type: "DECREMENT_SCORE"; payload: { score: number } }
  | { type: "SKIP" }
  | { type: "USER"; payload: UserState }
  | { type: "CURRENTQUIZ"; payload: string }
  | {type: "LOGOUT"}

  export type Contextstate = {
    user: UserState;
    score: number;
    status: statustype;
    currentQsnNo: number;
    currentquiz: string;
    correct: number;
    wrong: number;
    data: Quizdata;
    categorydata: string[];
    dispatch: React.Dispatch<actiontype>;
  };

  export type Servererror = {
    errormessage: string;
  };

  export type Logincontextstate = {
    isUserLogIn: boolean,
    setLogin: React.Dispatch<React.SetStateAction<boolean>>,
    logout:Function,
    token:String|null,
    LoginWithCredentials:Function,
    loading:boolean,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>
  };
  export type LocationState = {
    from: string;
  };