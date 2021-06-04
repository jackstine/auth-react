import {useState} from "react"
import {Formik, Form} from 'formik'
import UserAPI from '../apis/UserAPI'
import Email from '../common-components/formik/Email'
import SubmitButton from '../common-components/buttons/SubmitButton'

const ForgotPassword = function (props) {
  let [requestSent, setRequestSent] = useState(false)
  let [failed, setFailed] = useState(false)
  let FailedSubmit = `The email you have used does not exist`
  return (
    <div>
      {!requestSent &&
        <Formik initialValues={{email: ''}}
          onSubmit={(values, action) => {
            action.setSubmitting(true)
            new UserAPI().forgotPassword(values.email).then(resp => {
              if (resp) {
                setRequestSent(true)
              } else {
                action.setSubmitting(false)
                setFailed(true)
              }
            }).catch(err => {
              action.setSubmitting(false)
            })
          }}
        >
          {(props) => {
            let emailSubmitted = `An email has been sent to ${props.values.email}`
            return (
              <>
                <Form>
                  <Email id="email" name="email"/>
                  {failed && <div>{FailedSubmit}</div>}
                  <SubmitButton text="Forgot Button" disabled={props.isSubmitting}/>
                </Form>
                {requestSent &&
                  emailSubmitted
                }
              </>
          )}}
        </Formik>
      }
    </div>
  )
}

export default ForgotPassword
