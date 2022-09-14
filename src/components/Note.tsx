import React, {
  forwardRef, LegacyRef, RefObject,
} from "react";
import noteStyles from "../scss/modules/note.module.scss";
import ButtonLink from "./ButtonLink";
import Button from "./Button";

interface OwnProps {
  title: string;
  body: string;
  timestamp: string;
  id: string | number;
}

type Props = OwnProps;

const Note = forwardRef<RefObject<any>, Props>((props, ref: LegacyRef<any>) => (
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
      className={`${noteStyles["grid--note__delete"]}`}
      onClick={(e) => { console.log(e.currentTarget.parentElement); }}
    >
      Delete
    </Button>
  </div>
));

export default Note;
