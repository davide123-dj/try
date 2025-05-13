import React, { useState } from 'react';

function Try() {
  const [form, setForm] = useState({ name: '', age: '', classes: '' });
  const [student, setStudent] = useState([]);
  const [Ab,setAb] =useState("hello word");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const change=()=>{
    setAb("how are you")
  }
  const handleAdd = () => {
    if (form.name && form.age && form.classes) {
      setStudent([...student, form]);
      setForm({ name: '', age: '', classes: '' }); 
    }
  };

  const handleDelete = (index) => {
    setStudent(student.filter((_, i) => i !== index)); 
  };
  const handleUpdate = (index,updatedStudent) => {
    if (form.name && form.age && form.classes) {
      setStudent([...student, form]);
      setForm({ name: '', age: '', classes: '' }); 
    }
    student.map((s, i) => (i === index ? updatedStudent : s))
  };
  

  return (
    <div>
      <h1>Write name</h1>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} value={form.name} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} value={form.age} />
      <input type="text" name="classes" placeholder="Your class" onChange={handleChange} value={form.classes} />
      <button onClick={handleAdd}>Add</button>
      <p>{Ab}</p>
      <button onChange={change}>change</button>
      <h2>List of people:</h2>
      {student.map((person, index) => (
        <div key={index}>
          <p>You name:{person.name} - Age: {person.age} - Level: {person.classes}</p>
          <button onClick={() => handleDelete(index)}>Delete</button>
          <button onClick={() => handleUpdate(index, { name: "", age: "", classes: "" })}>Update</button>


        </div>
      ))}
    </div>
  );
}

export default Try;
