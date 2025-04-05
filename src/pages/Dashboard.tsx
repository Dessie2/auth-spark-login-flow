import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

interface Vehicle {
  id: string;
  name: string;
  mileage: number;
  fuelConsumption: number;
  lastMaintenance: string;
  performanceData: number[];
}

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Referencias para los gráficos
  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const performanceChartRef = useRef<HTMLCanvasElement | null>(null);
  const maintenanceChartRef = useRef<HTMLCanvasElement | null>(null);

  // Estados
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      name: "Camión 1",
      mileage: 15000,
      fuelConsumption: 8.5,
      lastMaintenance: "2023-05-15",
      performanceData: [8.2, 8.3, 8.6, 8.4, 8.7, 8.5, 8.6],
    },
    {
      id: "2",
      name: "Camión 2",
      mileage: 22000,
      fuelConsumption: 7.8,
      lastMaintenance: "2023-06-20",
      performanceData: [7.5, 7.6, 7.9, 7.7, 7.8, 7.6, 7.7],
    },
    {
      id: "3",
      name: "Camión 3",
      mileage: 18000,
      fuelConsumption: 9.2,
      lastMaintenance: "2023-04-10",
      performanceData: [9.0, 9.1, 9.3, 9.2, 9.4, 9.1, 9.2],
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Admin", email: "admin@flota.com" },
    { id: "2", name: "Operador 1", email: "operador1@flota.com" },
  ]);

  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [showUserForm, setShowUserForm] = useState(false);

  // Calcular métricas
  const totalFuelConsumption = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.fuelConsumption,
    0
  );
  const averagePerformance =
    vehicles.reduce((sum, vehicle) => {
      const avg = vehicle.performanceData.reduce((s, d) => s + d, 0) / vehicle.performanceData.length;
      return sum + avg;
    }, 0) / vehicles.length;

  // Inicializar gráficos
  useEffect(() => {
    // Gráfico de barras (recorrido de vehículos)
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: vehicles.map((v) => v.name),
            datasets: [
              {
                label: "Kilometraje (km)",
                data: vehicles.map((v) => v.mileage),
                backgroundColor: "#1d2761",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Kilometraje por Vehículo",
              },
            },
          },
        });
      }
    }

    // Gráfico de líneas (rendimiento en el tiempo)
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
            datasets: vehicles.map((vehicle, idx) => ({
              label: vehicle.name,
              data: vehicle.performanceData,
              borderColor: `hsl(${idx * 120}, 70%, 50%)`,
              tension: 0.1,
            })),
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Rendimiento en el Tiempo (km/l)",
              },
            },
          },
        });
      }
    }

    // Gráfico de rendimiento individual (para vehículos seleccionados)
    if (performanceChartRef.current && selectedVehicles.length > 0) {
      const ctx = performanceChartRef.current.getContext("2d");
      if (ctx) {
        const selected = vehicles.filter(v => selectedVehicles.includes(v.id));
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: selected.map(v => v.name),
            datasets: [
              {
                label: "Consumo de Combustible (l/100km)",
                data: selected.map(v => v.fuelConsumption),
                backgroundColor: "#4e73df",
              },
              {
                label: "Rendimiento Promedio (km/l)",
                data: selected.map(v => 
                  v.performanceData.reduce((sum, d) => sum + d, 0) / v.performanceData.length
                ),
                backgroundColor: "#1cc88a",
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: false,
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Comparación de Vehículos Seleccionados",
              },
            },
          },
        });
      }
    }

    // Gráfico de mantenimiento preventivo
    if (maintenanceChartRef.current) {
      const ctx = maintenanceChartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: vehicles.map(v => v.name),
            datasets: [
              {
                label: "Días desde último mantenimiento",
                data: vehicles.map(v => {
                  const diff = new Date().getTime() - new Date(v.lastMaintenance).getTime();
                  return Math.floor(diff / (1000 * 60 * 60 * 24));
                }),
                backgroundColor: vehicles.map(v => {
                  const diff = new Date().getTime() - new Date(v.lastMaintenance).getTime();
                  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                  return days > 180 ? "#e74a3b" : days > 90 ? "#f6c23e" : "#1cc88a";
                }),
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Mantenimiento Preventivo",
              },
              tooltip: {
                callbacks: {
                  afterLabel: function(context) {
                    const vehicle = vehicles[context.dataIndex];
                    return `Último mantenimiento: ${new Date(vehicle.lastMaintenance).toLocaleDateString()}`;
                  }
                }
              }
            },
          },
        });
      }
    }
  }, [vehicles, selectedVehicles]);

  // Manejar selección de vehículos para comparación
  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicles(prev =>
      prev.includes(vehicleId)
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  // Crear nuevo usuario
  const handleCreateUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, {
        id: `${users.length + 1}`,
        name: newUser.name,
        email: newUser.email,
      }]);
      setNewUser({ name: "", email: "" });
      setShowUserForm(false);
    }
  };

  // Exportar a Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Hoja de vehículos
    const vehicleData = vehicles.map(v => ({
      "Vehículo": v.name,
      "Kilometraje": v.mileage,
      "Consumo (l/100km)": v.fuelConsumption,
      "Último Mantenimiento": v.lastMaintenance,
      "Rendimiento Promedio": v.performanceData.reduce((sum, d) => sum + d, 0) / v.performanceData.length,
    }));
    const wsVehicles = XLSX.utils.json_to_sheet(vehicleData);
    XLSX.utils.book_append_sheet(wb, wsVehicles, "Vehículos");
    
    // Hoja de métricas
    const metricsData = [{
      "Consumo Total Combustible": totalFuelConsumption.toFixed(2),
      "Rendimiento Promedio Flota": averagePerformance.toFixed(2),
    }];
    const wsMetrics = XLSX.utils.json_to_sheet(metricsData);
    XLSX.utils.book_append_sheet(wb, wsMetrics, "Métricas");
    
    // Hoja de usuarios
    const wsUsers = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(wb, wsUsers, "Usuarios");
    
    XLSX.writeFile(wb, "reporte_flota.xlsx");
  };

  // Ir al inicio
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú lateral izquierdo */}
      <div className="w-64 bg-[#c9c6c6] text-black p-4 flex flex-col">
        {/* Logo y botón de inicio */}
        <div className="mb-8 p-4 border-b border-gray-700 flex flex-col items-center">
          {/* Aquí puedes reemplazar con tu propio logo */}
          <div className="w-full max-w-md mb-8">
        <img 
          src="/lovable-uploads/logo.png" 
          alt="EJAD Global Solutions" 
          className="h-25 mx-auto"
        />
      </div>
          <h1 className="text-xl font-bold text-center">Gestión de Flota</h1>
          
          <button 
            onClick={goToHome}
            className="mt-4 bg-blue-700 hover:bg-blue-600 text-white py-1 px-3 rounded-full text-sm"
          >
            Ir al Inicio
          </button>
        </div>

        {/* Sección de usuarios */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Usuarios</h2>
            <button 
              onClick={() => setShowUserForm(!showUserForm)}
              className="p-1 rounded hover:bg-blue-700"
            >
              +
            </button>
          </div>
          
          {showUserForm && (
            <div className="mb-4 p-2 bg-blue-900 rounded">
              <input
                type="text"
                placeholder="Nombre"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="w-full p-1 mb-2 text-black rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="w-full p-1 mb-2 text-black rounded"
              />
              <button
                onClick={handleCreateUser}
                className="w-full bg-green-600 hover:bg-green-700 p-1 rounded"
              >
                Crear
              </button>
            </div>
          )}
          
          <ul className="space-y-1">
            {users.map((user) => (
              <li key={user.id} className="p-2 hover:bg-blue-700 rounded cursor-pointer">
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Selección de vehículos para comparación */}
        <div className="mt-auto">
          <h3 className="font-semibold mb-2">Comparar Vehículos</h3>
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={`vehicle-${vehicle.id}`}
                checked={selectedVehicles.includes(vehicle.id)}
                onChange={() => handleVehicleSelect(vehicle.id)}
                className="mr-2"
              />
              <label htmlFor={`vehicle-${vehicle.id}`}>{vehicle.name}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-3xl font-bold text-[#1d2761] mb-6">Dashboard de Flota</h2>
        
        {/* Métricas resumidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-600">Total Vehículos</h3>
            <p className="text-2xl font-bold">{vehicles.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-600">Consumo Total Combustible</h3>
            <p className="text-2xl font-bold">{totalFuelConsumption.toFixed(2)} l/100km</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-600">Rendimiento Promedio</h3>
            <p className="text-2xl font-bold">{averagePerformance.toFixed(2)} km/l</p>
          </div>
        </div>

        {/* Gráfico de kilometraje */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Kilometraje por Vehículo</h3>
          <canvas ref={barChartRef} height="300"></canvas>
        </div>

        {/* Gráfico de rendimiento */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Rendimiento en el Tiempo</h3>
          <canvas ref={lineChartRef} height="300"></canvas>
        </div>

        {/* Gráfico de comparación si hay vehículos seleccionados */}
        {selectedVehicles.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Comparación de Vehículos</h3>
            <canvas ref={performanceChartRef} height="300"></canvas>
          </div>
        )}

        {/* Gráfico de mantenimiento */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Mantenimiento Preventivo</h3>
          <canvas ref={maintenanceChartRef} height="300"></canvas>
        </div>

        {/* Botón de exportación */}
        <div className="text-right">
          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Exportar a Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;