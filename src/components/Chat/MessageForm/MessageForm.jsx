import React, { useState, useRef } from 'react';

export function MessageForm() {
  const [message, setMessage] = useState("");
  const [textareaHeight, setTextareaHeight] = useState(50);

  const textareaRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(message);
    setMessage("");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        value={message}
        onFocus={()=>setTextareaHeight(200)}
        onBlur={()=>setTextareaHeight(50)}
        onChange={handleChange}
        placeholder="Enter you message here"
        rows={1}
        style={{resize: 'none', height: textareaHeight, width: '100%'}}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
