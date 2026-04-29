import { useState, useEffect } from "react";

function WorkLogForm({ onSave, editData, onCancel }) {
  const [projectID, setProjectID] = useState("");
  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [gpsLocation, setGpsLocation] = useState("");
  const [proofPhotoURL, setProofPhotoURL] = useState("");
  const [materialsUsed, setMaterialsUsed] = useState("");
  const [vendorSignature, setVendorSignature] = useState("");

  useEffect(() => {
    if (editData) {
      // Populate all fields from the record being edited.
      setProjectID(editData.projectID);
      setClockInTime(editData.clockInTime?.slice(0, 16));
      setClockOutTime(editData.clockOutTime?.slice(0, 16));
      setGpsLocation(editData.gpsLocation || "");
      setProofPhotoURL(editData.proofPhotoURL || "");
      setMaterialsUsed(editData.materialsUsed || "");
      setVendorSignature(editData.vendorSignature || "");
    } else {
      // FIX: When editData becomes null (cancel pressed or save completed),
      // reset the form back to blank so the "Add" form doesn't show stale data.
      setProjectID("");
      setClockInTime("");
      setClockOutTime("");
      setGpsLocation("");
      setProofPhotoURL("");
      setMaterialsUsed("");
      setVendorSignature("");
    }
  }, [editData]);

  function handleSubmit(e) {
    e.preventDefault();
    const log = {
      logID: editData ? editData.logID : 0,
      projectID: parseInt(projectID),
      clockInTime,
      clockOutTime,
      gpsLocation,
      proofPhotoURL,
      materialsUsed,
      vendorSignature
    };
    onSave(log);
    // Reset local state immediately after save.
    // The parent will also set editData to null which triggers the useEffect reset,
    // but clearing here provides instant visual feedback.
    setProjectID(""); setClockInTime(""); setClockOutTime("");
    setGpsLocation(""); setProofPhotoURL(""); setMaterialsUsed(""); setVendorSignature("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editData ? "Edit Work Log" : "Add Work Log"}</h3>
      <div>
        <label>Project ID: </label>
        <input type="number" value={projectID} onChange={e => setProjectID(e.target.value)} required />
      </div>
      <div>
        <label>Clock In: </label>
        <input type="datetime-local" value={clockInTime} onChange={e => setClockInTime(e.target.value)} required />
      </div>
      <div>
        <label>Clock Out: </label>
        <input type="datetime-local" value={clockOutTime} onChange={e => setClockOutTime(e.target.value)} required />
      </div>
      <div>
        <label>GPS Location: </label>
        <input type="text" value={gpsLocation} onChange={e => setGpsLocation(e.target.value)} />
      </div>
      <div>
        <label>Proof Photo URL: </label>
        <input type="url" value={proofPhotoURL} onChange={e => setProofPhotoURL(e.target.value)} />
      </div>
      <div>
        <label>Materials Used: </label>
        <input type="text" value={materialsUsed} onChange={e => setMaterialsUsed(e.target.value)} />
      </div>
      <div>
        <label>Vendor Signature: </label>
        <input type="text" value={vendorSignature} onChange={e => setVendorSignature(e.target.value)} />
      </div>
      <button type="submit">{editData ? "Update" : "Add"}</button>
      {editData && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default WorkLogForm;
