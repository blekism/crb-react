import React from "react";

export default function reportButton({
  title,
  content,
  hint,
  name,
  target,
  handleChange,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${target}`}
      >
        {title}
      </button>

      <div
        className="modal fade"
        id={target}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                className="modal-textbox"
                name={name}
                value={content}
                onChange={handleChange}
                placeholder={hint}
              />
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                // data-bs-dismiss="modal"
              >
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
