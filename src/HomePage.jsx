import ShimmerButton from "@/components/ui/shimmer-button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import  Chart  from "./Chart";
import { useState } from "react";
const HomePage=({submit,setLoading,data})=>{
  const [eda,setEda]=useState(0)
  const [hr,setHr]=useState(0)
  const [text,setText]=useState("")
  const [image,setImage]=useState(null)
  const {toast}=useToast()
  const handleSubmit=()=>{
    if(typeof eda!=='number' || typeof hr!=='number'){
      toast({
        title: "Error",
        description: `Please enter valid values`,
        variant: "destructive",
      })
      return
    }
    toast({
          title: "Analyzing",
          description: "Data sent to model for analysis",
    })
    setLoading(true)
    submit.mutate({eda,hr,text,image})
  }
  return (
   
<div className="flex flex-col mt-10 lg:mt-0 md:flex-col lg:flex-row items-center lg:items-start justify-around space-y-5 lg:space-y-0 lg:space-x-20">
  <div className="z-10 flex flex-col items-center justify-center max-w-lg">
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="ecg">ECG</Label>
      <Input type="number" id="ecg" placeholder="Enter ECG value" onChange={(e)=>setEda(Number(e.target.value))} value={eda} />
    </div>
    <div className="grid w-full mt-2 max-w-sm items-center gap-1.5">
      <Label htmlFor="heart-rate">Heart rate</Label>
      <Input type="number" id="heart-rate" placeholder="Enter Heart rate" onChange={(e)=>setHr(Number(e.target.value))} value={hr}/>
    </div>
    <div className="grid w-full mt-2 max-w-sm items-center gap-1.5">
      <Label htmlFor="pic">Picture</Label>
      <Input type="file" id="pic" placeholder="file" onChange={(e)=>setImage(e.target.files[0])} />
    </div>
    <div className="grid w-full mt-2 gap-1.5">
      <Label htmlFor="message-2">How is your day</Label>
      <Textarea placeholder="Type your message here." id="message-2" onChange={(e)=>setText(e.target.value)} value={text}/>
      <p className="text-sm text-muted-foreground">
        Based on your day/content the stress levels are assessed.
      </p>
    </div>
    <ShimmerButton onClick={handleSubmit} className="shadow-2xl mt-5">
      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
        Check Stress
      </span>
    </ShimmerButton>
  </div>
  <div className="flex flex-col items-center justify-center">
    <Chart data={data}/>
  </div>
</div>
  )
}

export default HomePage
