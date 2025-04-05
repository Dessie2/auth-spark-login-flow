import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { RefreshCw, MapPin, Camera, User, LogOut, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// Tipo para el vehículo
interface Vehiculo {
  placa: string;
  tipo: string;
  marca: string;
  modelo: string;
  anio: string;
  color: string;
  numeroEconomico: string;
}

// Tipo para la parada
interface Parada {
  id: string;
  ubicacion: string;
  latitud: string;
  longitud: string;
  kilometraje: string;
  fecha: string;
  hora: string;
  fotoKilometraje?: string;
}

const VehiculosRegistro = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'vehiculo' | 'inicio' | 'destino'>('vehiculo');
  const [dialogParadaAbierto, setDialogParadaAbierto] = useState(false);
  const [paradas, setParadas] = useState<Parada[]>([]);
  const [nuevaParada, setNuevaParada] = useState<Parada>({
    id: "",
    ubicacion: "",
    latitud: "",
    longitud: "",
    kilometraje: "",
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().slice(0, 5)
  });
  
  // Lista de vehículos guardados (simulada para demostración)
  const [vehiculosGuardados, setVehiculosGuardados] = useState<Vehiculo[]>([
    {
      placa: "ABC-123",
      tipo: "sedan",
      marca: "Toyota",
      modelo: "Corolla",
      anio: "2023",
      color: "Blanco",
      numeroEconomico: "VEH-001"
    },
    {
      placa: "XYZ-789",
      tipo: "suv",
      marca: "Honda",
      modelo: "CR-V",
      anio: "2022",
      color: "Negro",
      numeroEconomico: "VEH-002"
    }
  ]);
  
  // Estado del vehículo seleccionado
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<Vehiculo | null>(null);
  
  // Estados para el formulario de vehículo
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [color, setColor] = useState("");
  const [numeroEconomico, setNumeroEconomico] = useState("");
  const [fechaMantenimiento, setFechaMantenimiento] = useState("");
  
  // Obtener nombre de usuario de la sesión (simulado)
  const [nombreUsuario, setNombreUsuario] = useState("Admin");
  
  // Función para cambiar al siguiente paso
  const nextStep = () => {
    if (step === 'vehiculo') setStep('inicio');
    else if (step === 'inicio') setStep('destino');
  };
  
  // Función para regresar al paso anterior
  const prevStep = () => {
    if (step === 'destino') setStep('inicio');
    else if (step === 'inicio') setStep('vehiculo');
  };

  // Abrir diálogo para agregar parada
  const abrirDialogoParada = () => {
    setNuevaParada({
      id: Date.now().toString(),
      ubicacion: "",
      latitud: "",
      longitud: "",
      kilometraje: "",
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().slice(0, 5)
    });
    setDialogParadaAbierto(true);
  };

  // Agregar nueva parada
  const agregarParada = () => {
    if (!nuevaParada.ubicacion || !nuevaParada.kilometraje) {
      toast({
        title: "Error",
        description: "Por favor complete los campos obligatorios",
        variant: "destructive"
      });
      return;
    }
    
    setParadas([...paradas, nuevaParada]);
    setDialogParadaAbierto(false);
    
    toast({
      title: "Parada agregada",
      description: "La parada ha sido agregada correctamente"
    });
  };

  // Seleccionar vehículo guardado
  const seleccionarVehiculo = (placa: string) => {
    const vehiculo = vehiculosGuardados.find(v => v.placa === placa);
    if (vehiculo) {
      setVehiculoSeleccionado(vehiculo);
      setPlaca(vehiculo.placa);
      setTipo(vehiculo.tipo);
      setMarca(vehiculo.marca);
      setModelo(vehiculo.modelo);
      setAnio(vehiculo.anio);
      setColor(vehiculo.color);
      setNumeroEconomico(vehiculo.numeroEconomico);
    }
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    // En un caso real, aquí iría la lógica para cerrar la sesión
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente"
    });
    navigate('/login');
  };

  // Actualizar coordenadas
  const actualizarCoordenadas = () => {
    // Simulación de obtener coordenadas reales
    setNuevaParada({
      ...nuevaParada,
      latitud: (19.4326 + Math.random() * 0.01).toFixed(6),
      longitud: (-99.1332 + Math.random() * 0.01).toFixed(6)
    });
    
    toast({
      title: "Coordenadas actualizadas",
      description: "Se han actualizado las coordenadas"
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra superior */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Bienvenido a EJAD</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            <span>{nombreUsuario}</span>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-gray-800 flex items-center gap-2"
            onClick={cerrarSesion}
          >
            <LogOut className="h-5 w-5" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto py-6 px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8">Sistema de Registro de Vehículos</h1>
        
        {/* Tabs */}
        <div className="grid grid-cols-3 mb-8 bg-gray-100 rounded-lg">
          <div 
            className={`py-4 text-center ${step === 'vehiculo' ? 'bg-white font-medium' : 'text-gray-600'} cursor-pointer`}
            onClick={() => setStep('vehiculo')}
          >
            Vehículo
          </div>
          <div 
            className={`py-4 text-center ${step === 'inicio' ? 'bg-white font-medium' : 'text-gray-600'} cursor-pointer`}
            onClick={() => setStep('inicio')}
          >
            Punto de Inicio
          </div>
          <div 
            className={`py-4 text-center ${step === 'destino' ? 'bg-white font-medium' : 'text-gray-600'} cursor-pointer`}
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
                
                {/* Lista de vehículos guardados */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Vehículos guardados:</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Placa</TableHead>
                          <TableHead>Marca</TableHead>
                          <TableHead>Modelo</TableHead>
                          <TableHead>Acción</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vehiculosGuardados.map((vehiculo) => (
                          <TableRow key={vehiculo.placa}>
                            <TableCell>{vehiculo.placa}</TableCell>
                            <TableCell>{vehiculo.marca}</TableCell>
                            <TableCell>{vehiculo.modelo}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => seleccionarVehiculo(vehiculo.placa)}
                              >
                                Seleccionar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="placa" className="block font-medium">Placa</label>
                    <Input 
                      id="placa" 
                      placeholder="ABC-123"
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="tipo" className="block font-medium">Tipo de Vehículo</label>
                    <Select value={tipo} onValueChange={setTipo}>
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
                      value={marca}
                      onChange={(e) => setMarca(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="modelo" className="block font-medium">Modelo</label>
                    <Input 
                      id="modelo" 
                      placeholder="Corolla, Ranger, etc."
                      value={modelo}
                      onChange={(e) => setModelo(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="anio" className="block font-medium">Año</label>
                    <Input 
                      id="anio" 
                      placeholder="2023"
                      type="number"
                      value={anio}
                      onChange={(e) => setAnio(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="color" className="block font-medium">Color</label>
                    <Input 
                      id="color" 
                      placeholder="Blanco, Negro, etc."
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="numero" className="block font-medium">Número Económico</label>
                    <Input 
                      id="numero" 
                      placeholder="VEH-001"
                      value={numeroEconomico}
                      onChange={(e) => setNumeroEconomico(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="mantenimiento" className="block font-medium">Fecha de Último Mantenimiento</label>
                    <Input 
                      id="mantenimiento" 
                      type="date"
                      value={fechaMantenimiento}
                      onChange={(e) => setFechaMantenimiento(e.target.value)}
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
                        className="text-sm flex items-center gap-2"
                        onClick={abrirDialogoParada}
                      >
                        <Plus className="h-4 w-4" />
                        Agregar Parada
                      </Button>
                    </div>
                    
                    {/* Tabla de paradas */}
                    {paradas.length > 0 && (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Ubicación</TableHead>
                              <TableHead>Kilometraje</TableHead>
                              <TableHead>Fecha</TableHead>
                              <TableHead>Hora</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {paradas.map((parada) => (
                              <TableRow key={parada.id}>
                                <TableCell>{parada.ubicacion}</TableCell>
                                <TableCell>{parada.kilometraje}</TableCell>
                                <TableCell>{parada.fecha}</TableCell>
                                <TableCell>{parada.hora}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    
                    {paradas.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No hay paradas registradas. Haga clic en "Agregar Parada" para comenzar.
                      </div>
                    )}
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
      
      {/* Diálogo para agregar parada */}
      <Dialog open={dialogParadaAbierto} onOpenChange={setDialogParadaAbierto}>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Agregar Parada</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[60vh] pr-4">
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="ubicacionParada" className="block font-medium">Ubicación</label>
                <Input 
                  id="ubicacionParada" 
                  placeholder="Nombre de estación, dirección, etc."
                  value={nuevaParada.ubicacion}
                  onChange={(e) => setNuevaParada({...nuevaParada, ubicacion: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Mapa</h3>
                <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center relative">
                  <div className="absolute bottom-2 left-0 right-0 bg-gray-800 text-white text-xs p-2 text-center">
                    Mapa simulado - Haga clic para seleccionar ubicación
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="latitudParada" className="block font-medium">Latitud</label>
                  <Input 
                    id="latitudParada" 
                    placeholder="19.432600"
                    value={nuevaParada.latitud}
                    onChange={(e) => setNuevaParada({...nuevaParada, latitud: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="longitudParada" className="block font-medium">Longitud</label>
                  <Input 
                    id="longitudParada" 
                    placeholder="-99.133200"
                    value={nuevaParada.longitud}
                    onChange={(e) => setNuevaParada({...nuevaParada, longitud: e.target.value})}
                  />
                </div>
              </div>
              
              <Button 
                className="bg-white border border-gray-300 text-black hover:bg-gray-50 flex items-center justify-center"
                onClick={actualizarCoordenadas}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Actualizar Coordenadas
              </Button>
              
              <div className="space-y-2">
                <label htmlFor="kilometrajeParada" className="block font-medium">Kilometraje</label>
                <Input 
                  id="kilometrajeParada" 
                  placeholder="123456"
                  type="number"
                  value={nuevaParada.kilometraje}
                  onChange={(e) => setNuevaParada({...nuevaParada, kilometraje: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fechaParada" className="block font-medium">Fecha</label>
                  <Input 
                    id="fechaParada" 
                    type="date"
                    value={nuevaParada.fecha}
                    onChange={(e) => setNuevaParada({...nuevaParada, fecha: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="horaParada" className="block font-medium">Hora</label>
                  <Input 
                    id="horaParada" 
                    type="time"
                    value={nuevaParada.hora}
                    onChange={(e) => setNuevaParada({...nuevaParada, hora: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <Camera className="mr-2 h-4 w-4" />
                  Foto de Kilometraje
                </h3>
                <Button 
                  className="w-full bg-white border border-gray-300 text-black hover:bg-gray-50 flex items-center justify-center"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Activar Cámara
                </Button>
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => setDialogParadaAbierto(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-black hover:bg-gray-800 text-white"
              onClick={agregarParada}
            >
              Agregar Parada
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehiculosRegistro;
