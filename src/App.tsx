import { useState } from "react";
import "./App.css";
import { calcTable, nthProhability } from "./lib/calc";
const TABLE_SIZE = 13 + 1;
function App() {
    const [inputNumber, setInputNumber] = useState<number>(1);
    const [table, setTable] = useState<number[][]>([]);
    const [mode, setMode] = useState<"table" | "single">("table");
    const [currentMode, setCurrentMode] = useState<"table" | "single">("table");
    const [currentNumber, setCurrentNumber] = useState(0);
    const onClick = () => {
        if (inputNumber > 0 && Number.isInteger(inputNumber)) {
            if (mode === "single") {
                setCurrentNumber(inputNumber);
                setCurrentMode("single");
                setTable([nthProhability(inputNumber)]);
            } else {
                setCurrentMode("table");
                setTable(calcTable(inputNumber));
            }
        }
    };
    return (
        <section>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onClick();
                }}
            >
                <div className="flex justify-center items-center">
                    <input
                        className="w-32 h-20 p-4 rounded-xl m-4"
                        type="number"
                        onChange={(e) => setInputNumber(parseInt(e.target?.value, 10) ?? 0)}
                    ></input>
                    <label htmlFor="check" className="flex flex-col justify-center items-ceeenter">
                        <div className="text-slate-100">{"Single Mode"}</div>
                        <input
                            id="check"
                            className="w-10 h-10 p-4 rounded-xl m-4"
                            type="checkbox"
                            onChange={(e) => setMode(e.target.checked === true ? "single" : "table")}
                        ></input>
                    </label>
                    <input
                        className="w-24 h-20 p-4 rounded-xl m-4 bg-slate-800 text-slate-100 cursor-pointer"
                        type="button"
                        onClick={onClick}
                        value="SUBMIT"
                    ></input>
                </div>
            </form>

            <div>
                <table className="w-full">
                    <thead className="sticky top-0 bg-slate-900 text-slate-100">
                        <tr className="p-2 [&>td]:p-2">
                            <td className="text-center">Count</td>
                            {new Array(TABLE_SIZE).fill(0).map((_, i) => (
                                <td className="text-center">
                                    {1} /{Math.pow(2, i)}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((e, i) => (
                            <tr className="[&>td]:p-2">
                                <td className="bg-slate-700 text-slate-100 text-right">
                                    {currentMode === "single" ? currentNumber : i}
                                </td>
                                {e.map((e) => (
                                    <td className="bg-slate-600 text-slate-200 text-right">
                                        {Math.floor(e * 10000) / 100}%
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default App;
