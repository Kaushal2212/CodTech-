import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import { db, doc, setDoc, onSnapshot } from "./FireBase";
import "./App.css";

const Editor = () => {
  const [content, setContent] = useState("");

  // Fetch existing document
  useEffect(() => {
    const docRef = doc(db, "documents", "doc1");
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setContent(snapshot.data().content);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update document in Firestore
  const handleChange = async (value) => {
    setContent(value);
    const docRef = doc(db, "documents", "doc1");
    await setDoc(docRef, { content: value }, { merge: true });
  };

  return (
    <div className="editor-container">
      <ReactQuill 
        className="custom-quill-editor"
        value={content} 
        onChange={handleChange} 
        placeholder="Start typing..." 
      />
    </div>
  );
};

export default Editor;
