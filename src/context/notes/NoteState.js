import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // GET all Note
    const getNotes = async () => {
      // TODO: API call
      const respose = await fetch(
          `${host}/api/notes/fetchallnotes`,
          {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "auth-token":
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmYzA0ZTExYjE0NzhmY2Q5Mjg3YWIyIn0sImlhdCI6MTY0Mzk0NjEyMX0.ju3iaA477NYnZKHCXtPTNBNCMDGXVhZnTfITzK4afhc",
              },
          }
      );
      const json = await respose.json()
      // console.log(json);
      setNotes(json);
  };

    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO: API call
        const respose = await fetch(
            `${host}/api/notes/addnote`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmYzA0ZTExYjE0NzhmY2Q5Mjg3YWIyIn0sImlhdCI6MTY0Mzk0NjEyMX0.ju3iaA477NYnZKHCXtPTNBNCMDGXVhZnTfITzK4afhc",
                },
                body: JSON.stringify({ title, description, tag }),
            }
        );
        const note = await respose.json();
        
        setNotes(notes.concat(note));
    };

    // Delete a Note
    const deleteNote = async (id) => {
        // TODO: API call
        const respose = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmYzA0ZTExYjE0NzhmY2Q5Mjg3YWIyIn0sImlhdCI6MTY0Mzk0NjEyMX0.ju3iaA477NYnZKHCXtPTNBNCMDGXVhZnTfITzK4afhc",
            },
        });
        const json = respose.json();
        // console.log(json)
        // console.log("Deleteing the note " + id);
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // TODO: API call
        const respose = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmYzA0ZTExYjE0NzhmY2Q5Mjg3YWIyIn0sImlhdCI6MTY0Mzk0NjEyMX0.ju3iaA477NYnZKHCXtPTNBNCMDGXVhZnTfITzK4afhc",
            },
            body: JSON.stringify({title,description,tag}),
        });
        const json = await respose.json();
        // console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
