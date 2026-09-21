import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  Wrench,
  Car,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Plus,
  Search,
  Filter,
  Edit3,
  Lock,
  Unlock,
  Settings,
  MessageSquare,
  BarChart3,
  Phone,
  Eye,
  Trash2,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Check,
  X,
  FileText,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { SHOP } from "@/components/home/shop";
import { SERVICES, type ServiceItem } from "@/components/home/servicesData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const TITLE = `Admin Dashboard — ${SHOP?.legalName || "Norwood Gulf"}`;
const DESCRIPTION = `Operational management portal for Norwood Gulf — Appointments, Repair Tickets, Services, and Shop Settings.`;

export const Route = createFileRoute("/_layout/admin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: AdminPage,
});

// Mock Initial Data Types
export type AppointmentStatus = "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  vehicle: string; // e.g. "2021 Ford F-150"
  service: string;
  preferredDate: string;
  preferredTime: string;
  status: AppointmentStatus;
  notes: string;
  createdAt: string;
}

export interface RepairOrder {
  id: string;
  ticketNo: string;
  customerName: string;
  phone: string;
  vehicle: string;
  service: string;
  stage: "Inspection" | "Estimate Approved" | "Parts Ordered" | "In Repair" | "Final QC" | "Ready";
  insuranceClaim?: string;
  assignedTech: string;
  loanerAssigned?: string;
  estimatedCost: number;
  startDate: string;
}

export interface LoanerCar {
  id: string;
  model: string;
  licensePlate: string;
  status: "Available" | "Assigned" | "Maintenance";
  assignedTo?: string | undefined;
  returnDate?: string | undefined;
}

// Initial Mock Data
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-101",
    customerName: "Mark Harrison",
    phone: "(781) 555-0192",
    email: "mark.harrison@gmail.com",
    vehicle: "2021 Ford F-150 SuperCrew",
    service: "Body Damage & Cosmetic Repair",
    preferredDate: "Today",
    preferredTime: "9:00 AM",
    status: "In Progress",
    notes: "Rear bumper damage from low speed parking incident. Coordinating with Progressive.",
    createdAt: "2026-08-18",
  },
  {
    id: "apt-102",
    customerName: "Sarah Miller",
    phone: "(617) 555-3841",
    email: "smiller@example.com",
    vehicle: "2019 Toyota RAV4 Hybrid",
    service: "Auto Repair & Diagnostics",
    preferredDate: "Today",
    preferredTime: "11:30 AM",
    status: "Confirmed",
    notes: "Check engine light illuminated after highway commute. Squeaking brake noise when stopping.",
    createdAt: "2026-08-18",
  },
  {
    id: "apt-103",
    customerName: "Robert Driscoll",
    phone: "(781) 555-8820",
    email: "rdriscoll@verizon.net",
    vehicle: "1968 Chevrolet Camaro SS",
    service: "Auto Repair & Diagnostics",
    preferredDate: "Tomorrow",
    preferredTime: "10:00 AM",
    status: "Pending",
    notes: "Full engine tune-up and carburetor calibration consultation.",
    createdAt: "2026-08-19",
  },
  {
    id: "apt-104",
    customerName: "Elena Rostova",
    phone: "(339) 555-4019",
    email: "elena.r@outlook.com",
    vehicle: "2022 Honda CR-V",
    service: "Brakes, Steering & Suspension",
    preferredDate: "Tomorrow",
    preferredTime: "2:00 PM",
    status: "Pending",
    notes: "Front brake pad replacement & rotor resurfacing.",
    createdAt: "2026-08-19",
  },
  {
    id: "apt-105",
    customerName: "James O'Connor",
    phone: "(781) 555-9112",
    email: "joconnor@bostonlaw.com",
    vehicle: "2020 Subaru Outback",
    service: "Massachusetts State Inspection",
    preferredDate: "Friday",
    preferredTime: "8:30 AM",
    status: "Confirmed",
    notes: "Annual MA state inspection & oil change.",
    createdAt: "2026-08-17",
  },
  {
    id: "apt-106",
    customerName: "Patricia Walsh",
    phone: "(617) 555-7230",
    email: "pwalsh89@yahoo.com",
    vehicle: "2018 Jeep Grand Cherokee",
    service: "Oil Change & General Maintenance",
    preferredDate: "2026-08-21",
    preferredTime: "1:00 PM",
    status: "Completed",
    notes: "Synthetic oil change and tire rotation.",
    createdAt: "2026-08-16",
  },
];

