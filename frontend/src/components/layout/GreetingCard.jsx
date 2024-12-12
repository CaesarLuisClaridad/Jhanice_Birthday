import React, { useState, useRef } from "react";
import { UseGreetingsContext } from "../../hooks/greetingsHooks";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const GreetingCard = () => {
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { dispatch } = UseGreetingsContext();

  // Function to handle the form submission for creating a new greeting
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a FormData object to handle the form input values
    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);
    formData.append("file", image); 

    try {
      const response = await fetch("/api/v1/PostGreetings", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "CREATE_ITEM", payload: data });
        setImage("");
        setMessage("");
        setName("");
        toast.success("Greetings created successfully!");
        console.log("ITEM added", data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the image file selection and convert it to a base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Base64 Image: ", reader.result); // Debug here
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to remove the selected image from the input and state
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="card">
        <div className="banner">
          <span className="banner-text">GREET NOW</span>
          <span className="banner-text">JOIN US</span>
        </div>
        <span className="card__title">Cheers!</span>
        <p className="card__subtitle">Share your wish...</p>
        <form className="card__form">
          <input
            placeholder="Your name..."
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <textarea
            rows="2"
            placeholder="Write your message here..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          {!image ? (
            <div className="image-upload">
              <label htmlFor="imageInput" className="image-upload-label">
                Upload an Image
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          ) : (
            <div className="image-preview position-relative">
              <RxCross2 className="cross-icon" onClick={removeImage} />
              <img src={image} alt="Preview" />
            </div>
          )}

          <button className="sign-up" onClick={handleSubmit}>
            {loading ? (
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "SUBMIT"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default GreetingCard;
