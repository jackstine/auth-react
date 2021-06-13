import { Formik, Form, Field } from "formik";
import PhoneNumber, {
  parse_Number,
  format_Phone,
} from "../../common-components/formik/PhoneNumber";
import * as Yup from "yup";
import UserAPI from "../../apis/UserAPI";
import { UserConsumer } from "../../store/contexts/UserContext";

const UpdateUserForm = function (formikProps) {
  return (
    <div>
      <Formik
        initialValues={{
          phoneNumber: format_Phone(formikProps.user.phone),
          firstName: formikProps.user.first_name,
          lastName: formikProps.user.last_name,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("First Name is Required").min(2).max(100),
          lastName: Yup.string().required("Last Name is Required").min(2).max(100),
          phoneNumber: Yup.string().required("Phone Number is Required"),
        })}
        onSubmit={(values, actions) => {
          let apiUser = {
            first_name: values.firstName,
            last_name: values.lastName,
            phone: parse_Number(values.phoneNumber),
            email: formikProps.user.email,
          };
          new UserAPI().updateUser(apiUser).then((resp) => {
            if (resp.success) {
              formikProps.onUpdateUser(resp.user);
              actions.setSubmitting(false);
            }
          });
        }}
      >
        {(props) => (
          <Form>
            <div>
              <label>First Name</label>
              <Field name="firstName" />
            </div>
            <div>
              <label>Last Name</label>
              <Field name="lastName" />
            </div>
            <PhoneNumber
              label="Phone Number:"
              handleChange={props.handleChange}
              name="phoneNumber"
            />
            <button disabled={props.isSubmitting} type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ConsumedUserFields = function () {
  return (
    <UserConsumer>
      {(user) => {
        return (
          <UpdateUserForm
            user={user.state}
            onUpdateUser={(u) => user.dispatch({ state: u, type: "update" })}
          />
        );
      }}
    </UserConsumer>
  );
};

export default ConsumedUserFields;