const INITIAL_REPAIR_ORDERS: RepairOrder[] = [
  {
    id: "ro-501",
    ticketNo: "RO-2026-088",
    customerName: "Mark Harrison",
    phone: "(781) 555-0192",
    vehicle: "2021 Ford F-150",
    service: "Body Damage & Cosmetic Repair",
    stage: "In Repair",
    insuranceClaim: "Progressive #PRG-994821",
    assignedTech: "William Ajjouri",
    loanerAssigned: "2022 Honda Civic (Loaner #1)",
    estimatedCost: 3250,
    startDate: "2026-08-18",
  },
  {
    id: "ro-502",
    ticketNo: "RO-2026-089",
    customerName: "David K.",
    phone: "(781) 555-4310",
    vehicle: "2022 Audi Q5",
    service: "Body Damage & Cosmetic Repair",
    stage: "Parts Ordered",
    insuranceClaim: "Geico #GC-88301",
    assignedTech: "William Ajjouri",
    loanerAssigned: "2021 Toyota RAV4 (Loaner #2)",
    estimatedCost: 4800,
    startDate: "2026-08-17",
  },
  {
    id: "ro-503",
    ticketNo: "RO-2026-090",
    customerName: "Sarah Miller",
    phone: "(617) 555-3841",
    vehicle: "2019 Toyota RAV4",
    service: "Auto Repair & Diagnostics",
    stage: "Inspection",
    assignedTech: "Sam T.",
    estimatedCost: 450,
    startDate: "2026-08-19",
  },
  {
    id: "ro-504",
    ticketNo: "RO-2026-091",
    customerName: "Linda Peters",
    phone: "(781) 555-1109",
    vehicle: "2020 BMW X3",
    service: "Brakes, Steering & Suspension",
    stage: "Ready",
    assignedTech: "Ray M.",
    loanerAssigned: "2022 Nissan Altima (Loaner #4)",
    estimatedCost: 890,
    startDate: "2026-08-18",
  },
];

const INITIAL_LOANER_CARS: LoanerCar[] = [
  { id: "loaner-1", model: "2022 Honda Civic Sedan", licensePlate: "MA 883-CA", status: "Assigned", assignedTo: "Mark Harrison", returnDate: "Tomorrow 4 PM" },
  { id: "loaner-2", model: "2021 Toyota RAV4 AWD", licensePlate: "MA 912-CA", status: "Assigned", assignedTo: "David K.", returnDate: "Friday 2 PM" },
  { id: "loaner-3", model: "2023 Subaru Outback", licensePlate: "MA 402-CA", status: "Available" },
  { id: "loaner-4", model: "2022 Nissan Altima", licensePlate: "MA 771-CA", status: "Assigned", assignedTo: "Linda Peters", returnDate: "Today 5 PM" },
];

const WEEKLY_REVENUE_DATA = [
  { day: "Mon", revenue: 2400, jobs: 8 },
  { day: "Tue", revenue: 3100, jobs: 10 },
  { day: "Wed", revenue: 2850, jobs: 9 },
  { day: "Thu", revenue: 3600, jobs: 12 },
  { day: "Fri", revenue: 4100, jobs: 14 },
  { day: "Sat", revenue: 2200, jobs: 7 },
];

