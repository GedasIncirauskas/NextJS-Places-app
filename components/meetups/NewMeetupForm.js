import { useState } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

const NewMeetupForm = ({ onAddMeetup }) => {
  const [formValue, setFormValue] = useState({
    title: "",
    image: "",
    address: "",
    description: "",
  });

  const onChangeHandler = (field, value) => {
    setFormValue((prev) => ({ ...prev, [field]: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onAddMeetup(formValue);
  };

  const isEmpty = !Object.keys(formValue)
    .map((key) => formValue[key] || formValue[key] !== "")
    .every((value) => !!value);

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input
            type="text"
            required
            id="title"
            onChange={(e) => onChangeHandler("title", e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            type="url"
            required
            id="image"
            onChange={(e) => onChangeHandler("image", e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            required
            id="address"
            onChange={(e) => onChangeHandler("address", e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            onChange={(e) => onChangeHandler("description", e.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button disabled={isEmpty}>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetupForm;
