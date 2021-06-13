import { NavLink } from "react-router-dom";
import { ROUTES } from "../router";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UserHOC } from "../store/contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = function ({ user, children }) {
  let classes = useStyles();
  let loginText = "Login";
  let loginRoute = ROUTES.LOGIN;
  if (user.state.email) {
    loginText = "User Page";
    loginRoute = ROUTES.USER;
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button className={classes.menuButton} color="inherit">
            <NavLink to={loginRoute}>{loginText}</NavLink>
          </Button>
          <Button className={classes.menuButton} color="inherit">
            <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
          </Button>
          <Typography className={classes.title} variant="h6">
            About Us
          </Typography>
          <Typography className={classes.title} variant="h6">
            Entertainment
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default UserHOC(Header);
