import PropTypes from "prop-types";
// form
import { FormProvider as Form } from "react-hook-form";

// ------------------------------

FormProvider.prototype = {
  children: PropTypes.node,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default function FormProvider({ children, onSubmit, methods }) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
