import React from 'react';

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  labelId?: string;
}

function Modal({id, title, children, labelId = `${id}Label`}: ModalProps) {
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={labelId} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={labelId}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
