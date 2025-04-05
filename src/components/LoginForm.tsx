
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Iniciar sesión con:', { username, password });
    
    // Simulación de autenticación (en un caso real, esto sería una llamada a API)
    if (username === 'admin' && password === 'admin') {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al Sistema de Registro de Vehículos",
      });
      navigate('/vehiculos');
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Usuario o contraseña incorrecta",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-[#1d2761]">INICIAR SESIÓN</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm text-gray-600">Usuario</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b border-gray-300 px-0 py-2 bg-transparent focus:ring-0 focus:border-[#1d2761]"
              style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-gray-600">Contraseña</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 px-0 py-2 bg-transparent focus:ring-0 focus:border-[#1d2761]"
                style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} className="text-gray-500" /> : <Eye size={20} className="text-gray-500" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#1d2761] hover:bg-[#161f4c] text-white py-2 rounded"
          >
            INICIAR SESIÓN
          </Button>

          <div className="text-center">
            <a href="#" className="text-sm text-[#1d2761] hover:underline">
              Olvidaste la contraseña
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
