
import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, MapPin, Camera } from "lucide-react";

const VehiculosRegistro = () => {
  const [step, setStep] = useState<'vehiculo' | 'inicio' | 'destino'>('vehiculo');
  
  const nextStep = () => {
    if (step === 'vehiculo') setStep('inicio');
    else if (step === 'inicio') setStep('destino');
  };
  
  const prevStep = () => {
    if (step === 'destino') setStep('inicio');
    else if (step === 'inicio') setStep('vehiculo');
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">Sistema de Registro de Vehículos</h1>
      
      {/* Tabs */}
      <div className="grid grid-cols-3 mb-8 bg-gray-100 rounded-lg">
        <div 
          className={`py-4 text-center ${step === 'vehiculo' ? 'bg-white font-medium' : 'text-gray-600'}`}
          onClick={() => setStep('vehiculo')}
        >
          Vehículo
        </div>
        <div 
          className={`py-4 text-center ${step === 'inicio' ? 'bg-white font-medium' : 'text-gray-600'}`}
          onClick={() => setStep('inicio')}
        >
          Punto de Inicio
        </div>
        <div 
          className={`py-4 text-center ${step === 'destino' ? 'bg-white font-medium' : 'text-gray-600'}`}
          onClick={() => setStep('destino')}
        >
          Destino
        </div>
      </div>
      
      {/* Formulario basado en el paso actual */}
      <Card>
        <CardContent className="p-6">
          {step === 'vehiculo' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Datos del Vehículo</h2>
              <p className="text-gray-600 mb-6">Ingrese la información del vehículo que desea registrar.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="placa" className="block font-medium">Placa</label>
                  <Input 
                    id="placa" 
                    placeholder="ABC-123"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="tipo" className="block font-medium">Tipo de Vehículo</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="camion">Camión</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="marca" className="block font-medium">Marca</label>
                  <Input 
                    id="marca" 
                    placeholder="Toyota, Ford, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="modelo" className="block font-medium">Modelo</label>
                  <Input 
                    id="modelo" 
                    placeholder="Corolla, Ranger, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="anio" className="block font-medium">Año</label>
                  <Input 
                    id="anio" 
                    placeholder="2023"
                    type="number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="color" className="block font-medium">Color</label>
                  <Input 
                    id="color" 
                    placeholder="Blanco, Negro, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="numero" className="block font-medium">Número Económico</label>
                  <Input 
                    id="numero" 
                    placeholder="VEH-001"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="mantenimiento" className="block font-medium">Fecha de Último Mantenimiento</label>
                  <Input 
                    id="mantenimiento" 
                    type="date"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={nextStep} 
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}
          
          {step === 'inicio' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Punto de Inicio</h2>
              <p className="text-gray-600 mb-6">Registre el punto de inicio del recorrido.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="lugarInicio" className="block font-medium">Lugar de Inicio</label>
                  <Input 
                    id="lugarInicio" 
                    placeholder="Ciudad, Dirección, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="kilometrajeInicial" className="block font-medium">Kilometraje Inicial</label>
                  <Input 
                    id="kilometrajeInicial" 
                    placeholder="123456"
                    type="number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="fechaSalida" className="block font-medium">Fecha de Salida</label>
                  <Input 
                    id="fechaSalida" 
                    type="date"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="horaSalida" className="block font-medium">Hora de Salida</label>
                  <Input 
                    id="horaSalida" 
                    type="time"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="flex items-center font-medium mb-4">
                  <MapPin className="mr-2 h-4 w-4" />
                  Ubicación de Inicio
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="latitudInicio" className="block font-medium">Latitud</label>
                    <Input 
                      id="latitudInicio" 
                      defaultValue="19.432600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="longitudInicio" className="block font-medium">Longitud</label>
                    <Input 
                      id="longitudInicio" 
                      defaultValue="-99.133200"
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-white border border-gray-300 text-black hover:bg-gray-50 flex items-center justify-center"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Actualizar Ubicación
                </Button>
                
                <div className="mt-4 p-4 bg-yellow-100 text-amber-800 text-center rounded-md text-sm">
                  Usando mapa simulado. Haga clic para seleccionar ubicaciones.
                </div>
                
                <div className="mt-4 bg-gray-200 h-64 rounded-md flex items-center justify-center relative">
                  <div className="absolute text-center text-gray-600">
                    <div className="mb-2">Inicio</div>
                    <div className="h-6 w-6 bg-green-600 rounded-full mx-auto"></div>
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 bg-gray-800 text-white text-xs p-2">
                    Mapa simulado - Haga clic para seleccionar ubicaciones
                  </div>
                </div>
                
                <div className="mt-4 text-gray-600 text-sm">
                  Latitud: 19.432600, Longitud: -99.133200
                </div>
                
                <div className="mt-6">
                  <h3 className="flex items-center font-medium mb-4">
                    <Camera className="mr-2 h-4 w-4" />
                    Foto del Kilometraje
                  </h3>
                  
                  <Button 
                    className="w-full bg-white border border-gray-300 text-black hover:bg-gray-50 flex items-center justify-center"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Activar Cámara
                  </Button>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Paradas de Gasolina</h3>
                  <div className="flex justify-end mb-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-sm"
                    >
                      Agregar Parada
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  onClick={prevStep} 
                  variant="outline"
                >
                  Atrás
                </Button>
                <Button 
                  onClick={nextStep} 
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Continuar a Destino
                </Button>
              </div>
            </div>
          )}
          
          {step === 'destino' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Destino</h2>
              <p className="text-gray-600 mb-6">Registre el punto de destino del recorrido.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="lugarDestino" className="block font-medium">Lugar de Destino</label>
                  <Input 
                    id="lugarDestino" 
                    placeholder="Ciudad, Dirección, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="kilometrajeFinal" className="block font-medium">Kilometraje Final</label>
                  <Input 
                    id="kilometrajeFinal" 
                    placeholder="123789"
                    type="number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="fechaLlegada" className="block font-medium">Fecha de Llegada</label>
                  <Input 
                    id="fechaLlegada" 
                    type="date"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="horaLlegada" className="block font-medium">Hora de Llegada</label>
                  <Input 
                    id="horaLlegada" 
                    type="time"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="flex items-center font-medium mb-4">
                  <MapPin className="mr-2 h-4 w-4" />
                  Ubicación de Destino
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="latitudDestino" className="block font-medium">Latitud</label>
                    <Input 
                      id="latitudDestino" 
                      placeholder="Ej: 19.432608"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="longitudDestino" className="block font-medium">Longitud</label>
                    <Input 
                      id="longitudDestino" 
                      placeholder="Ej: -99.133209"
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-white border border-gray-300 text-black hover:bg-gray-50 flex items-center justify-center"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Actualizar Ubicación
                </Button>
                
                <div className="mt-4 p-4 bg-yellow-100 text-amber-800 text-center rounded-md text-sm">
                  Usando mapa simulado. Haga clic para seleccionar ubicaciones.
                </div>
                
                <div className="mt-4 bg-gray-200 h-64 rounded-md flex items-center justify-center relative">
                  <div className="absolute text-center text-gray-600">
                    <div className="mb-2">Inicio</div>
                    <div className="h-6 w-6 bg-green-600 rounded-full mx-auto"></div>
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 bg-gray-800 text-white text-xs p-2">
                    Mapa simulado - Haga clic para seleccionar ubicaciones
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  onClick={prevStep} 
                  variant="outline"
                >
                  Atrás
                </Button>
                <div>
                  <Button 
                    variant="outline"
                    className="mr-2"
                  >
                    Finalizar Recorrido
                  </Button>
                  <Button 
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    Registrar Vehículo
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VehiculosRegistro;
