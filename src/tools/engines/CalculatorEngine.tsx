"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator as CalcIcon,
  DollarSign,
  Calendar,
  Scale,
  RefreshCw,
  ArrowRightLeft,
  Activity,
} from "lucide-react";
import { ToolItem } from "@/data/tools";

interface CalculatorEngineProps {
  tool: ToolItem;
}

export const CalculatorEngine: React.FC<CalculatorEngineProps> = ({ tool }) => {
  // Scientific / Basic Calculator State
  const [calcDisplay, setCalcDisplay] = useState("0");
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  // EMI State
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(5);

  // GST State
  const [gstAmount, setGstAmount] = useState(1000);
  const [gstRate, setGstRate] = useState(18);
  const [gstType, setGstType] = useState<"exclusive" | "inclusive">("exclusive");

  // Age State
  const [birthDate, setBirthDate] = useState("1998-05-15");

  // Unit Converter State
  const [unitValue, setUnitValue] = useState(100);
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");

  // BMI State
  const [bmiHeight, setBmiHeight] = useState(175); // cm
  const [bmiWeight, setBmiWeight] = useState(70); // kg

  // EMI Computation
  const emiResult = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) return { emi: P / n, totalInterest: 0, totalPayment: P };
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  }, [loanAmount, interestRate, tenureYears]);

  // GST Computation
  const gstResult = useMemo(() => {
    if (gstType === "exclusive") {
      const tax = (gstAmount * gstRate) / 100;
      return { net: gstAmount, tax, total: gstAmount + tax };
    } else {
      const net = (gstAmount * 100) / (100 + gstRate);
      const tax = gstAmount - net;
      return { net, tax, total: gstAmount };
    }
  }, [gstAmount, gstRate, gstType]);

  // Age Computation
  const ageResult = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { years, months, days, totalDays };
  }, [birthDate]);

  // BMI Computation
  const bmiResult = useMemo(() => {
    const heightInM = bmiHeight / 100;
    if (heightInM <= 0) return null;
    const bmi = bmiWeight / (heightInM * heightInM);
    let category = "Normal weight";
    let color = "text-emerald-400";
    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-amber-400";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
      color = "text-orange-400";
    } else if (bmi >= 30) {
      category = "Obesity";
      color = "text-rose-400";
    }
    return { bmi: bmi.toFixed(1), category, color };
  }, [bmiHeight, bmiWeight]);

  // Basic Calculator click handler
  const handleCalcNumber = (num: string) => {
    if (overwrite) {
      setCalcDisplay(num);
      setOverwrite(false);
    } else {
      setCalcDisplay(calcDisplay === "0" ? num : calcDisplay + num);
    }
  };

  const handleCalcOp = (op: string) => {
    setPrevVal(parseFloat(calcDisplay));
    setOperation(op);
    setOverwrite(true);
  };

  const handleCalcEquals = () => {
    if (prevVal === null || operation === null) return;
    const current = parseFloat(calcDisplay);
    let res = 0;
    switch (operation) {
      case "+":
        res = prevVal + current;
        break;
      case "-":
        res = prevVal - current;
        break;
      case "×":
        res = prevVal * current;
        break;
      case "÷":
        res = current !== 0 ? prevVal / current : 0;
        break;
      default:
        break;
    }
    setCalcDisplay(String(res));
    setPrevVal(null);
    setOperation(null);
    setOverwrite(true);
  };

  const isEmi = tool.slug.includes("emi") || tool.slug.includes("loan");
  const isGst = tool.slug.includes("gst") || tool.slug.includes("tax");
  const isAge = tool.slug.includes("age") || tool.slug.includes("date");
  const isBmi = tool.slug.includes("bmi");

  return (
    <div className="space-y-6">
      {isEmi ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-6">
          <h3 className="text-sm font-semibold text-teal-400 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Monthly Loan & EMI Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Loan Amount ($)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Tenure (Years)</label>
              <input
                type="number"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4 text-center">
              <span className="text-xs text-slate-400">Monthly EMI Payment</span>
              <span className="block text-2xl font-bold text-teal-400 mt-1">
                ${emiResult.emi.toLocaleString()}
              </span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <span className="text-xs text-slate-400">Total Interest Payable</span>
              <span className="block text-2xl font-bold text-slate-200 mt-1">
                ${emiResult.totalInterest.toLocaleString()}
              </span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <span className="text-xs text-slate-400">Total Loan Amount (P+I)</span>
              <span className="block text-2xl font-bold text-slate-200 mt-1">
                ${emiResult.totalPayment.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ) : isGst ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-6">
          <h3 className="text-sm font-semibold text-teal-400 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> GST / Sales Tax Calculator
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Base Amount ($)</label>
              <input
                type="number"
                value={gstAmount}
                onChange={(e) => setGstAmount(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Tax Rate (%)</label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              >
                <option value={5}>5% (Basic)</option>
                <option value={12}>12% (Standard)</option>
                <option value={18}>18% (Standard Plus)</option>
                <option value={28}>28% (Luxury)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Calculation Type</label>
              <select
                value={gstType}
                onChange={(e) => setGstType(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              >
                <option value="exclusive">GST Exclusive (Add tax to amount)</option>
                <option value="inclusive">GST Inclusive (Extract tax from total)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <span className="text-xs text-slate-400">Net Amount</span>
              <span className="block text-xl font-bold text-slate-200 mt-1">
                ${gstResult.net.toFixed(2)}
              </span>
            </div>
            <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4 text-center">
              <span className="text-xs text-teal-400">Tax Component</span>
              <span className="block text-xl font-bold text-teal-400 mt-1">
                ${gstResult.tax.toFixed(2)}
              </span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <span className="text-xs text-slate-400">Total Price</span>
              <span className="block text-xl font-bold text-slate-200 mt-1">
                ${gstResult.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ) : isAge ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-6">
          <h3 className="text-sm font-semibold text-teal-400 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Precise Age & Date Difference Calculator
          </h3>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Select Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full sm:w-64 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          </div>

          {ageResult && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4 text-center">
                <span className="text-xs text-slate-400">Years</span>
                <span className="block text-3xl font-bold text-teal-400 mt-1">
                  {ageResult.years}
                </span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
                <span className="text-xs text-slate-400">Months</span>
                <span className="block text-3xl font-bold text-slate-200 mt-1">
                  {ageResult.months}
                </span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
                <span className="text-xs text-slate-400">Days</span>
                <span className="block text-3xl font-bold text-slate-200 mt-1">
                  {ageResult.days}
                </span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
                <span className="text-xs text-slate-400">Total Lived Days</span>
                <span className="block text-2xl font-bold text-cyan-400 mt-1">
                  {ageResult.totalDays.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : isBmi ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-6">
          <h3 className="text-sm font-semibold text-teal-400 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Body Mass Index (BMI) Health Calculator
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Weight (kg)</label>
              <input
                type="number"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>

          {bmiResult && (
            <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Your Calculated BMI</span>
                <span className="block text-3xl font-extrabold text-white mt-1">
                  {bmiResult.bmi}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Category</span>
                <span className={`block text-lg font-bold ${bmiResult.color} mt-1`}>
                  {bmiResult.category}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Standard / Scientific Calculator Keypad */
        <div className="max-w-xs mx-auto rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-2xl space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 text-right">
            <div className="text-[10px] text-slate-500 font-mono h-4">
              {prevVal !== null && `${prevVal} ${operation}`}
            </div>
            <div className="text-3xl font-mono font-bold text-white tracking-tight overflow-x-auto">
              {calcDisplay}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => {
                setCalcDisplay("0");
                setPrevVal(null);
                setOperation(null);
                setOverwrite(true);
              }}
              className="rounded-xl bg-slate-800 text-rose-400 p-3 font-semibold text-sm hover:bg-slate-700"
            >
              C
            </button>
            <button
              type="button"
              onClick={() => setCalcDisplay(String(-parseFloat(calcDisplay)))}
              className="rounded-xl bg-slate-800 text-slate-200 p-3 font-semibold text-sm hover:bg-slate-700"
            >
              ±
            </button>
            <button
              type="button"
              onClick={() => setCalcDisplay(String(parseFloat(calcDisplay) / 100))}
              className="rounded-xl bg-slate-800 text-slate-200 p-3 font-semibold text-sm hover:bg-slate-700"
            >
              %
            </button>
            <button
              type="button"
              onClick={() => handleCalcOp("÷")}
              className="rounded-xl bg-teal-600 text-white p-3 font-semibold text-sm hover:bg-teal-500"
            >
              ÷
            </button>

            {["7", "8", "9"].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => handleCalcNumber(n)}
                className="rounded-xl bg-slate-900 text-slate-100 p-3 font-semibold text-base hover:bg-slate-800"
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleCalcOp("×")}
              className="rounded-xl bg-teal-600 text-white p-3 font-semibold text-sm hover:bg-teal-500"
            >
              ×
            </button>

            {["4", "5", "6"].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => handleCalcNumber(n)}
                className="rounded-xl bg-slate-900 text-slate-100 p-3 font-semibold text-base hover:bg-slate-800"
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleCalcOp("-")}
              className="rounded-xl bg-teal-600 text-white p-3 font-semibold text-sm hover:bg-teal-500"
            >
              -
            </button>

            {["1", "2", "3"].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => handleCalcNumber(n)}
                className="rounded-xl bg-slate-900 text-slate-100 p-3 font-semibold text-base hover:bg-slate-800"
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleCalcOp("+")}
              className="rounded-xl bg-teal-600 text-white p-3 font-semibold text-sm hover:bg-teal-500"
            >
              +
            </button>

            <button
              type="button"
              onClick={() => handleCalcNumber("0")}
              className="col-span-2 rounded-xl bg-slate-900 text-slate-100 p-3 font-semibold text-base hover:bg-slate-800"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => {
                if (!calcDisplay.includes(".")) setCalcDisplay(calcDisplay + ".");
              }}
              className="rounded-xl bg-slate-900 text-slate-100 p-3 font-semibold text-base hover:bg-slate-800"
            >
              .
            </button>
            <button
              type="button"
              onClick={handleCalcEquals}
              className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 font-semibold text-base hover:opacity-95 shadow-glow"
            >
              =
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorEngine;
