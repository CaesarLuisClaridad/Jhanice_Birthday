import React from "react";
import main_img from "../../assets/main_img.jpg";
import { ImCancelCircle } from "react-icons/im";

const MoreInfoModal = () => {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog w-75 w-lg-100 mx-auto my-5">
          <div className="modal-conten w-100">
            <div className="modal-header position-relative ">
              <img
                src={main_img}
                alt="Modal Header"
                className="img-fluid modal-header-image border-0"
              />
              <ImCancelCircle
                type="button"
                className="cancel opacity-50 "
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body custom-modal-body">
              <h4 className="mb-5">Happy Birthday, Jhanice</h4>

              <h6 className="mb-4">Hello, Panget,</h6>
              <p className="message1">
                Happy 21st Birthday! 🎉 Sana ay matupad mo lahat ng pangarap mo,
                mag-exercise ka, at syempre, kumain lagi sa tamang oras. 🤨
                Proud ako lagi sa'yo at andito lang ako, handang makinig para
                sa'yong walang katapusang rants. HAHA. Love you always, bb. 💖
              </p>

              <p className="mb-3">
                <b>P.S.</b> Mas nahirapan pa ako sa message kesa sa code. 😂
              </p>

              <p>
               - Buboy 🙊
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreInfoModal;
