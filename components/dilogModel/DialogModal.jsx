import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Transition } from "@headlessui/react";

import Link from "next/link";
import { hideDialog } from "@/store/DialogSlice";

export default function DialogModal({ type }) {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state) => ({ ...state }));
  const test = dialog?.msgs
    ? dialog?.msgs.find((x) => x.type === "error")
    : null;

  const handleClose = () => {
    dispatch(hideDialog());
  };

  return (
    <div className="fixed z-50">
      <Transition
        show={dialog.show}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <div
            ref={ref}
            className="fixed inset-0 flex items-center justify-center"
          >
            <div className="bg-white p-4 max-w-md mx-auto rounded-lg shadow-lg">
              <div
                className={`text-center ${
                  test ? "bg-red-500" : "bg-green-500"
                } text-white py-2 px-4 rounded-t-lg`}
              >
                {dialog.header}
              </div>
              <div className="p-4">
                {dialog.msgs &&
                  dialog.msgs.map((msg, i) => (
                    <div className="flex items-center space-x-2 mb-2" key={i}>
                      <img
                        src={
                          msg.type === "error"
                            ? "https://www.freeiconspng.com/uploads/orange-error-icon-0.png"
                            : "https://www.pngmart.com/files/20/Success-Transparent-Background.png"
                        }
                        alt=""
                        className="w-6 h-6"
                      />
                      <span>{msg.msg}</span>
                    </div>
                  ))}
              </div>
              <div className="text-right p-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleClose}
                >
                  Close
                </button>
                {dialog.link?.link && (
                  <Link href={dialog.link.link}>
                    <a className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">
                      <span>{dialog.link.text}</span>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}
