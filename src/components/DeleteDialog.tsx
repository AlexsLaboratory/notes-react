import React, {
  forwardRef,
} from "react";
import modalStyles from "../scss/modules/modal.module.scss";
import Button from "./Button";

interface OwnProps {
  onConfirm: () => void;
}

type Props = OwnProps;

const DeleteDialog = forwardRef<any, Props>((props, ref: any) => (
  <dialog
    className={`grid ${modalStyles["grid--modal"]} ${modalStyles.modal}`}
    ref={ref}
  >
    <h2 className={`${modalStyles.modal__title}`}>
      Are you sure you want to delete this note? This action
      cannot be
      undone.
    </h2>
    <Button
      type="button"
      styleType="delete"
      onClick={() => {
        props.onConfirm();
      }}
    >
      Yes, Delete
    </Button>
  </dialog>
));

export default DeleteDialog;
