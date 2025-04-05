
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a EJAD Global Solutions</h1>
        <p className="text-xl text-gray-600 mb-6">Por favor inicia sesión para continuar</p>
        <Link to="/login">
          <Button className="bg-[#1d2761] hover:bg-[#161f4c] text-white">
            Ir al Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
