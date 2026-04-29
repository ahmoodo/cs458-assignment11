import { useState, useEffect } from "react";
import WorkLogList from "./components/WorkLogList";
import WorkLogForm from "./components/WorkLogForm";
import InvoiceList from "./components/InvoiceList";
import InvoiceForm from "./components/InvoiceForm";
import "./App.css";

// FIX: Use a relative base path "/api" instead of the hardcoded HTTPS URL
// "https://localhost:7239/api". The Vite dev server proxies /api/* to the
// ASP.NET Core backend (see vite.config.js), which avoids self-signed
// certificate errors in the browser and keeps the URL portable.
const API = "/api";

function App() {
  const [workLogs, setWorkLogs] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [editLog, setEditLog] = useState(null);
  const [editInvoice, setEditInvoice] = useState(null);

  useEffect(() => {
    fetchWorkLogs();
    fetchInvoices();
  }, []);

  function fetchWorkLogs() {
    fetch(`${API}/worklogs`)
      .then(res => res.json())
      .then(data => setWorkLogs(data))
      .catch(err => console.error("Error fetching work logs:", err));
  }

  function fetchInvoices() {
    fetch(`${API}/invoices`)
      .then(res => res.json())
      .then(data => setInvoices(data))
      .catch(err => console.error("Error fetching invoices:", err));
  }

  function saveWorkLog(log) {
    const method = log.logID === 0 ? "POST" : "PUT";
    const url = log.logID === 0 ? `${API}/worklogs` : `${API}/worklogs/${log.logID}`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log)
    })
      .then(res => {
        if (!res.ok) return res.text().then(t => { throw new Error(t); });
        fetchWorkLogs();
        setEditLog(null);
      })
      .catch(err => alert("Error saving work log: " + err.message));
  }

  function deleteWorkLog(id) {
    fetch(`${API}/worklogs/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        fetchWorkLogs();
      })
      .catch(err => alert("Error deleting work log: " + err.message));
  }

  function saveInvoice(invoice) {
    const method = invoice.invoiceID === 0 ? "POST" : "PUT";
    const url = invoice.invoiceID === 0 ? `${API}/invoices` : `${API}/invoices/${invoice.invoiceID}`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice)
    })
      .then(res => {
        if (!res.ok) return res.text().then(t => { throw new Error(t); });
        fetchInvoices();
        setEditInvoice(null);
      })
      .catch(err => alert("Error saving invoice: " + err.message));
  }

  function deleteInvoice(id) {
    fetch(`${API}/invoices/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        fetchInvoices();
      })
      .catch(err => alert("Error deleting invoice: " + err.message));
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Maintenance Management</h1>
      <hr />
      <WorkLogForm onSave={saveWorkLog} editData={editLog} onCancel={() => setEditLog(null)} />
      <WorkLogList workLogs={workLogs} onEdit={setEditLog} onDelete={deleteWorkLog} />
      <hr />
      <InvoiceForm onSave={saveInvoice} editData={editInvoice} onCancel={() => setEditInvoice(null)} />
      <InvoiceList invoices={invoices} onEdit={setEditInvoice} onDelete={deleteInvoice} />
    </div>
  );
}

export default App;
