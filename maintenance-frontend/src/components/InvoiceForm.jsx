import { useState, useEffect } from "react";

function InvoiceForm({ onSave, editData, onCancel }) {
  const [projectID, setProjectID] = useState("");
  const [scheduleID, setScheduleID] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [isExported, setIsExported] = useState(false);

  useEffect(() => {
    if (editData) {
      setProjectID(editData.projectID ?? "");
      setScheduleID(editData.scheduleID ?? "");
      setTotalAmount(editData.totalAmount);
      setIsExported(editData.isExported);
    } else {
      // FIX: When editData becomes null (cancel pressed or save completed),
      // reset the form back to blank so the "Add" form doesn't show stale data.
      setProjectID("");
      setScheduleID("");
      setTotalAmount("");
      setIsExported(false);
    }
  }, [editData]);

  function handleSubmit(e) {
    e.preventDefault();
    const invoice = {
      invoiceID: editData ? editData.invoiceID : 0,
      projectID: projectID === "" ? null : parseInt(projectID),
      scheduleID: scheduleID === "" ? null : parseInt(scheduleID),
      totalAmount: parseFloat(totalAmount),
      isExported
    };
    onSave(invoice);
    // Reset local state immediately after save.
    setProjectID(""); setScheduleID(""); setTotalAmount(""); setIsExported(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editData ? "Edit Invoice" : "Add Invoice"}</h3>
      <div>
        <label>Project ID: </label>
        <input type="number" value={projectID} onChange={e => setProjectID(e.target.value)} />
      </div>
      <div>
        <label>Schedule ID: </label>
        <input type="number" value={scheduleID} onChange={e => setScheduleID(e.target.value)} />
      </div>
      <div>
        <label>Total Amount: </label>
        <input type="number" step="0.01" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} required />
      </div>
      <div>
        <label>Exported: </label>
        <input type="checkbox" checked={isExported} onChange={e => setIsExported(e.target.checked)} />
      </div>
      <button type="submit">{editData ? "Update" : "Add"}</button>
      {editData && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default InvoiceForm;
