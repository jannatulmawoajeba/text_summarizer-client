import { useState } from "react"
import InputBox from "./InputBox"
import OutputBox from "./OutputBox"

const Box = () => {
    const [summary, setSummary] = useState("");

    return (
        <div className="mt-16 h-4/6 bg-white w-4/5 drop-shadow-2xl rounded-xl">
            <div className="h-12 p-2 bg-white border-b-2 border-background">
                <span className="px-5 py-4 text-light_black font-bold text-sm text-center">
                    Models:
                </span>
                <span className="text-sm px-5 py-4 font-semibold text-green border-b border-green">Shorten</span>
            </div>
            <div className="flex bg-white h-full justify-center items-center">
                <InputBox setSummary={setSummary} />
                <div className="border-2 border-ash h-full" />
                <OutputBox summary={summary} />
            </div>
        </div>
    )
}

export default Box