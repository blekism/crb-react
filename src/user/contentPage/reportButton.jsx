import React from "react";

export default function reportButton() {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#reportmodal"
      >
        Report
      </button>

      <div
        className="modal fade"
        id="reportmodal"
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
                Report this post
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
                placeholder="Reason for reporting this post..."
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
