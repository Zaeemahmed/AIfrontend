import React, { useState } from "react";

function App() {
  const [img, setImg] = useState(null);
  const [colorized, setColorized] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const Upload = async () => {
      setColorized(null);
      setLoading(true);
      await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      }).then((resp) => {
        resp.blob().then((data) => {
          setLoading(false);
          setColorized(URL.createObjectURL(data));
        });
      });
    };
    Upload();
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1 className="">Image Colorizer</h1>
      </div>
      <form
        onSubmit={onSubmit}
        className="container mt-5 pt-5 pb-5"
        enctype="multipart/form-data"
      >
        <div className="form-inline justify-content-center mt-5">
          <label htmlFor="image" className="ml-sm-4 font-weight-bold mr-md-4">
            Image
          </label>
          <div className="input-group">
            <input
              type="file"
              id="image"
              name="file"
              accept="image/*"
              className="file-custom"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-group justify-content-center btn-large">
          <button type="submit" className="btn btn-lg btn-primary">
            Upload
          </button>
        </div>
      </form>

      <div className="row">
        <div class="col-sm-12 col-md-5">
          <div class="img-container">
            {img && <img src={img} class="img-thumbnail img" alt="" />}
          </div>
        </div>
        <div class="col-sm-12 col-md-5 offset-md-2">
          {loading && (
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only" />
            </div>
          )}

          <div class="img-container">
            {colorized && (
              <img src={colorized} class="img-thumbnail img" alt="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
