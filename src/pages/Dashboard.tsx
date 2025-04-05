// src/pages/Dashboard.tsx
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const data = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Registros',
          data: [10, 20, 30, 40, 50, 60, 70],
          backgroundColor: '#1d2761',
          barPercentage: 0.5,
          barThickness: 30,
          maxBarThickness: 40,
          minBarLength: 10,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: "#1d2761",
          },
        },
        title: {
          display: true,
          text: "Estadísticas de Registros",
          color: "#1d2761",
          font: {
            size: 18,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            offset: true,
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
        },
      },
    };

    const chart = new Chart(ctx, {
      type: 'bar',
      data,
      options,
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-[#1d2761] mb-6">Dashboard de Admin</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;