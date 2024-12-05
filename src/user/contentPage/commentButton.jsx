import React from "react";

export default function commentButton() {
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#commentmodal"
      >
        Leave a Comment
      </button>

      <div
        class="modal fade"
        id="commentmodal"
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
                Leave a comment
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
                placeholder="Enter your message here"
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
