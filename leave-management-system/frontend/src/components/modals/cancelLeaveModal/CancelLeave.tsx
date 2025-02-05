import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { closeCancelLeaveModal } from "../../../features/modalSlice";

interface ModalHandle {
  openModal: boolean;
  submitModal: () => void;
}

export default function CancelLeave({ openModal, submitModal }: ModalHandle) {
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClick={() => dispatch(closeCancelLeaveModal())}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to cancel this leave request ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={submitModal}>
                {"Yes, I'm sure"}
              </Button>
              <Button
                color="gray"
                onClick={() => dispatch(closeCancelLeaveModal())}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
