import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

export default function Questions({ questions, product, setProduct }) {
  const handleQuestion = (i, field, value) => {
    const updatedQuestions = questions.map((q, index) =>
      index === i ? { ...q, [field]: value } : q
    );
    setProduct({ ...product, questions: updatedQuestions });
  };

  const handleRemove = (i) => {
    const updatedQuestions = questions.filter((q, index) => index !== i);
    setProduct({ ...product, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setProduct({
      ...product,
      questions: [
        ...questions,
        {
          question: "",
          answer: "",
        },
      ],
    });
  };

  return (
    <div>
      <div className="font-semibold text-lg">Questions</div>
      {questions.length === 0 && (
        <IconButton
          className="mt-2"
          onClick={addQuestion}
          color="primary"
          aria-label="add-question"
        >
          <AddIcon />
        </IconButton>
      )}
      {questions.map((q, i) => (
        <div className="mt-4" key={i}>
          <input
            type="text"
            name="question"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestion(i, "question", e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-gray-500"
          />
          <input
            type="text"
            name="answer"
            placeholder="Answer"
            value={q.answer}
            onChange={(e) => handleQuestion(i, "answer", e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mt-2 w-full focus:outline-none focus:border-gray-500"
          />
          <div className="mt-2">
            <IconButton
              onClick={() => handleRemove(i)}
              color="secondary"
              aria-label="remove-question"
            >
              <RemoveIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
}
