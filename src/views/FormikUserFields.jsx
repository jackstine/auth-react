import {Formik, Form} from 'formik'
import PhoneNumber, {parse_Number} from '../common-components/formik/PhoneNumber'
import PasswordMustMatchField from '../common-components/formik/PasswordsMustMatch'
import Email from '../common-components/formik/Email'
import * as Yup from 'yup'
import UserAPI from '../apis/UserAPI'
import Cookies from '../store/cookies'
import {useHistory} from 'react-router-dom'
import {ROUTES} from '../router'
import {UserConsumer} from '../store/contexts/UserContext'
import { useState } from 'react'
import TextBox from '../common-components/Fields/TextBox'
import SubmitButton from '../common-components/buttons/SubmitButton'

let DEFAULT_VALUES = {
  phoneNumber: '(125) - 532 - 3952',
  password: 'password',
  retypePassword: 'password',
  email: 'jake@gmail.com',
  firstName: 'jake',
  lastName: 'cukjati'
}

let DEFAULT_VALUES2 = {
  phoneNumber: '',
  password: '',
  retypePassword: '',
  email: '',
  firstName: '',
  lastName: ''
}

const FormikUserFields = function (formikProps) {
  let history = useHistory()
  let [showError, setShowError] = useState()
  let errorMessage = <div style={{"color": "red"}}>There was an error submitting your request</div>
  return (
    <div>
      <Formik
        // ADD need to reset the values
        initialValues={DEFAULT_VALUES2}
        validationSchema={Yup.object({
          firstName: Yup.string().required('First Name is Required').min(2).max(100),
          lastName: Yup.string().required('Last Name is Required').min(2).max(100),
          phoneNumber: Yup.string().required('Phone Number is Required'),
          password: Yup.string().required('Password is Required').min(8).max(16),
          retypePassword: Yup.string().required().min(8).max(16)
        })}
        onSubmit={(values, actions) => {
          let apiUser = {
            first_name: values.firstName,
            last_name: values.lastName,
            password: values.password,
            phone: parse_Number(values.phoneNumber),
            email: values.email,
            user_id: values.email
          }
          new UserAPI().createUser(apiUser).then(resp => {
            if (resp.user) {
              const user = resp.user
              Cookies.AuthToken.set(resp.token)
              formikProps.onCreateUser(user)
              history.push(ROUTES.USER)
            } else {
              setShowError(true)
              actions.setSubmitting(false)
            }
          })
        }}
      >
        {props => (
          <Form>
            <div>
              <TextBox name="firstName" label="First Name"/>
              <TextBox name="lastName" label="Last Name"/>
            </div>
            <div> 
              {/* Cannot change */}
              <Email label="Email" name="email" />
            </div>
            <PhoneNumber 
              label="Phone Number:"
              handleChange={props.handleChange}
              name="phoneNumber"
            />
            <PasswordMustMatchField {...props} />
            {showError && errorMessage}
            <SubmitButton disabled={props.isSubmitting} />
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
