function WorkLogList({ workLogs, onEdit, onDelete }) {
  return (
    <div>
      <h3>Work Logs</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project ID</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>GPS</th>
            <th>Proof Photo</th>
            <th>Materials</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workLogs.map(log => (
            <tr key={log.logID}>
              <td>{log.logID}</td>
              <td>{log.projectID}</td>
              <td>{new Date(log.clockInTime).toLocaleString()}</td>
              <td>{new Date(log.clockOutTime).toLocaleString()}</td>
              <td>{log.gpsLocation}</td>
              <td>
                {log.proofPhotoURL
                  ? <a href={log.proofPhotoURL} target="_blank" rel="noreferrer">View</a>
                  : "—"}
              </td>
              <td>{log.materialsUsed}</td>
              <td>
                <button onClick={() => onEdit(log)}>Edit</button>
                {" "}
                <button onClick={() => onDelete(log.logID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkLogList;
