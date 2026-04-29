function InvoiceList({ invoices, onEdit, onDelete }) {
  const total = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div>
      <h3>Invoices</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project ID</th>
            <th>Schedule ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Exported</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.invoiceID}>
              <td>{inv.invoiceID}</td>
              <td>{inv.projectID ?? "—"}</td>
              <td>{inv.scheduleID ?? "—"}</td>
              <td>{new Date(inv.invoiceDate).toLocaleDateString()}</td>
              <td>${inv.totalAmount.toFixed(2)}</td>
              <td>{inv.isExported ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => onEdit(inv)}>Edit</button>
                {" "}
                <button onClick={() => onDelete(inv.invoiceID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>
  );
}

export default InvoiceList;
