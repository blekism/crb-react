import React from "react";
import "./FilterByButton.css";

export default function FilterByButton() {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#filterByButton"
      >
        Filter By:
      </button>

      <div
        className="modal fade"
        id="filterByButton"
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
                Filter By:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* First Dropdown */}
              <div className="mb-3">
                <label htmlFor="categoryDropdown" className="form-label">
                  Genre:
                </label>
                <select className="form-select" id="categoryDropdown">
                  <option value="" disabled selected>
                    Choose a Genre
                  </option>
                  <option value="spam">Drama</option>
                  <option value="harassment">Comedy</option>
                  <option value="misleading">Horror</option>
                </select>
              </div>

              {/* Second Dropdown */}
              <div className="mb-3">
                <label htmlFor="priorityDropdown" className="form-label">
                  Sort By:
                </label>
                <select className="form-select" id="priorityDropdown">
                  <option value="" disabled selected>
                    By Popularity:
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Third Dropdown */}
              <div className="mb-3">
                <label htmlFor="statusDropdown" className="form-label">
                  idk
                </label>
                <select className="form-select" id="statusDropdown">
                  <option value="" disabled selected>
                    By Popularity:
                  </option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
