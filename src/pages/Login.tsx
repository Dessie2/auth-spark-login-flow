
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f8fa] p-4">
      <div className="w-full max-w-md mb-8">
        <img 
          src="/lovable-uploads/logo.png" 
          alt="EJAD Global Solutions" 
          className="h-25 mx-auto"
        />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
