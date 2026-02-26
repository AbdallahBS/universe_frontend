import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, Trash2, RefreshCw, ShieldPlus, Key, ChevronDown, AlertTriangle, Eye, EyeOff, Copy, Check, Plus, X, Moon, Sun, HardDrive } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { getDBCollections, deleteDBCollectionByName, backupDB, resetSessionsandAnalytics } from "../../services/adminService";
import LoadingSpinner from "@components/ui/LoadingSpinner";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_COLLECTIONS = [
  { name: "users",      documentCount: 8421,   storageSize: 12400000, totalIndexSize: 2100000 },
  { name: "sessions",   documentCount: 54302,  storageSize: 34100000, totalIndexSize: 5420000 },
  { name: "analytics",  documentCount: 210540, storageSize: 89700000, totalIndexSize: 18950000 },
  { name: "logs",       documentCount: 983211, storageSize: 156200000, totalIndexSize: 42100000 },
  { name: "api_events", documentCount: 41000,  storageSize: 22800000, totalIndexSize: 4560000 },
];

const INITIAL_ROLES = [
  { id: "superadmin", label: "Super Admin", color: "#ef4444", desc: "Full system access"    },
  { id: "admin",      label: "Admin",       color: "#f97316", desc: "Administrative access" },
  { id: "moderator",  label: "Moderator",   color: "#eab308", desc: "Content moderation"    },
  { id: "analyst",    label: "Analyst",     color: "#3b82f6", desc: "Read-only analytics"   },
  { id: "viewer",     label: "Viewer",      color: "#6b7280", desc: "Basic read access"     },
];

const INITIAL_KEYS = [
  { id: "k1", name: "Production API Key", key: "sk_live_4xTq9mN2pZrBwD8s", created: "Jan 12, 2025", active: true  },
  { id: "k2", name: "Analytics Service",  key: "sk_live_7yUr3kP8wQcLmH1v", created: "Mar 3, 2025",  active: true  },
  { id: "k3", name: "Legacy Integration", key: "sk_live_1aXz0bQ5tJnEoF6g", created: "Nov 20, 2024", active: false },
];

const ROLE_COLORS = ["#ef4444","#f97316","#eab308","#22c55e","#3b82f6","#8b5cf6","#ec4899","#6b7280"];

// ─── Data Fetching Functions ───────────────────────────────────────────────────
/**
 * Fetch collections data from the admin API
 */
async function fetchCollections(): Promise<typeof INITIAL_COLLECTIONS> {
  return getDBCollections();
}

/**
 * Fetch roles data from the admin API
 * Replace with actual API endpoint call
 */
async function fetchRoles(): Promise<typeof INITIAL_ROLES> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/admin/roles');
  // if (!response.ok) throw new Error('Failed to fetch roles');
  // return response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(INITIAL_ROLES), 500);
  });
}

/**
 * Fetch API keys data from the admin API
 * Replace with actual API endpoint call
 */
async function fetchApiKeys(): Promise<typeof INITIAL_KEYS> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/admin/api-keys');
  // if (!response.ok) throw new Error('Failed to fetch API keys');
  // return response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(INITIAL_KEYS), 500);
  });
}

/**
 * Fetch analytics metadata
 * Replace with actual API endpoint call
 */
async function fetchAnalyticsMetadata(): Promise<{ lastReset: string; recordCount: number }> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/admin/analytics/metadata');
  // if (!response.ok) throw new Error('Failed to fetch analytics metadata');
  // return response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => resolve({ lastReset: "2025-02-15 14:32:00", recordCount: 2891034 }), 500);
  });
}

// ─── AnimatedHeight ───────────────────────────────────────────────────────────
function AnimatedHeight({ open, children }: { open: boolean; children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight]   = useState(open ? "auto" : 0);
  const [mounted, setMounted] = useState(open);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (innerRef.current) {
          setHeight(innerRef.current.scrollHeight);
          timerRef.current = setTimeout(() => setHeight("auto"), 340);
        }
      }));
    } else {
      if (innerRef.current) setHeight(innerRef.current.scrollHeight);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setHeight(0);
        timerRef.current = setTimeout(() => setMounted(false), 340);
      }));
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [open]);

  return (
    <div style={{ height, overflow: "hidden", transition: "height 0.34s cubic-bezier(0.4,0,0.2,1)" }}>
      <div ref={innerRef} style={{ opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(-8px)", transition: "opacity 0.28s ease, transform 0.28s ease" }}>
        {mounted && children}
      </div>
    </div>
  );
}

// ─── FadeSlideRow ─────────────────────────────────────────────────────────────
function FadeSlideRow({ children, isRemoving }: { children: React.ReactNode; isRemoving: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const id = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(id); }, []);
  return (
    <div style={{
      opacity:   isRemoving ? 0 : ready ? 1 : 0,
      transform: isRemoving ? "translateX(20px) scale(0.97)" : ready ? "translateX(0)" : "translateX(-8px)",
      maxHeight: isRemoving ? "0px" : "200px",
      overflow:  "hidden",
      transition: isRemoving
        ? "opacity 0.25s ease, transform 0.25s ease, max-height 0.32s ease 0.1s"
        : "opacity 0.3s ease, transform 0.3s ease",
    }}>
      {children}
    </div>
  );
}

