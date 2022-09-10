import React, { FormEvent, ReactNode } from "react";
import formStyles from "../scss/modules/form.module.scss";

interface OwnProps {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

type Props = OwnProps;

function Form(props: Props) {
  return (
    <form
      className={`${formStyles.form} grid ${formStyles["grid--form"]} ${props.className}`}
      onSubmit={props.onSubmit}
      method="post"
    >
      {props.children}
    </form>
  );
}

export default Form;
