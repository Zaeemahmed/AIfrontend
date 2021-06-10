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
      <div className="flex">
        <form
          onSubmit={onSubmit}
          className="container mt-5 pt-5 pb-5"
          enctype="multipart/form-data"
        >
          <div className="row">
            <div class="col-sm-12 col-md-12">
              <label class="form-label" for="customFile">
                Upload The file that you want colorized
              </label>
              <input
                type="file"
                id="image"
                name="file"
                accept="image/*"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group justify-content-center btn-large mt-2">
            <button type="submit" className="btn btn-lg btn-primary">
              Colorize
            </button>
          </div>
        </form>
      </div>

      <div className="row">
        <div class="col-sm-12 col-md-5 text-center">
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
          {colorized && (
            <div class="img-container">
              <img src={colorized} class="img-thumbnail img" alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