const SERVICE_PIE_DATA = [
  { name: "Body Damage & Cosmetic Repair", value: 45, color: "var(--primary)" },
  { name: "General Diagnostics", value: 20, color: "#3b82f6" },
  { name: "Brakes, Steering & Suspension", value: 15, color: "#10b981" },
  { name: "Oil & Maintenance", value: 12, color: "#f59e0b" },
];

function AdminPage() {
  // Authentication & Security State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Persistent State Keyed in LocalStorage / Session
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("norwood_admin_appointments");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  const [repairOrders, setRepairOrders] = useState<RepairOrder[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("norwood_admin_repair_orders");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_REPAIR_ORDERS;
  });

  const [loaners, setLoaners] = useState<LoanerCar[]>(INITIAL_LOANER_CARS);

  // Shop Banner & Site Settings State
  const [shopStatusText, setShopStatusText] = useState("Open — Accepting Drop-offs");
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerText, setBannerText] = useState("⚡ Special Offer: Free Battery & Charging System Test with any Brake Service this month!");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Modals & Editors State
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [isAptModalOpen, setIsAptModalOpen] = useState(false);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  
  // New Booking Form State
  const [newBookingName, setNewBookingName] = useState("");
  const [newBookingPhone, setNewBookingPhone] = useState("");
  const [newBookingVehicle, setNewBookingVehicle] = useState("");
  const [newBookingService, setNewBookingService] = useState("Auto Repair & Diagnostics");
  const [newBookingDate, setNewBookingDate] = useState("Today");
  const [newBookingTime, setNewBookingTime] = useState("2:00 PM");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("norwood_admin_appointments", JSON.stringify(appointments));
    }
  }, [appointments]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("norwood_admin_repair_orders", JSON.stringify(repairOrders));
    }
  }, [repairOrders]);

  // Handle PIN unlock
  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput === "1993" || pinInput === "0000" || pinInput === "admin") {
      setIsUnlocked(true);
      setPinError(false);
      toast.success("Admin Portal unlocked. Welcome, William!");
    } else {
      setPinError(true);
      toast.error("Incorrect PIN code. Try '1993' or click Quick Demo Access.");
    }
  };

  const handleQuickDemoUnlock = () => {
    setPinInput("1993");
    setIsUnlocked(true);
    toast.success("Welcome to Norwood Gulf Admin Portal (Demo Mode)");
  };

  // Appointment Status Update Handler
  const handleUpdateAppointmentStatus = (id: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
    toast.success(`Appointment #${id} status updated to ${newStatus}`);
    if (selectedApt && selectedApt.id === id) {
      setSelectedApt((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // New Booking Submission
  const handleCreateNewBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookingName || !newBookingPhone || !newBookingVehicle) {
      toast.error("Please fill out customer name, phone, and vehicle information.");
      return;
    }

    const newApt: Appointment = {
      id: `apt-${Date.now().toString().slice(-4)}`,
      customerName: newBookingName,
      phone: newBookingPhone,
      email: `${newBookingName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      vehicle: newBookingVehicle,
      service: newBookingService,
      preferredDate: newBookingDate,
      preferredTime: newBookingTime,
      status: "Confirmed",
      notes: "Recorded directly by shop admin.",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setAppointments([newApt, ...appointments]);
    setIsNewBookingModalOpen(false);
    toast.success(`Appointment created for ${newBookingName}!`);
    // Reset form
    setNewBookingName("");
    setNewBookingPhone("");
    setNewBookingVehicle("");
  };

  // Filter Appointments by search query & status
  const filteredAppointments = appointments.filter((apt) => {
    const q = searchQuery.toLowerCase();
    return (
      apt.customerName.toLowerCase().includes(q) ||
      apt.vehicle.toLowerCase().includes(q) ||
      apt.phone.includes(q) ||
      apt.service.toLowerCase().includes(q)
    );
  });

  // Filter Repair Orders
  const filteredRepairOrders = repairOrders.filter((ro) => {
    const q = searchQuery.toLowerCase();
    return (
      ro.customerName.toLowerCase().includes(q) ||
      ro.vehicle.toLowerCase().includes(q) ||
      ro.ticketNo.toLowerCase().includes(q) ||
      ro.service.toLowerCase().includes(q)
    );
  });

  // If locked, render PIN screen
  if (!isUnlocked) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 pt-32 pb-16 bg-muted/20">
        <Card className="w-full max-w-md border-border shadow-xl backdrop-blur-md">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient text-primary-foreground shadow-md">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <CardTitle className="font-display text-2xl font-extrabold text-foreground">
              Admin Portal Security
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              Enter shop manager PIN code to access operations portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pin" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Manager Security PIN (Default: 1993)
                </Label>
                <div className="relative">
                  <Input
                    id="pin"
                    type="password"
                    maxLength={6}
                    placeholder="••••"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className={`text-center text-xl tracking-[0.5em] font-mono py-6 ${
                      pinError ? "border-destructive focus-visible:ring-destructive" : ""
                    }`}
                  />
                  <Lock className="absolute right-3.5 top-3.5 h-5 w-5 text-muted-foreground/50" />
                </div>
                {pinError && (
                  <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3.5 w-3.5" /> Incorrect PIN. Enter 1993 or click below.
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full brand-gradient py-5 font-bold uppercase tracking-wider text-sm shadow-md">
                <Unlock className="mr-2 h-4 w-4" /> Unlock Admin Dashboard
              </Button>
            </form>

            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative px-3 bg-card text-xs text-muted-foreground uppercase font-semibold">
                Or Quick Access
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleQuickDemoUnlock}
              className="w-full border-border text-foreground hover:bg-accent font-semibold text-xs py-4 flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Bypass Security (Quick Demo Access)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 sm:pt-32 lg:pt-36">
      {/* Top Banner Alert if active */}
      {bannerActive && (
        <div className="bg-primary/10 border-b border-primary/20 text-primary px-4 py-2 text-xs sm:text-sm font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>{bannerText}</span>
          </div>
          <button
            onClick={() => setBannerActive(false)}
            aria-label="Dismiss banner preview"
            className="text-primary hover:opacity-70 text-xs shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Admin Portal Header Bar */}
      <div className="border-b border-border bg-card/90 backdrop-blur-md sticky top-16 sm:top-20 lg:top-24 z-30 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl brand-gradient flex items-center justify-center text-primary-foreground shadow">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Shop Control Center
                </h1>
                <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 text-xs font-bold">
                  Manager Mode
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                <span>Manager: <strong className="text-foreground">{SHOP.ownerName}</strong></span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {shopStatusText}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] sm:min-w-[260px] flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name, phone, VIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-background"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Button
              onClick={() => setIsNewBookingModalOpen(true)}
              className="brand-gradient h-9 text-xs font-bold uppercase tracking-wider text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-1.5" /> New Appointment
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsUnlocked(false);
                toast.info("Logged out of Admin Portal.");
              }}
              title="Lock Admin Portal"
              className="h-9 w-9 border border-border text-muted-foreground hover:text-foreground"
            >
              <Lock className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 w-full h-auto p-1 bg-muted/60 rounded-xl gap-1">
            <TabsTrigger value="overview" className="text-xs font-bold py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" /> Overview
            </TabsTrigger>
            <TabsTrigger value="appointments" className="text-xs font-bold py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <CalendarDays className="h-3.5 w-3.5 mr-1.5" /> Bookings ({appointments.length})
            </TabsTrigger>
            <TabsTrigger value="workorders" className="text-xs font-bold py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Wrench className="h-3.5 w-3.5 mr-1.5" /> Bay Work ({repairOrders.length})
            </TabsTrigger>
            <TabsTrigger value="loaners" className="text-xs font-bold py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Car className="h-3.5 w-3.5 mr-1.5" /> Loaners ({loaners.filter(l => l.status === "Assigned").length}/4)
            </TabsTrigger>
            <TabsTrigger value="services" className="text-xs font-bold py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FileText className="h-3.5 w-3.5 mr-1.5" /> Service Rates
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs font-bold py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Settings className="h-3.5 w-3.5 mr-1.5" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: OVERVIEW & ANALYTICS */}
          <TabsContent value="overview" className="space-y-6">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-border shadow-sm">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Today's Bookings</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display text-3xl font-extrabold text-foreground">
                        {appointments.filter(a => a.preferredDate === "Today").length || 6}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        +15% vs yesterday
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {appointments.filter(a => a.status === "Pending").length} pending confirmation
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Bay Repairs</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display text-3xl font-extrabold text-foreground">
                        {repairOrders.length}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">8/10 Bays Occupied</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {repairOrders.filter(r => r.stage === "In Repair").length} currently in teardown/paint
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Wrench className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Free Loaner Fleet</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display text-3xl font-extrabold text-foreground">
                        3 <span className="text-sm font-semibold text-muted-foreground">/ 4 Out</span>
                      </span>
                      <Badge variant="outline" className="text-xs font-semibold text-emerald-600 border-emerald-500/30">
                        1 Ready
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 loaner scheduled to return today
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Car className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Weekly Est. Revenue</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-display text-3xl font-extrabold text-foreground">$18,250</span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        +12.4%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Collision & diagnostic lead volume
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visual Recharts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Weekly Volume Chart */}
              <Card className="lg:col-span-2 border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="font-display text-lg font-bold flex items-center justify-between">
                    <span>Weekly Service Revenue & Job Count</span>
                    <Badge variant="secondary" className="text-xs font-normal">Mon – Sat</Badge>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Revenue performance and completed repair count by day of week.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={WEEKLY_REVENUE_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="currentColor" className="text-xs text-muted-foreground" />
                        <YAxis stroke="currentColor" className="text-xs text-muted-foreground" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--background)",
                            borderColor: "var(--border)",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" name="Revenue ($)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Service Breakdown Donut */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="font-display text-lg font-bold">Service Share</CardTitle>
                  <CardDescription className="text-xs">Distribution of revenue by service line</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={SERVICE_PIE_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {SERVICE_PIE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-1.5 text-xs">
                    {SERVICE_PIE_DATA.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="truncate">{item.name}</span>
                        </span>
                        <span className="font-semibold text-foreground">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Live Feed & Action Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-base font-bold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> Live Shop Activity Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-muted/40 flex items-start gap-3 border border-border/50">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">Insurance Estimate Approved</p>
                      <p className="text-muted-foreground">Geico Claim #GC-88301 approved for David K.'s 2022 Audi Q5 ($4,800).</p>
                      <span className="text-[10px] text-muted-foreground/80 mt-1 block">12 minutes ago</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/40 flex items-start gap-3 border border-border/50">
                    <CalendarDays className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">New Online Callback Booking</p>
                      <p className="text-muted-foreground">Robert Driscoll submitted booking for 1968 Chevrolet Camaro SS.</p>
                      <span className="text-[10px] text-muted-foreground/80 mt-1 block">45 minutes ago</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/40 flex items-start gap-3 border border-border/50">
                    <Car className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">Loaner Car Dispatched</p>
                      <p className="text-muted-foreground">Loaner #1 (2022 Honda Civic) assigned to Mark Harrison during collision repair.</p>
                      <span className="text-[10px] text-muted-foreground/80 mt-1 block">2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-base font-bold flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" /> Operational Guarantees Check
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <span className="font-medium text-foreground">Written Estimates Before Work Starts</span>
                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border-0">
                      Enforced 100%
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <span className="font-medium text-foreground">Free Loaner Car Fleet Readiness</span>
                    <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border-0">
                      1 Ready / 3 Out
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <span className="font-medium text-foreground">MA Inspection Station Status</span>
                    <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border-0">
                      Licensed & Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 2: APPOINTMENTS & BOOKINGS */}
          <TabsContent value="appointments" className="space-y-4">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="font-display text-lg font-bold">Appointment Requests & Callbacks</CardTitle>
                  <CardDescription className="text-xs">
                    Manage online appointments, callback requests, and walk-in scheduling.
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setIsNewBookingModalOpen(true)}
                  className="brand-gradient text-xs font-bold uppercase tracking-wider"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Appointment
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground uppercase text-[10px] font-bold tracking-wider bg-muted/30">
                        <th className="p-3">Customer Info</th>
                        <th className="p-3">Vehicle</th>
                        <th className="p-3">Requested Service</th>
                        <th className="p-3">Preferred Time</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-muted-foreground">
                            No appointments found matching "{searchQuery}".
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((apt) => (
                          <tr key={apt.id} className="hover:bg-muted/30 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-foreground">{apt.customerName}</div>
                              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                <Phone className="h-3 w-3" /> {apt.phone}
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="font-semibold text-foreground">{apt.vehicle}</span>
                            </td>
                            <td className="p-3">
                              <span className="inline-block max-w-[180px] truncate text-muted-foreground font-medium">
                                {apt.service}
                              </span>
                            </td>
                            <td className="p-3 font-medium">
                              <div>{apt.preferredDate}</div>
                              <div className="text-[11px] text-muted-foreground">{apt.preferredTime}</div>
                            </td>
                            <td className="p-3">
                              <Badge
                                variant="outline"
                                className={`text-[10px] font-bold uppercase tracking-wider ${
                                  apt.status === "Confirmed"
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                                    : apt.status === "Pending"
                                    ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                                    : apt.status === "In Progress"
                                    ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
                                    : apt.status === "Completed"
                                    ? "bg-slate-500/10 text-slate-600 border-slate-500/30"
                                    : "bg-destructive/10 text-destructive border-destructive/30"
                                }`}
                              >
                                {apt.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedApt(apt);
                                    setIsAptModalOpen(true);
                                  }}
                                  className="h-7 px-2 text-xs font-semibold"
                                >
                                  <Eye className="h-3.5 w-3.5 mr-1" /> View
                                </Button>
                                {apt.status === "Pending" && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleUpdateAppointmentStatus(apt.id, "Confirmed")}
                                    className="h-7 px-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                                  >
                                    Confirm
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: REPAIR WORK ORDERS */}
          <TabsContent value="workorders" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold">Active Repair Work Orders</h2>
                <p className="text-xs text-muted-foreground">Track garage bay vehicles from inspection to final pickup.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRepairOrders.map((ro) => (
                <Card key={ro.id} className="border-border shadow-sm hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3 border-b border-border/60">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono text-[10px] font-bold">
                        {ro.ticketNo}
                      </Badge>
                      <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold">
                        {ro.stage}
                      </Badge>
                    </div>
                    <CardTitle className="font-display text-base font-bold mt-2">
                      {ro.vehicle}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Customer: <strong>{ro.customerName}</strong> ({ro.phone})
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3 text-xs">
                    <div className="space-y-1">
                      <span className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider">Service</span>
                      <p className="font-semibold text-foreground">{ro.service}</p>
                    </div>

                    {ro.insuranceClaim && (
                      <div className="p-2 rounded bg-muted/50 border border-border text-[11px]">
                        <span className="text-muted-foreground font-semibold">Insurance:</span>{" "}
                        <span className="font-bold text-foreground">{ro.insuranceClaim}</span>
                      </div>
                    )}

                    {ro.loanerAssigned && (
                      <div className="p-2 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1.5">
                        <Car className="h-3.5 w-3.5 shrink-0" />
                        <span>Loaner: {ro.loanerAssigned}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                      <span className="text-muted-foreground">Tech: <strong className="text-foreground">{ro.assignedTech}</strong></span>
                      <span className="font-display font-extrabold text-foreground">${ro.estimatedCost.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 4: LOANER FLEET MANAGEMENT */}
          <TabsContent value="loaners" className="space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-lg font-bold flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" /> Free Courtesy Loaner Vehicle Fleet
                </CardTitle>
                <CardDescription className="text-xs">
                  The shop provides free courtesy loaner vehicles during major repairs. Track availability and returns below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {loaners.map((car) => (
                    <div
                      key={car.id}
                      className={`p-4 rounded-xl border transition-all ${
                        car.status === "Assigned"
                          ? "border-amber-500/30 bg-amber-500/5"
                          : "border-emerald-500/30 bg-emerald-500/5"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge
                            className={
                              car.status === "Assigned"
                                ? "bg-amber-500 text-white font-bold text-[10px]"
                                : "bg-emerald-600 text-white font-bold text-[10px]"
                            }
                          >
                            {car.status}
                          </Badge>
                          <h3 className="font-display font-bold text-base mt-2 text-foreground">{car.model}</h3>
                          <p className="text-xs font-mono text-muted-foreground">{car.licensePlate}</p>
                        </div>
                        <Car className="h-8 w-8 text-muted-foreground/30" />
                      </div>

                      {car.status === "Assigned" ? (
                        <div className="mt-4 pt-3 border-t border-border/50 text-xs space-y-1">
                          <p className="text-muted-foreground">Assigned to: <strong className="text-foreground">{car.assignedTo}</strong></p>
                          <p className="text-muted-foreground">Expected Return: <strong className="text-foreground">{car.returnDate}</strong></p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setLoaners((prev) =>
                                prev.map((l) => (l.id === car.id ? { ...l, status: "Available", assignedTo: undefined, returnDate: undefined } : l))
                              );
                              toast.success(`${car.model} marked as returned to lot!`);
                            }}
                            className="mt-2 text-xs h-7 w-full border-border font-semibold"
                          >
                            Mark Returned to Lot
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-4 pt-3 border-t border-border/50 text-xs">
                          <p className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <Check className="h-3.5 w-3.5" /> Ready for next customer drop-off
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5: SERVICES & RATES */}
          <TabsContent value="services" className="space-y-4">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-lg font-bold">Service Catalog & Rate Card</CardTitle>
                <CardDescription className="text-xs">
                  Manage services displayed on the public site and set starting price guidelines.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border">
                  {SERVICES.map((srv) => (
                    <div key={srv.slug} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                          <srv.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-foreground">{srv.title}</h3>
                          <p className="text-xs text-muted-foreground max-w-lg mt-0.5">{srv.text}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {srv.highlights.slice(0, 3).map((h, i) => (
                              <Badge key={i} variant="secondary" className="text-[10px]">
                                {h}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <Badge variant="outline" className="font-semibold text-xs py-1 px-3">
                          Written Estimate
                        </Badge>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 6: SHOP & SITE SETTINGS */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-lg font-bold">Shop Information & Hours</CardTitle>
                <CardDescription className="text-xs">Update posted operating hours and shop contact numbers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Shop Name</Label>
                    <Input defaultValue={SHOP.legalName} className="text-xs" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Primary Phone</Label>
                    <Input defaultValue={SHOP.phoneDisplay} className="text-xs" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-xs font-semibold">Physical Address</Label>
                    <Input defaultValue={SHOP.address} className="text-xs" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-4">
                  <h4 className="font-bold text-sm text-foreground">Homepage Announcement Banner</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-foreground">Show Banner Special</p>
                      <p className="text-[11px] text-muted-foreground">Display promotional notice at top of page.</p>
                    </div>
                    <Switch checked={bannerActive} onCheckedChange={setBannerActive} />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Banner Message</Label>
                    <Input
                      value={bannerText}
                      onChange={(e) => setBannerText(e.target.value)}
                      className="text-xs"
                    />
                  </div>

                  <Button
                    onClick={() => toast.success("Shop settings and banner updated successfully!")}
                    className="brand-gradient font-bold uppercase tracking-wider text-xs"
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* VIEW APPOINTMENT DETAILS DIALOG */}
      <Dialog open={isAptModalOpen} onOpenChange={setIsAptModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg">
              Appointment Details
            </DialogTitle>
            <DialogDescription className="text-xs">
              Ref #{selectedApt?.id} — Submitted on {selectedApt?.createdAt}
            </DialogDescription>
          </DialogHeader>

          {selectedApt && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-lg bg-muted/40 border border-border space-y-1">
                <p className="font-bold text-foreground text-sm">{selectedApt.customerName}</p>
                <p className="text-muted-foreground">{selectedApt.phone} • {selectedApt.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg border border-border">
                  <span className="text-muted-foreground uppercase text-[10px] font-bold block">Vehicle</span>
                  <span className="font-bold text-foreground mt-0.5 block">{selectedApt.vehicle}</span>
                </div>

                <div className="p-2.5 rounded-lg border border-border">
                  <span className="text-muted-foreground uppercase text-[10px] font-bold block">Preferred Time</span>
                  <span className="font-bold text-foreground mt-0.5 block">{selectedApt.preferredDate} at {selectedApt.preferredTime}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-border space-y-1">
                <span className="text-muted-foreground uppercase text-[10px] font-bold block">Service Requested</span>
                <span className="font-bold text-primary text-sm block">{selectedApt.service}</span>
              </div>

              {selectedApt.notes && (
                <div className="p-3 rounded-lg bg-muted/30 border border-border/60">
                  <span className="text-muted-foreground uppercase text-[10px] font-bold block mb-1">Customer Issue Notes</span>
                  <p className="text-foreground italic">{selectedApt.notes}</p>
                </div>
              )}

              <div className="pt-2">
                <Label className="text-xs font-semibold block mb-2">Update Appointment Status</Label>
                <div className="flex flex-wrap gap-2">
                  {(["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"] as AppointmentStatus[]).map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedApt.status === status ? "default" : "outline"}
                      onClick={() => handleUpdateAppointmentStatus(selectedApt.id, status)}
                      className={`text-xs h-7 ${selectedApt.status === status ? "brand-gradient font-bold" : ""}`}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAptModalOpen(false)} className="text-xs h-8">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NEW APPOINTMENT MODAL */}
      <Dialog open={isNewBookingModalOpen} onOpenChange={setIsNewBookingModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg">Record New Booking</DialogTitle>
            <DialogDescription className="text-xs">
              Directly schedule an appointment or walk-in service request.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateNewBooking} className="space-y-4 py-2 text-xs">
            <div className="space-y-1.5">
              <Label className="font-semibold">Customer Full Name *</Label>
              <Input
                required
                placeholder="e.g. John Smith"
                value={newBookingName}
                onChange={(e) => setNewBookingName(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="font-semibold">Phone Number *</Label>
                <Input
                  required
                  placeholder="(781) 555-0199"
                  value={newBookingPhone}
                  onChange={(e) => setNewBookingPhone(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="font-semibold">Vehicle (Yr Make Model) *</Label>
                <Input
                  required
                  placeholder="2020 Honda Civic"
                  value={newBookingVehicle}
                  onChange={(e) => setNewBookingVehicle(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="font-semibold">Service Type</Label>
              <select
                value={newBookingService}
                onChange={(e) => setNewBookingService(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="font-semibold">Date</Label>
                <Input
                  value={newBookingDate}
                  onChange={(e) => setNewBookingDate(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="font-semibold">Time Slot</Label>
                <Input
                  value={newBookingTime}
                  onChange={(e) => setNewBookingTime(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsNewBookingModalOpen(false)} className="text-xs h-9">
                Cancel
              </Button>
              <Button type="submit" className="brand-gradient font-bold uppercase text-xs h-9">
                Create Appointment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
