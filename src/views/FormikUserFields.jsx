import {Formik, Form, Field} from 'formik'
import PhoneNumber, {parse_Number} from '../common-components/formik/PhoneNumber'
import PasswordMustMatchField from '../common-components/formik/PasswordsMustMatch'
import Email from '../common-components/formik/Email'
import * as Yup from 'yup'
import UserAPI from '../apis/UserAPI'

const FormikUserFields = function () {
  return (
    <div>
      <Formik
        initialValues={{
          phoneNumber: '(125) - 532 - 3952',
          password: 'password',
          retypePassword: 'password',
          email: 'jake@gmail.com',
          firstName: 'jake',
          lastName: 'cukjati'
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('First Name is Required').min(2).max(100),
          lastName: Yup.string().required('Last Name is Required').min(2).max(100),
          phoneNumber: Yup.string().required('Phone Number is Required'),
          password: Yup.string().required('Password is Required').min(8).max(16),
          retypePassword: Yup.string().required().min(8).max(16)
        })}
        onSubmit={(values) => {
          let apiUser = {
            first_name: values.firstName,
            last_name: values.lastName,
            password: values.password,
            phone: parse_Number(values.phoneNumber),
            email: values.email,
            user_id: values.email
          }
          new UserAPI().createUser(apiUser).then(resp => {
            const user = resp.user
            const verification = resp.verification
            // route the user to the User Page
            // TODO need to create a store for the user
            // TODO need to create a strore for the verification
            // use React Redux for this
          })
        }}
      >
        {props => (
          // TODO ensure that the submit button is disabled when submitting
          <Form>
            <div>
              <label>First Name</label>
              <Field name="firstName"/>
            </div>
            <div>
              <label>Last Name</label>
              <Field name="lastName"/>
            </div>
            <div>
              <Email name="email" />
            </div>
            <PhoneNumber 
              label="Phone Number:"
              handleChange={props.handleChange}
              name="phoneNumber"
            />
            <PasswordMustMatchField {...props} />
            <button disabled={props.isSubmitting} type="submit">Submit</button>
            <div>
              <div>
                {JSON.stringify(props.values, null, 2)}
              </div>
              <div>
                {JSON.stringify(props.errors, null, 2)}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormikUserFields
