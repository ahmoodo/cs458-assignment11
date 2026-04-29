import { useState, useEffect } from "react";
import WorkLogList from "./components/WorkLogList";
import WorkLogForm from "./components/WorkLogForm";
import InvoiceList from "./components/InvoiceList";
import InvoiceForm from "./components/InvoiceForm";
import "./App.css";

// localStorage-based data store so the app works as a standalone demo
// without a backend. All CRUD operations persist across page refreshes.

function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function nextId(items, idField) {
  if (items.length === 0) return 1;
  return Math.max(...items.map(i => i[idField])) + 1;
}

function App() {
  const [workLogs, setWorkLogs] = useState(() => loadFromStorage("workLogs"));
  const [invoices, setInvoices] = useState(() => loadFromStorage("invoices"));
  const [editLog, setEditLog] = useState(null);
  const [editInvoice, setEditInvoice] = useState(null);

  useEffect(() => {
    saveToStorage("workLogs", workLogs);
  }, [workLogs]);

  useEffect(() => {
    saveToStorage("invoices", invoices);
  }, [invoices]);

  function saveWorkLog(log) {
    if (log.logID === 0) {
      const newLog = { ...log, logID: nextId(workLogs, "logID") };
      setWorkLogs(prev => [...prev, newLog]);
    } else {
      setWorkLogs(prev => prev.map(l => l.logID === log.logID ? log : l));
    }
    setEditLog(null);
  }

  function deleteWorkLog(id) {
    if (window.confirm("Delete this log?")) {
      setWorkLogs(prev => prev.filter(l => l.logID !== id));
    }
  }

  function saveInvoice(invoice) {
    if (invoice.invoiceID === 0) {
      const newInv = {
        ...invoice,
        invoiceID: nextId(invoices, "invoiceID"),
        invoiceDate: new Date().toISOString()
      };
      setInvoices(prev => [...prev, newInv]);
    } else {
      setInvoices(prev => prev.map(i => i.invoiceID === invoice.invoiceID ? invoice : i));
    }
    setEditInvoice(null);
  }

  function deleteInvoice(id) {
    if (window.confirm("Delete this invoice?")) {
      setInvoices(prev => prev.filter(i => i.invoiceID !== id));
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Maintenance Management</h1>
      <p style={{ color: "#666", fontSize: "14px" }}>
        Demo mode: data is stored in your browser. When connected to the ASP.NET Core API, replace the data layer in App.jsx with fetch calls.
      </p>
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
