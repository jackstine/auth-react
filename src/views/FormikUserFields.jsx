import {Formik, Form, Field} from 'formik'
import PhoneNumber, {parse_Number} from '../common-components/formik/PhoneNumber'
import PasswordMustMatchField from '../common-components/formik/PasswordsMustMatch'
import Email from '../common-components/formik/Email'
import * as Yup from 'yup'
import UserAPI from '../apis/UserAPI'
import Cookies from '../store/cookies'
import {useHistory} from 'react-router-dom'
import {ROUTES} from '../router'
import {UserConsumer} from '../store/contexts/UserContext'

let DEFAULT_VALUES = {
  phoneNumber: '(125) - 532 - 3952',
  password: 'password',
  retypePassword: 'password',
  email: 'jake@gmail.com',
  firstName: 'jake',
  lastName: 'cukjati'
}

const FormikUserFields = function (formikProps) {
  let history = useHistory()
  return (
    <div>
      <Formik
        // ADD need to reset the values
        initialValues={DEFAULT_VALUES}
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
            Cookies.AuthToken.set(resp.token)
            formikProps.onCreateUser(user)
            history.push(ROUTES.USER)
          })
        }}
      >
        {props => (
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
              {/* Cannot change */}
              <Email name="email" />
            </div>
            <PhoneNumber 
              label="Phone Number:"
              handleChange={props.handleChange}
              name="phoneNumber"
            />
            <PasswordMustMatchField {...props} />
            <button disabled={props.isSubmitting} type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

const ConsumedUserFields = function () {
  return (
    <UserConsumer>
      {(user) => {
        return <FormikUserFields onCreateUser={u => user.dispatch({state: u, type: 'set'})}/>
      }}
    </UserConsumer>
  )
}

export default ConsumedUserFields