// ─── ConfirmModal — rendered via portal so overflow:hidden never clips it ─────
function ConfirmModal({ title, message, confirmLabel = "Confirm", requireTyping = false, onConfirm, onCancel, isDark }: { title: string; message: string; confirmLabel?: string; requireTyping?: boolean; onConfirm: () => void; onCancel: () => void; isDark: boolean }) {
  const [inputVal, setInputVal] = useState("");
  const [show, setShow]         = useState(false);
  const keyword    = "CONFIRM";
  const canProceed = !requireTyping || inputVal === keyword;

  useEffect(() => { const id = requestAnimationFrame(() => setShow(true)); return () => cancelAnimationFrame(id); }, []);

  const dismiss = (cb: () => void) => { setShow(false); setTimeout(cb, 220); };

  return createPortal(
    <div
      onClick={() => dismiss(onCancel)}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
        background: `rgba(0,0,0,${show ? 0.72 : 0})`,
        backdropFilter: `blur(${show ? 6 : 0}px)`,
        transition: "background 0.22s ease, backdrop-filter 0.22s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 430,
          borderRadius: "1.25rem", padding: "1.5rem",
          background: isDark ? "rgba(8,12,26,0.98)" : "#ffffff",
          border: "1px solid rgba(239,68,68,0.42)",
          boxShadow: "0 0 0 1px rgba(239,68,68,0.07), 0 24px 60px rgba(0,0,0,0.5)",
          transform: show ? "scale(1) translateY(0)" : "scale(0.92) translateY(18px)",
          opacity: show ? 1 : 0,
          transition: "transform 0.26s cubic-bezier(0.34,1.5,0.64,1), opacity 0.22s ease",
        }}
      >
        {/* Icon + text */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "0.75rem", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.22)" }}>
            <AlertTriangle style={{ width: 18, height: 18, color: "#ef4444" }} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.88rem", color: isDark ? "#f1f5f9" : "#0f172a", margin: "0 0 0.2rem" }}>{title}</p>
            <p style={{ fontSize: "0.73rem", color: isDark ? "#94a3b8" : "#64748b", margin: 0, lineHeight: 1.55 }}>{message}</p>
          </div>
        </div>

        {requireTyping && (
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.68rem", color: isDark ? "#94a3b8" : "#64748b", marginBottom: "0.4rem" }}>
              Type{" "}<span style={{ fontFamily: "'DM Mono',monospace", fontWeight: 700, color: "#ef4444" }}>{keyword}</span>{" "}to proceed
            </p>
            <input
              autoFocus
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && canProceed) dismiss(onConfirm); }}
              placeholder={keyword}
              style={{
                width: "100%", padding: "0.5rem 0.75rem", borderRadius: "0.55rem",
                fontFamily: "'DM Mono',monospace", fontSize: "0.78rem", outline: "none",
                background: isDark ? "rgba(30,41,59,0.8)" : "rgba(241,245,249,0.8)",
                border: `1px solid ${inputVal === keyword ? "rgba(239,68,68,0.55)" : isDark ? "rgba(51,65,85,0.5)" : "rgba(203,213,225,0.5)"}`,
                color: isDark ? "#f1f5f9" : "#0f172a",
                transition: "border-color 0.2s ease",
                boxSizing: "border-box",
              }}
            />
          </div>
        )}

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button
            onClick={() => dismiss(onCancel)}
            style={{ flex: 1, padding: "0.6rem", borderRadius: "0.7rem", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", background: isDark ? "rgba(51,65,85,0.5)" : "rgba(241,245,249,0.8)", color: isDark ? "#94a3b8" : "#64748b", border: isDark ? "1px solid rgba(51,65,85,0.4)" : "1px solid rgba(203,213,225,0.4)" }}
          >
            Cancel
          </button>
          <button
            onClick={() => canProceed && dismiss(onConfirm)}
            disabled={!canProceed}
            style={{ flex: 1, padding: "0.6rem", borderRadius: "0.7rem", fontSize: "0.78rem", fontWeight: 600, cursor: canProceed ? "pointer" : "not-allowed", background: canProceed ? "rgba(239,68,68,0.88)" : isDark ? "rgba(51,65,85,0.3)" : "rgba(203,213,225,0.4)", color: canProceed ? "#fff" : isDark ? "#475569" : "#94a3b8", border: "none", transition: "background 0.18s ease" }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── SectionCard ──────────────────────────────────────────────────────────────
function SectionCard({ icon: Icon, accentColor, title, subtitle, children, isDark, defaultOpen = false }: { icon: React.ElementType; accentColor: string; title: string; subtitle: string; children: React.ReactNode; isDark: boolean; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{
      borderRadius: "1.2rem",
      background: isDark ? "rgba(15,23,42,0.72)" : "rgba(255,255,255,0.58)",
      border: open
        ? (isDark ? `1px solid ${accentColor}35` : `1px solid ${accentColor}28`)
        : (isDark ? "1px solid rgba(51,65,85,0.5)" : "1px solid rgba(203,213,225,0.35)"),
      backdropFilter: "blur(14px)",
      boxShadow: open
        ? (isDark ? `0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px ${accentColor}10` : `0 6px 24px rgba(0,0,0,0.07)`)
        : "none",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      // NOTE: no overflow:hidden here — that was clipping the portal modal in older approach
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
          padding: "1.15rem 1.35rem", textAlign: "left", cursor: "pointer",
          background: "transparent", border: "none",
          borderBottom: open
            ? (isDark ? "1px solid rgba(51,65,85,0.38)" : "1px solid rgba(203,213,225,0.3)")
            : "1px solid transparent",
          transition: "border-color 0.28s ease",
          borderRadius: open ? "1.2rem 1.2rem 0 0" : "1.2rem",
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: "0.7rem", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `${accentColor}18`, border: `1px solid ${accentColor}28`,
          transform: open ? "scale(1.1) rotate(-4deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.34,1.5,0.64,1)",
        }}>
          <Icon style={{ width: 15, height: 15, color: accentColor }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: "0.84rem", letterSpacing: "0.01em", margin: 0, color: isDark ? "#f1f5f9" : "#0f172a" }}>{title}</p>
          <p style={{ fontSize: "0.8rem", margin: "0.1rem 0 0", color: isDark ? "#64748b" : "#94a3b8" }}>{subtitle}</p>
        </div>
        <ChevronDown style={{
          width: 15, height: 15, flexShrink: 0,
          color: isDark ? "#64748b" : "#94a3b8",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.34s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </button>

      <AnimatedHeight open={open}>
        <div style={{ padding: "1.2rem 1.35rem" }}>
          {children}
        </div>
      </AnimatedHeight>
    </div>
  );
}

// ─── DeleteCollections ────────────────────────────────────────────────────────
function DeleteCollections({ isDark }: { isDark: boolean }) {
  const [collections, setCollections] = useState(INITIAL_COLLECTIONS);
  const [modal, setModal]     = useState<{ name: string } | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [backupLoading, setBackupLoading] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);
  const mono = { fontFamily: "'DM Mono',monospace" };

  useEffect(() => {
    const loadCollections = async () => {
      try {
        setLoading(true);
        const data = await getDBCollections();
        // Handle response that might be an array or wrapped in an object
        const collectionsList = Array.isArray(data) ? data : (data?.data || data?.collections || []);
        setCollections(collectionsList);
        setError(null);
      } catch (err) {
        setError('Failed to load collections');
        console.error('Error loading collections:', err);
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };
    loadCollections();
  }, []);

  const formatBytes = (bytes: number) => {
    const kb = bytes / 1024;
    return `${kb.toFixed(1)} KB`;
  };

  const handleDelete = async () => {
    if (!modal) return;
    setRemoving(modal.name);
    try {
      await deleteDBCollectionByName(modal.name);
      setTimeout(() => { setCollections(c => c.filter(x => x.name !== modal.name)); setRemoving(null); }, 430);
    } catch (err) {
      console.error('Failed to delete collection:', err);
      setError('Failed to delete collection');
      setRemoving(null);
    }
    setModal(null);
  };

  const handleBackup = async () => {
    setBackupLoading(true);
    try {
      await backupDB();
      setBackupSuccess(true);
      setTimeout(() => setBackupSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to backup database:', err);
      setError('Failed to create backup');
    } finally {
      setBackupLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "2rem 0", color: "#ef4444" }}>{error}</div>;
  }

  return (
    <>
      {modal && <ConfirmModal isDark={isDark} title={`Delete "${modal.name}"`} message="All documents inside will be permanently destroyed. This cannot be undone." confirmLabel="Delete Collection" requireTyping onConfirm={handleDelete} onCancel={() => setModal(null)} />}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Backup Section */}
        <div style={{ borderRadius: "0.8rem", padding: "0.8rem 1rem", background: isDark ? "rgba(20,184,166,0.05)" : "rgba(207,250,254,0.8)", border: isDark ? "1px solid rgba(20,184,166,0.15)" : "1px solid rgba(34,211,238,0.5)" }}>
          <p style={{ fontSize: "0.73rem", lineHeight: 1.65, margin: "0 0 0.7rem", color: isDark ? "#94a3b8" : "#64748b" }}>
            Create a database backup before performing any destructive operations. Backups are stored separately and can be used for recovery.
          </p>
          <button
            onClick={handleBackup}
            disabled={backupLoading}
            style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.55rem 1.1rem", borderRadius: "0.75rem", fontSize: "0.78rem", fontWeight: 600, cursor: backupLoading ? "default" : "pointer", background: backupSuccess ? "rgba(16,185,129,0.1)" : "rgba(20,184,166,0.1)", border: `1px solid ${backupSuccess ? "rgba(16,185,129,0.3)" : "rgba(20,184,166,0.3)"}`, color: backupSuccess ? "#10b981" : "#14b8a6", transition: "all 0.25s ease", opacity: backupLoading ? 0.6 : 1 }}
          >
            <HardDrive style={{ width: 13, height: 13 }} />
            {backupLoading ? "Creating Backup..." : backupSuccess ? "Backup Created Successfully" : "Create Database Backup"}
          </button>
        </div>

        {/* Collections List */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.7fr 32px", gap: "0.5rem", padding: "0 0.6rem 0.4rem" }}>
            {["Collection","Docs","Size",""].map((h,i) => (
              <span key={i} style={{ ...mono, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, color: isDark ? "#334155" : "#cbd5e1" }}>{h}</span>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {collections.length === 0 && <p style={{ ...mono, fontSize: "0.73rem", textAlign: "center", padding: "1.5rem 0", color: isDark ? "#334155" : "#cbd5e1" }}>No collections remaining.</p>}
            {collections.map(col => (
              <FadeSlideRow key={col.name} isRemoving={removing === col.name}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.7fr 32px", gap: "0.5rem", alignItems: "center", padding: "0.55rem 0.6rem", borderRadius: "0.7rem", background: isDark ? "rgba(30,41,59,0.5)" : "rgba(248,250,252,0.8)", border: isDark ? "1px solid rgba(51,65,85,0.3)" : "1px solid rgba(203,213,225,0.35)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", opacity: 0.65, flexShrink: 0 }} />
                    <span style={{ ...mono, fontSize: "0.73rem", fontWeight: 600, color: isDark ? "#e2e8f0" : "#1e293b" }}>{col.name}</span>
                  </div>
                  <span style={{ ...mono, fontSize: "0.7rem", color: isDark ? "#64748b" : "#94a3b8" }}>{col.documentCount.toLocaleString()}</span>
                  <span style={{ ...mono, fontSize: "0.7rem", color: isDark ? "#64748b" : "#94a3b8" }}>
                    storage : {formatBytes(col.storageSize)}<br/>indexes : {formatBytes(col.totalIndexSize)}
                  </span>
                  <button
                    onClick={() => setModal({ name: col.name })}
                    style={{ width: 28, height: 28, borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", transition: "all 0.18s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; e.currentTarget.style.transform = "scale(1.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.07)"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    <Trash2 style={{ width: 12, height: 12, color: "#ef4444" }} />
                  </button>
                </div>
              </FadeSlideRow>
            ))}
          </div>
          <p style={{ fontSize: "0.75rem", marginTop: "0.7rem", color: isDark ? "#334155" : "#cbd5e1" }}>⚠ Ensure you have a backup before deleting any collection.</p>
        </div>
      </div>
    </>
  );
}

// ─── ResetAnalytics ───────────────────────────────────────────────────────────
function ResetAnalytics({ isDark }: { isDark: boolean }) {
  const [modal, setModal] = useState(false);
  const [done,  setDone]  = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    try {
      await resetSessionsandAnalytics();
      setDone(true);
      setModal(false);
      setTimeout(() => setDone(false), 6000);
    } catch (err) {
      console.error('Failed to reset sessions and analytics:', err);
      setModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {modal && <ConfirmModal isDark={isDark} title="Reset All Sessions & Analytics" message="All historical analytics data and users opened sessions will be permanently erased from the DB." confirmLabel="Confirm Reset" requireTyping onConfirm={handleReset} onCancel={() => setModal(false)} />}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <div style={{ borderRadius: "0.8rem", padding: "0.8rem 1rem", background: isDark ? "rgba(249,115,22,0.05)" : "rgba(255,247,237,0.8)", border: isDark ? "1px solid rgba(249,115,22,0.15)" : "1px solid rgba(253,186,116,0.5)" }}>
          <p style={{ fontSize: "0.73rem", lineHeight: 1.65, margin: 0, color: isDark ? "#94a3b8" : "#64748b" }}>
            This permanently erases <strong style={{ color: isDark ? "#fb923c" : "#ea580c" }}>all analytics records</strong> including page views, sessions, conversion funnels, event logs, and aggregated reports. All time ranges are affected.
          </p>
        </div>
        <button
          onClick={() => !done && !loading && setModal(true)}
          disabled={loading}
          style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.55rem 1.1rem", borderRadius: "0.75rem", fontSize: "0.78rem", fontWeight: 600, cursor: done || loading ? "default" : "pointer", background: done ? "rgba(16,185,129,0.1)" : "rgba(249,115,22,0.1)", border: `1px solid ${done ? "rgba(16,185,129,0.3)" : "rgba(249,115,22,0.3)"}`, color: done ? "#10b981" : "#f97316", transition: "all 0.25s ease", opacity: loading ? 0.6 : 1 }}
          onMouseEnter={e => !done && !loading && (e.currentTarget.style.background = "rgba(249,115,22,0.18)")}
          onMouseLeave={e => !done && !loading && (e.currentTarget.style.background = "rgba(249,115,22,0.1)")}
        >
          <RefreshCw style={{ width: 13, height: 13 }} />
          {loading ? "Resetting..." : done ? "Reset Command is Successfully Executed" : "Reset All Sessions & Analytics"}
        </button>
      </div>
    </>
  );
}

// ─── ManageRoles ──────────────────────────────────────────────────────────────
function ManageRoles({ isDark }: { isDark: boolean }) {
  const [roles,       setRoles]       = useState(INITIAL_ROLES);
  const [showForm,    setShowForm]    = useState(false);
  const [form,        setForm]        = useState({ label: "", desc: "", color: "#6366f1" });
  const [deleteModal, setDeleteModal] = useState<typeof INITIAL_ROLES[0] | null>(null);
  const [addModal,    setAddModal]    = useState(false);
  const [removing,    setRemoving]    = useState<string | null>(null);

  const confirmDelete = () => {
    if (!deleteModal) return;
    setRemoving(deleteModal.id);
    setTimeout(() => { setRoles(r => r.filter(x => x.id !== deleteModal.id)); setRemoving(null); }, 400);
    setDeleteModal(null);
  };
  const confirmAdd = () => {
    setRoles(r => [...r, { id: Date.now().toString(), ...form }]);
    setForm({ label: "", desc: "", color: "#6366f1" });
    setShowForm(false);
    setAddModal(false);
  };

  return (
    <>
      {deleteModal && <ConfirmModal isDark={isDark} title={`Remove role "${deleteModal.label}"`} message="Users with this role will lose their associated permissions immediately." confirmLabel="Remove Role" requireTyping={false} onConfirm={confirmDelete} onCancel={() => setDeleteModal(null)} />}
      {addModal    && <ConfirmModal isDark={isDark} title={`Create role "${form.label}"`} message={`A new "${form.label}" role will be created and can be assigned to users.`} confirmLabel="Create Role" requireTyping={false} onConfirm={confirmAdd} onCancel={() => setAddModal(false)} />}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
        {/* Badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {roles.map(role => (
            <FadeSlideRow key={role.id} isRemoving={removing === role.id}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.3rem 0.55rem 0.3rem 0.45rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600, background: `${role.color}12`, border: `1px solid ${role.color}28`, color: role.color }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: role.color, flexShrink: 0 }} />
                {role.label}
                <span style={{ fontSize: "0.6rem", opacity: 0.5 }}>— {role.desc}</span>
                <button onClick={() => setDeleteModal(role)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 0 2px", display: "flex", alignItems: "center", opacity: 0.45, transition: "opacity 0.15s ease" }} onMouseEnter={e => e.currentTarget.style.opacity="1"} onMouseLeave={e => e.currentTarget.style.opacity="0.45"}>
                  <X style={{ width: 9, height: 9, color: role.color }} />
                </button>
              </div>
            </FadeSlideRow>
          ))}
        </div>

        {/* Add form */}
        <AnimatedHeight open={showForm}>
          <div style={{ borderRadius: "0.8rem", padding: "0.9rem 1rem", background: isDark ? "rgba(30,41,59,0.55)" : "rgba(248,250,252,0.85)", border: isDark ? "1px solid rgba(51,65,85,0.4)" : "1px solid rgba(203,213,225,0.4)", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <p style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: isDark ? "#475569" : "#94a3b8", margin: 0 }}>New Role</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.55rem" }}>
              {([{k:"label",label:"Role Name",ph:"e.g. Support Agent"},{k:"desc",label:"Description",ph:"Brief description"}] as { k: keyof typeof form; label: string; ph: string }[]).map(f => (
                <div key={f.k}>
                  <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", color: isDark ? "#475569" : "#94a3b8", margin: "0 0 0.25rem" }}>{f.label}</p>
                  <input value={form[f.k]} onChange={e => setForm(v => ({ ...v, [f.k]: e.target.value }))} placeholder={f.ph} style={{ width: "100%", padding: "0.42rem 0.6rem", borderRadius: "0.5rem", fontSize: "0.73rem", outline: "none", background: isDark ? "rgba(15,23,42,0.6)" : "#fff", border: isDark ? "1px solid rgba(51,65,85,0.5)" : "1px solid rgba(203,213,225,0.5)", color: isDark ? "#f1f5f9" : "#0f172a", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", color: isDark ? "#475569" : "#94a3b8", margin: "0 0 0.35rem" }}>Badge Color</p>
              <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                {ROLE_COLORS.map(c => (
                  <button key={c} onClick={() => setForm(v => ({ ...v, color: c }))} style={{ width: 20, height: 20, borderRadius: "50%", background: c, border: "none", cursor: "pointer", outline: form.color === c ? `2.5px solid ${c}` : "none", outlineOffset: 2, transform: form.color === c ? "scale(1.22)" : "scale(1)", transition: "transform 0.18s ease, outline 0.15s ease" }} />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.45rem" }}>
              <button onClick={() => form.label.trim() && setAddModal(true)} style={{ padding: "0.42rem 0.9rem", borderRadius: "0.55rem", fontSize: "0.72rem", fontWeight: 600, cursor: form.label.trim() ? "pointer" : "not-allowed", background: form.label.trim() ? "rgba(20,184,166,0.11)" : isDark ? "rgba(51,65,85,0.3)" : "rgba(203,213,225,0.4)", border: `1px solid ${form.label.trim() ? "rgba(20,184,166,0.35)" : "transparent"}`, color: form.label.trim() ? "#14b8a6" : isDark ? "#475569" : "#94a3b8", transition: "all 0.18s ease" }}>Add Role</button>
              <button onClick={() => setShowForm(false)} style={{ padding: "0.42rem 0.9rem", borderRadius: "0.55rem", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", background: isDark ? "rgba(51,65,85,0.4)" : "rgba(241,245,249,0.8)", border: isDark ? "1px solid rgba(51,65,85,0.3)" : "1px solid rgba(203,213,225,0.3)", color: isDark ? "#94a3b8" : "#64748b" }}>Cancel</button>
            </div>
          </div>
        </AnimatedHeight>

        {!showForm && (
          <button onClick={() => setShowForm(true)} style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.48rem 0.9rem", borderRadius: "0.7rem", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", background: isDark ? "rgba(20,184,166,0.07)" : "rgba(20,184,166,0.05)", border: "1px dashed rgba(20,184,166,0.35)", color: "#14b8a6", transition: "all 0.18s ease" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(20,184,166,0.13)"} onMouseLeave={e => e.currentTarget.style.background = isDark ? "rgba(20,184,166,0.07)" : "rgba(20,184,166,0.05)"}>
            <Plus style={{ width: 12, height: 12 }} /> Add New Role
          </button>
        )}
      </div>
    </>
  );
}

// ─── ManageApiKeys ────────────────────────────────────────────────────────────
function ManageApiKeys({ isDark }: { isDark: boolean }) {
  const [keys,      setKeys]      = useState(INITIAL_KEYS);
  const [editing,   setEditing]   = useState<string | null>(null); // key id being edited
  const [editName,  setEditName]  = useState("");
  const [editKey,   setEditKey]   = useState("");
  const [showKey,   setShowKey]   = useState(false); // show/hide in edit form
  const [visible,   setVisible]   = useState<Record<string, boolean>>({}); 
  const [copied,    setCopied]    = useState<string | null>(null);
  const [modal,     setModal]     = useState<{ type: "rename" | "toggle" | "revoke"; id: string; active?: boolean; label?: string } | null>(null); // { type, id, ... }

  const mono = { fontFamily: "'DM Mono',monospace" };

  const copy = (id: string, val: string) => { navigator.clipboard.writeText(val); setCopied(id); setTimeout(() => setCopied(null), 2000); };

  const openEdit  = (k: typeof INITIAL_KEYS[0]) => { setEditing(k.id); setEditName(k.name); setEditKey(k.key); setShowKey(false); };
  const askSave   = ()  => { if (editName.trim() && editKey.trim()) setModal({ type: "rename", id: editing || "" }); };
  const askToggle = (k: typeof INITIAL_KEYS[0]) => setModal({ type: "toggle", id: k.id, active: k.active, label: k.name });
  const askRevoke = (k: typeof INITIAL_KEYS[0]) => setModal({ type: "revoke", id: k.id, label: k.name });

  const handleConfirm = () => {
    if (!modal) return;
    if (modal.type === "rename") {
      setKeys(ks => ks.map(k => k.id === modal.id ? { ...k, name: editName.trim(), key: editKey.trim() } : k));
      setEditing(null);
    } else if (modal.type === "toggle") {
      setKeys(ks => ks.map(k => k.id === modal.id ? { ...k, active: !k.active } : k));
    } else if (modal.type === "revoke") {
      setKeys(ks => ks.filter(k => k.id !== modal.id));
    }
    setModal(null);
  };

  const getModalProps = () => {
    if (!modal) return null;
    if (modal.type === "rename") return { title: "Save API key changes", message: `Name and/or key value will be updated. Make sure the new key is valid before saving.`, confirmLabel: "Save Changes", requireTyping: false };
    if (modal.type === "toggle") return { title: `${modal.active ? "Deactivate" : "Activate"} "${modal.label}"`, message: modal.active ? "This key will stop accepting requests immediately until re-activated." : "This key will start accepting requests again.", confirmLabel: modal.active ? "Deactivate Key" : "Activate Key", requireTyping: false };
    if (modal.type === "revoke") return { title: `Revoke "${modal.label}"`, message: "This key will be permanently deleted. Any service using it will immediately lose access.", confirmLabel: "Revoke Key", requireTyping: true };
    return null;
  };

  return (
    <>
      {modal && getModalProps() && <ConfirmModal isDark={isDark} {...getModalProps()!} onConfirm={handleConfirm} onCancel={() => setModal(null)} />}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {keys.length === 0 && <p style={{ ...mono, fontSize: "0.73rem", textAlign: "center", padding: "1.5rem 0", color: isDark ? "#334155" : "#cbd5e1" }}>All API keys have been revoked.</p>}

        {keys.map(k => (
          <div key={k.id} style={{ borderRadius: "0.85rem", padding: "0.85rem 1rem", background: isDark ? "rgba(30,41,59,0.48)" : "rgba(248,250,252,0.75)", border: isDark ? `1px solid ${k.active ? "rgba(20,184,166,0.18)" : "rgba(51,65,85,0.3)"}` : `1px solid ${k.active ? "rgba(20,184,166,0.22)" : "rgba(203,213,225,0.35)"}`, opacity: k.active ? 1 : 0.62, transition: "opacity 0.3s ease, border-color 0.3s ease", display: "flex", flexDirection: "column", gap: "0.65rem" }}>

            {/* ── Edit mode ── */}
            <AnimatedHeight open={editing === k.id}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {/* Name field */}
                <div>
                  <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", color: isDark ? "#475569" : "#94a3b8", margin: "0 0 0.25rem" }}>Display Name</p>
                  <input
                    autoFocus
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    onKeyDown={e => { if (e.key === "Escape") setEditing(null); }}
                    placeholder="Key display name"
                    style={{ width: "100%", padding: "0.42rem 0.65rem", borderRadius: "0.5rem", fontSize: "0.77rem", fontWeight: 600, outline: "none", background: isDark ? "rgba(15,23,42,0.65)" : "#fff", border: isDark ? "1px solid rgba(20,184,166,0.35)" : "1px solid rgba(20,184,166,0.3)", color: isDark ? "#f1f5f9" : "#0f172a", boxSizing: "border-box" }}
                  />
                </div>
                {/* Key value field */}
                <div>
                  <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", color: isDark ? "#475569" : "#94a3b8", margin: "0 0 0.25rem" }}>API Key Value</p>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      value={editKey}
                      onChange={e => setEditKey(e.target.value)}
                      type={showKey ? "text" : "password"}
                      placeholder="sk_live_..."
                      style={{ width: "100%", padding: "0.42rem 2.2rem 0.42rem 0.65rem", borderRadius: "0.5rem", fontSize: "0.73rem", outline: "none", background: isDark ? "rgba(15,23,42,0.65)" : "#fff", border: isDark ? "1px solid rgba(20,184,166,0.35)" : "1px solid rgba(20,184,166,0.3)", color: isDark ? "#f1f5f9" : "#0f172a", fontFamily: "'DM Mono',monospace", boxSizing: "border-box" }}
                    />
                    <button
                      onClick={() => setShowKey(v => !v)}
                      style={{ position: "absolute", right: "0.5rem", background: "none", border: "none", cursor: "pointer", padding: 2, color: isDark ? "#475569" : "#94a3b8", transition: "color 0.15s ease", display: "flex", alignItems: "center" }}
                      onMouseEnter={e => e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b"}
                      onMouseLeave={e => e.currentTarget.style.color = isDark ? "#475569" : "#94a3b8"}
                    >
                      {showKey ? <EyeOff style={{ width: 13, height: 13 }} /> : <Eye style={{ width: 13, height: 13 }} />}
                    </button>
                  </div>
                </div>
                {/* Actions */}
                <div style={{ display: "flex", gap: "0.45rem" }}>
                  <button
                    onClick={askSave}
                    style={{ padding: "0.38rem 0.85rem", borderRadius: "0.5rem", fontSize: "0.72rem", fontWeight: 600, cursor: (editName.trim() && editKey.trim()) ? "pointer" : "not-allowed", background: (editName.trim() && editKey.trim()) ? "rgba(20,184,166,0.11)" : isDark ? "rgba(51,65,85,0.3)" : "rgba(203,213,225,0.4)", border: `1px solid ${(editName.trim() && editKey.trim()) ? "rgba(20,184,166,0.35)" : "transparent"}`, color: (editName.trim() && editKey.trim()) ? "#14b8a6" : isDark ? "#475569" : "#94a3b8", transition: "all 0.18s ease" }}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    style={{ padding: "0.38rem 0.85rem", borderRadius: "0.5rem", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", background: isDark ? "rgba(51,65,85,0.4)" : "rgba(241,245,249,0.8)", border: isDark ? "1px solid rgba(51,65,85,0.3)" : "1px solid rgba(203,213,225,0.3)", color: isDark ? "#94a3b8" : "#64748b" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </AnimatedHeight>

            {/* ── View mode ── */}
            <AnimatedHeight open={editing !== k.id}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {/* Name row + actions */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.6rem" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: isDark ? "#e2e8f0" : "#1e293b" }}>{k.name}</span>
                      <span style={{ ...mono, fontSize: "0.6rem", padding: "0.12rem 0.45rem", borderRadius: "9999px", fontWeight: 600, background: k.active ? "rgba(20,184,166,0.1)" : "rgba(107,114,128,0.1)", color: k.active ? "#14b8a6" : "#6b7280", border: `1px solid ${k.active ? "rgba(20,184,166,0.2)" : "rgba(107,114,128,0.15)"}` }}>{k.active ? "active" : "inactive"}</span>
                    </div>
                    <p style={{ ...mono, fontSize: "0.62rem", marginTop: "0.18rem", color: isDark ? "#334155" : "#cbd5e1" }}>Created {k.created}</p>
                  </div>

                  <div style={{ display: "flex", gap: "0.35rem", flexShrink: 0 }}>
                    {[
                      { title: "Edit", icon: <svg style={{ width: 11, height: 11, color: isDark ? "#94a3b8" : "#64748b" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>, bg: isDark ? "rgba(51,65,85,0.4)" : "rgba(241,245,249,0.9)", brd: isDark ? "rgba(51,65,85,0.35)" : "rgba(203,213,225,0.4)", hbg: isDark ? "rgba(51,65,85,0.7)" : "rgba(226,232,240,0.9)", onClick: () => openEdit(k) },
                      { title: k.active ? "Deactivate" : "Activate", icon: k.active ? <EyeOff style={{ width: 11, height: 11, color: "#f87171" }} /> : <Eye style={{ width: 11, height: 11, color: "#14b8a6" }} />, bg: k.active ? "rgba(239,68,68,0.07)" : "rgba(20,184,166,0.07)", brd: k.active ? "rgba(239,68,68,0.2)" : "rgba(20,184,166,0.2)", hbg: k.active ? "rgba(239,68,68,0.16)" : "rgba(20,184,166,0.16)", onClick: () => askToggle(k) },
                      { title: "Revoke", icon: <Trash2 style={{ width: 11, height: 11, color: "#ef4444" }} />, bg: "rgba(239,68,68,0.07)", brd: "rgba(239,68,68,0.2)", hbg: "rgba(239,68,68,0.18)", onClick: () => askRevoke(k) },
                    ].map((btn, i) => (
                      <button key={i} onClick={btn.onClick} title={btn.title}
                        style={{ width: 27, height: 27, borderRadius: "0.48rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: btn.bg, border: `1px solid ${btn.brd}`, transition: "all 0.17s ease" }}
                        onMouseEnter={e => { e.currentTarget.style.background = btn.hbg; e.currentTarget.style.transform = "scale(1.12)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = btn.bg;  e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        {btn.icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key value display */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", borderRadius: "0.55rem", padding: "0.4rem 0.65rem", background: isDark ? "rgba(8,12,26,0.5)" : "rgba(241,245,249,0.75)", border: isDark ? "1px solid rgba(51,65,85,0.28)" : "1px solid rgba(203,213,225,0.3)" }}>
                  <code style={{ ...mono, flex: 1, fontSize: "0.7rem", color: isDark ? "#64748b" : "#94a3b8" }}>
                    {visible[k.id] ? k.key : k.key.slice(0, 11) + "•••••••••••"}
                  </code>
                  <button onClick={() => setVisible(v => ({ ...v, [k.id]: !v[k.id] }))} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: isDark ? "#334155" : "#cbd5e1", transition: "color 0.15s ease" }} onMouseEnter={e => e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b"} onMouseLeave={e => e.currentTarget.style.color = isDark ? "#334155" : "#cbd5e1"}>
                    {visible[k.id] ? <EyeOff style={{ width: 12, height: 12 }} /> : <Eye style={{ width: 12, height: 12 }} />}
                  </button>
                  <button onClick={() => copy(k.id, k.key)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: copied === k.id ? "#14b8a6" : isDark ? "#334155" : "#cbd5e1", transition: "color 0.15s ease" }}>
                    {copied === k.id ? <Check style={{ width: 12, height: 12 }} /> : <Copy style={{ width: 12, height: 12 }} />}
                  </button>
                </div>
              </div>
            </AnimatedHeight>

          </div>
        ))}
      </div>
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function DangerZone() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchCollections(),
          fetchRoles(),
          fetchApiKeys(),
          fetchAnalyticsMetadata(),
        ]);
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    };
    loadData();
  }, []);
  
  const bg = isDark
    ? "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0c1525 100%)"
    : "linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f5f0ff 100%)";

  return (
    <div style={{ minHeight: "100vh", padding: "4.5rem 1rem 2.5rem", fontFamily: "'DM Sans',sans-serif", background: bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseRed { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.3)} 50%{box-shadow:0 0 0 6px rgba(239,68,68,0)} }
        .afu  { animation: fadeUp 0.48s ease both; }
        .pulse{ animation: pulseRed 2.4s ease infinite; }
        .d1{animation-delay:.06s} .d2{animation-delay:.14s} .d3{animation-delay:.22s} .d4{animation-delay:.30s} .d5{animation-delay:.38s}
      `}</style>

      <div style={{ maxWidth: 660, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.15rem" }}>

        {/* Header with back button and theme toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mt-10 mb-4 transition-colors"
           >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
           </button>
        </div>

        <div className="afu d1" style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <div className="pulse" style={{ width: 46, height: 46, borderRadius: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", flexShrink: 0 }}>
            <AlertTriangle style={{ width: 21, height: 21, color: "#ef4444" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.65rem", fontWeight: 800, letterSpacing: "-0.025em", color: isDark ? "#f8fafc" : "#0f172a", margin: 0 }}>Danger Zone</h1>
            <p style={{ fontSize: ".9rem", color: isDark ? "#475569" : "#94a3b8", margin: 0 }}>Critical administrative actions — every change requires confirmation</p>
          </div>
        </div>

        <div className="afu d2" style={{ borderRadius: "0.95rem", padding: "0.8rem 1rem", display: "flex", alignItems: "flex-start", gap: "0.55rem", background: isDark ? "rgba(239,68,68,0.055)" : "rgba(254,242,242,0.85)", border: isDark ? "1px solid rgba(239,68,68,0.16)" : "1px solid rgba(254,202,202,0.65)" }}>
          <AlertTriangle style={{ width: 13, height: 13, color: "#ef4444", flexShrink: 0, marginTop: "0.15rem" }} />
          <p style={{ fontSize: "0.85rem", lineHeight: 1.6, margin: 0, color: isDark ? "rgba(252,165,165,0.75)" : "#b91c1c" }}>
            All actions in this section are <strong>irreversible</strong>. A confirmation dialog is shown before every change is applied — read it carefully before proceeding.
          </p>
        </div>

        <div className="afu d3" style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <SectionCard icon={Trash2}     accentColor="#ef4444" title="Database Collections & Backup" subtitle="Permanently remove a collection or create a backup for the DB"  isDark={isDark}><DeleteCollections isDark={isDark} /></SectionCard>
          <SectionCard icon={RefreshCw}  accentColor="#f97316" title="Reset Sessions & Analytics"             subtitle="Wipe all historical analytics data & user sessions from the DB."      isDark={isDark}><ResetAnalytics    isDark={isDark} /></SectionCard>
          <div style={{ opacity: 0.5, pointerEvents: "none" }}>
            <SectionCard icon={ShieldPlus} accentColor="#8b5cf6" title="Manage Roles"                subtitle="Create or remove permission roles system-wide"         isDark={isDark}><ManageRoles       isDark={isDark} /></SectionCard>
          </div>
          <div style={{ opacity: 0.5, pointerEvents: "none" }}>
            <SectionCard icon={Key}        accentColor="#eab308" title="API Key Management"          subtitle="Edit, toggle, or permanently revoke API keys"           isDark={isDark}><ManageApiKeys     isDark={isDark} /></SectionCard>
          </div>
        </div>

        <p className="afu d5" style={{ textAlign: "center", fontSize: "0.6rem", fontFamily: "'DM Mono',monospace", color: isDark ? "#1e293b" : "#e2e8f0", paddingBottom: "2rem" }}>
          All administrative actions are logged and audited in real-time.
        </p>
      </div>
    </div>
  );
}