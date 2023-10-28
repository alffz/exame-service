import crypto from "crypto";
const questions = [
  {
    id: 1,
    question: "A huruf ke ",
    choice: {
      a: "pertama",
      b: "kedua",
      c: "ketiga",
      d: "keempat",
    },
    answer: "a",
  },
  {
    id: 2,
    question: "wanit selalu",
    choice: {
      a: "salah",
      b: "benar",
      c: "netral",
      d: "salah semua",
    },
    answer: "b",
  },
  {
    id: 3,
    question: "Psms dari",
    choice: {
      a: "bandung",
      b: "jakarta",
      c: "medan",
      d: "bogor",
    },
    answer: "c",
  },
  {
    id: 4,
    question: "pulpen bebentuk",
    choice: {
      a: "persegi",
      b: "petak",
      c: "bulat",
      d: "bulat dan memanjang",
    },
    answer: "d",
  },
];

const ids = { 1: "a", 2: "b", 3: "c", 4: "d" };
// loop idkeys ,if id[ids] === q.answare , return +1
const idkeys = Object.keys(ids);
let count = 0;
for (let q of questions) {
  for (let id of idkeys) {
    if (q.id === parseInt(id)) {
      count += 1;
    }
  }
}
let correctAnswersCount = 0;

// Iterate through the questions array and compare the answers with answare.
questions.forEach((question) => {
  const questionId = question.id;
  const correctAnswer = question.answer;

  if (ids[questionId] === correctAnswer) {
    correctAnswersCount++;
  }
});
console.log(correctAnswersCount);
// extract ids key 1,2,3,4
// read questions loop
// if q.id = 1
// is answare equal to ids[extracted ids] /
//    if true
//       choice[ids[extracted ids]] = {text:}
//       create prop choice[ids[1]] add text : choice[ids[1]], answer : true
//    if false
//       delete prop where choice[ids[1]]
//       create prop choice[ids[1]] add text : choice[ids[1]], answer : true
//

// const idsKey = Object.keys(ids); // 1,2,3,4
// const question = questions.map((q) => {
//   let temp = {};

//   for (let id of idsKey) {
//     if (parseInt(id) === q.id) {
//       if (q.answer === ids[id]) {
//         temp[ids[id]] = { text: q.choice[ids[id]], answer: true };
//       } else {
//         temp[ids[id]] = { text: q.choice[ids[id]], answer: false };
//         temp[q.answer] = { text: q.choice[q.answer], answer: true };
//       }
//     }
//   }

//   return {
//     question: q.question,
//     choice: temp,
//   };
// });
// console.log(question[1]);
