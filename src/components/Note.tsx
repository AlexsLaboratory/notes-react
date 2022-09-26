import React, {
  forwardRef, Ref, useRef,
} from "react";
import noteStyles from "../scss/modules/note.module.scss";
import ButtonLink from "./ButtonLink";
import Button from "./Button";
import DeleteDialog from "./DeleteDialog";
import useFetch from "../hooks/useFetch";

interface OwnProps {
  title: string;
  body: string;
  timestamp: string;
  id: string | number;
  onDelete: (id: string | number) => void;
}

type Props = OwnProps;

const Note = forwardRef<any, Props>((props, ref: Ref<any>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const api = useFetch();
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
  const deleteNote = async () => {
    const { response } = await api(`/note/delete?id=${props.id}`, {
      method: "DELETE",
      headers,
    });
    if (response.status === 200) {
      dialogRef.current?.close();
      props.onDelete(props.id);
    }
  };
  return (
    <>
      <DeleteDialog
        onConfirm={deleteNote}
        ref={dialogRef}
      />
      <div className={`${noteStyles["grid--note"]}`} data-id={props.id} ref={ref}>
        <h3 className={`${noteStyles["grid--note__title"]}`}>{props.title}</h3>
        <p className={`${noteStyles["grid--note__body"]}`}>
          {props.body}
        </p>
        <div className={`${noteStyles["grid--note__timestamp"]}`}>
          <span className={`${noteStyles["grid--note__timestamp__label"]}`}>created: </span>
          <p className={`${noteStyles["grid--note__timestamp__time"]}`}>{props.timestamp}</p>
        </div>
        <hr className={`${noteStyles["grid--note__separator"]}`} />
        <ButtonLink
          href={`/notes/${props.id}/view`}
          label="View"
          styleType="view"
        />
        <ButtonLink
          href={`/notes/${props.id}/edit`}
          label="Edit"
          styleType="edit"
          className={`${noteStyles["grid--note__edit"]}`}
        />
        <Button
          styleType="delete"
          type="button"
          className={`${noteStyles["grid--note__delete"]} delete-note`}
          onClick={(event) => {
            dialogRef.current?.showModal();
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
});

export default Note;
