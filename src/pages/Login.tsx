
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#6c85d3] p-4">
      <div className="w-full max-w-md mb-8">
        <img 
          src="/lovable-uploads/logo.svg" 
          alt="EJAD Global Solutions" 
          className="h-24 mx-auto"
        />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
