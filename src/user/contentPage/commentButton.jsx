import React from "react";

export default function commentButton() {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#commentmodal"
      >
        Leave a Comment
      </button>

      <div
        className="modal fade"
        id="commentmodal"
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
                Leave a comment
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
                placeholder="Enter your message here"
              ></textarea>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
