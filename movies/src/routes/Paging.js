export default function Paging({maxStep, setStep, step}){
    function handleStep(symbol){
        if(symbol === '<<'){
            setStep(0);
        }else if(symbol === '>>'){
            setStep(maxStep-1);
        }else if(symbol === '<'){
            if(step > 0)
                setStep((s)=>s-1);
        }else{
            if(step < maxStep-1)
                setStep((s)=>s+1);
        }
    }

    return(
        <div className="pagination">
            <button onClick={()=>handleStep("<<")} disabled={step === 0}>{"<<"}</button>
            <button onClick={()=>handleStep("<")} disabled={step === 0}>{"<"}</button>
            <button onClick={()=>handleStep(">")} disabled={step === maxStep-1}>{">"}</button>
            <button onClick={()=>handleStep(">>")} disabled={step === maxStep-1}>{">>"}</button>
        </div>
    )
}