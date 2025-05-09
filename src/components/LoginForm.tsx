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

    if (username === 'lider' && password === 'lider') {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al Sistema de Registro de Vehículos",
      });
      navigate('/vehiculos');
    } else if (username === 'Admin' && password === 'Admin') {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al Dashboard",
      });
      navigate('/dashboard');
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
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C39738] hover:bg-[#C39739] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d2761]"
          >
            INICIAR SESIÓN
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;