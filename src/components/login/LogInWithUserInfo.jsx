import { useState } from "react"
import AuthAPI from '../../apis/AuthAPI'
import Cookies from '../../store/cookies'
import {useHistory} from 'react-router-dom'
import {ROUTES} from '../../router'
import {Formik, Form} from 'formik'
import TextBox from '../../common-components/Fields/TextBox'
import Email from '../../common-components/formik/Email'
import SubmitButton from '../../common-components/buttons/SubmitButton'


const LogInWithUserInfo = function (props) {
  let [failedSubmit, setFailedSubmit] = useState(false)
  let history = useHistory()
  let invalidMessage = 'the email or the password you entered is invalid'
  return (
    <div>
      <Formik
        initialValues={{
          email:'',
          password:''
        }}
        onSubmit={(user, actions) => {
          actions.setSubmitting(true)
          new AuthAPI().login(user).then(resp => {
            if (resp.success) {
              if (resp.verifiedWithTemporary) {
                props.onTempPasswordReceived({inputInfo: user})
                return
              } else {
                Cookies.AuthToken.set(resp.token)
                props.user.dispatch({type:'set', state: resp.user})
                history.push(ROUTES.USER)
              }
            }
            actions.setSubmitting(false)
            setFailedSubmit(true)
          })
        }}
      >
        {(props) => (
          <Form>
            {failedSubmit && invalidMessage}
            <Email label="Email" name="email" />
            <div>
              <TextBox type="password" label="Password" name="password"/>
            </div>
            <SubmitButton disabled={props.isSubmitting}/>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LogInWithUserInfo
