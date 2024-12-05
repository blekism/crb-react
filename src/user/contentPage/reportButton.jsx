import React from "react";

export default function reportButton() {
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#reportmodal"
      >
        Report
      </button>

      <div
        class="modal fade"
        id="reportmodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Report this post
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <textarea
                class="modal-textbox"
                placeholder="Reason for reporting this post..."
              ></textarea>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-primary">
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
