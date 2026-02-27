// System Metrics Types
export interface CPUMetrics {
  usagePercent: number;
}

export interface MemoryMetrics {
  totalMb: number;
  usedMb: number;
  usagePercent: number;
}

export interface DiskMetrics {
  usedPercent: number;
  freeGb: number;
}

export interface NetworkMetrics {
  defaultNetwork: string;
  latencyMs: number;
  totalRxMb: number;
  totalTxMb: number;
  downloadMbps: number;
  uploadMbps: number;
}

export interface SystemMetricsResponse {
  cpu: CPUMetrics;
  memory: MemoryMetrics;
  disk: DiskMetrics;
  network: NetworkMetrics;
  uptime: number;
}

// Suspicious Activity Metrics Types
export interface SuspiciousActivityNetworkMetrics {
  currentRxMb: number;
  currentTxMb: number;
}

export interface SuspiciousActivityMetricsResponse {
  network: SuspiciousActivityNetworkMetrics;
}

// Frontend Metrics Types
export interface FrontendMetricsResponse {
  status: 'up' | 'down';
  statusCode: number;
  latencyMs: number;
}

// Database Metrics Types
export interface DBMetricsResponse {
  status: 'up' | 'down';
  latencyMs: number;
  ping: Record<string, Number>;
}

// IP Record Types
export interface IPRecord {
  ip: string;
  location: string | null;
  isp: string | null;
}

export interface IPEntry {
  IPrecord: IPRecord;
  users: number;
}

// Visitor Stats Types
export interface VisitorStatsData {
  totalVisitors: number;
  dailyVisitors: number;
}

export interface VisitorsMetricsResponse {
  VisitorStats: VisitorStatsData;
  weeklyDailyVisitorsSum: number;
  ipsList: IPEntry[];
}

// Combined Health Metrics Response (if all endpoints are called together)
export interface AllHealthMetrics {
  systemMetrics: SystemMetricsResponse;
  suspiciousActivity: SuspiciousActivityMetricsResponse;
  frontend: FrontendMetricsResponse;
  database: DBMetricsResponse;
  visitors: VisitorsMetricsResponse;
}
