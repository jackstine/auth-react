import {Formik, Form} from 'formik'
import UserAPI from '../../apis/UserAPI'
import PasswordsMustMatch from '../../common-components/formik/PasswordsMustMatch'
import Cookies from '../../store/cookies'
import {useHistory} from 'react-router-dom'
import {ROUTES} from '../../router'

const CreateNewPassword = function (props) {
  let history = useHistory()
  const onCreateNewPassword = function (password) {
    return new UserAPI().resetPasswordWithTemp(
      props.tempPass.inputInfo.email, props.tempPass.inputInfo.password,
      password.password
    ).then(resp => {
      if (resp.success) {
        Cookies.AuthToken.set(resp.token)
        history.push(ROUTES.USER)
        props.user.dispatch({type: 'set', state: resp.user})
      }
    })
  }
  return (
    <Formik
      initialValues={{
        password: '',
        retypePassword: ''
      }}
      onSubmit={(values, action) => {
        onCreateNewPassword(values).catch(resp => {
          action.setSubmitting(false)
        })
      }}
    >
      {(props) => (
        <Form>
          <PasswordsMustMatch {...props} />
          <button disabled={props.isSubmitting} type="submit">Reset Password</button>
        </Form>
      )}
    </Formik>
  )
}

export default CreateNewPassword
