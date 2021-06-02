import Header from '../../components/Header'
import {Switch, Route} from 'react-router-dom'
import {ROUTES} from '../'
import FormikUserFields from '../../views/FormikUserFields'
import SignIn from '../../views/SignIn'

const Home = function () {
  return (
    <>
      <Header/>
      <Switch>
        <Route exact path={ROUTES.SIGN_UP} component={FormikUserFields}/>
        <Route exact path={ROUTES.LOGIN} component={SignIn}/>
      </Switch>
    </>
  )
}

export default Home
