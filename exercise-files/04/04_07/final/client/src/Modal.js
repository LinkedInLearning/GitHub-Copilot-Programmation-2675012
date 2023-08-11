function Modal({ title, content, created_at }) {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <small className="card-subtitle mb-2 text-muted">
                {created_at}
              </small>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{content}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-warning">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
