import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ROUTES } from "../../router";
import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

const CustomerDrawer = function () {
  let [isOpen, setIsOpen] = useState(true);
  const customerLinks = useMemo(() => {
    return [
      {
        text: "Customer Profile",
        path: ROUTES.CUSTOMER_PROFILE,
      },
      {
        text: "Subscriptions",
        path: ROUTES.CUSTOMER_SUBSCRIPTIONS,
      },
    ];
  }, []);
  let listItems = customerLinks.map((el) => {
    return (
      <ListItem button key={el.text}>
        <NavLink to={el.path}>
          <ListItemText primary={el.text} />
        </NavLink>
      </ListItem>
    );
  });
  return (
    <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(!isOpen)}>
      <List>{listItems}</List>
    </Drawer>
  );
};

export default CustomerDrawer;
