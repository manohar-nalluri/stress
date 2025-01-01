import { useTheme } from "next-themes";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import Particles from "@/components/ui/particles";
 import GradualSpacing from "@/components/ui/gradual-spacing";
import HomePage from "./HomePage";
import LoadingScreen from "./LoadingScreen";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast"
import axios from "axios";
export function ParticlesDemo() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [data,setData]=useState("")
  const [loading,setLoading]=useState(false)
  const {toast}=useToast()
  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);
  useEffect(()=>{
    setData(localStorage.getItem("chart"))
  },[])
  const mutate=useMutation({
    mutationFn:async(data)=>{
      const response=await axios.post("http://localhost:8000/predict",{data})
      return response
    },
    onSuccess:(data)=>{
      setLoading(false)
      toast({
        Title:"successfully fetched data",
        discription:"fetched the data"
      })
      handleConfetti()
    },
    onError:(error)=>{
      setLoading(false)
    }
  })
  const handleConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
 
    const frame = () => {
      if (Date.now() > end) return;
 
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
 
      requestAnimationFrame(frame);
    };
 
    frame();
  };
  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center  rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none z-10 mt-10 whitespace-pre-wrap  text-4xl font-semibold leading-none">
        <GradualSpacing
          className="font-display text-center text-4xl font-bold -tracking-widest  text-black dark:text-white md:text-7xl md:leading-[5rem]"
          text="Human  Stress  Detector"
        />
      </span>
      <div className="flex-grow flex items-center justify-center">
        {loading ?<LoadingScreen/>: <HomePage submit={mutate} setLoading={setLoading}/>}
      </div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={500}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
