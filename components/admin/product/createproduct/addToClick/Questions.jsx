import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

export default function Questions({ questions, product, setProduct }) {
  const handleQuestion = (i, e) => {
    const values = [...questions];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, questions: values });
  };

  const handleRemove = (i) => {
    if (questions.length > 0) {
      const values = [...questions];
      values.splice(i, 1);
      setProduct({ ...product, questions: values });
    }
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
          <TextField
            variant="outlined"
            name="question"
            label="Question"
            fullWidth
            value={q.question}
            onChange={(e) => handleQuestion(i, e)}
          />
          <TextField
            variant="outlined"
            name="answer"
            label="Answer"
            fullWidth
            value={q.answer}
            onChange={(e) => handleQuestion(i, e)}
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
