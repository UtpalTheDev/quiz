import { question, option } from "../DataTypes/quiz.types";

function update(score: number, qsn: question, opt: option) {
  return opt.isRight ? score + qsn.points : score;
}
