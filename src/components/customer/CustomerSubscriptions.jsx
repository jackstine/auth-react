import { useCallback, useEffect, useState, useMemo } from "react";
import CustomerAPI from "../../apis/CustomerAPI";
import Button from "@material-ui/core/Button";
import Confirmation from "../../common-components/modal/Confirmation";

const CustomerSubscriptions = function () {
  let [subs, setSubs] = useState([]);
  let [showConfirm, setShowConfirm] = useState(false);
  let [subToCancel, setSubToCancel] = useState(null);
  const canceled = useMemo(() => new Set(), []);
  useEffect(() => {
    let api = new CustomerAPI();
    // TODO need to add in the customer info
    api.getSubscriptions("cus_JexSPG4gkVriL1").then((resp) => {
      setSubs(resp.data);
    });
  }, []);
  const cancelSub = useCallback((sub_id) => {
    canceled.add(sub_id);
    let api = new CustomerAPI();
    api.cancelSubscription(sub_id).then((resp) => {
      console.log(resp);
    });
  }, []);
  const onOk = useCallback(() => {
    cancelSub(subToCancel);
  });
  const onClose = useCallback(() => {
    setShowConfirm(false);
  }, []);
  const onCancel = useCallback((sub_id) => {
    setShowConfirm(true);
    setSubToCancel(sub_id);
  }, []);
  let rows = subs.map((el) => {
    return (
      <tr key={el.id}>
        <td>{el.created}</td>
        <td>{el.quantity}</td>
        <td>{el.current_period_start}</td>
        <td>{el.current_period_end}</td>
        <td>{el.status}</td>
        <td>{el.plan.amount}</td>
        <td>{`${el.plan.interval_count} ${el.plan.interval}`}</td>
        <td>{el.plan.active}</td>
        <td>
          <Button disabled={onCancel.has(el.id)} onClick={() => cancelSub(el.id)}>
            cancel
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <table>
        <thead>
          <th>created</th>
          <th>quantity</th>
          <th>start</th>
          <th>end</th>
          <th>status</th>
          <th>price per unit</th>
          <th>term</th>
          <th>active</th>
          <th>cancel</th>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Confirmation
        text="Are you sure you want to cancel the Subscription"
        open={showConfirm}
        onClose={onClose}
        onOK={onOk}
        title="Cancel Subscription"
      />
    </>
  );
};

export default CustomerSubscriptions;
