"use client";

import { useState } from "react";

type ConsequenceData = {
  newDate: string;      // e.g. "28 March 2027"
  daysAdded: number;   // e.g. 14
  extraInterest: number; // e.g. 320
};

type Props = {
  consequence: ConsequenceData;
};

export default function InputCard({ consequence }: Props) {
  const [amount, setAmount] = useState("1,499");

  const rawAmount = amount.replace(/,/g, "");

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Allow digits only; re-format with commas
    const digits = e.target.value.replace(/\D/g, "");
    if (!digits) {
      setAmount("");
      return;
    }
    setAmount(Number(digits).toLocaleString("en-IN"));
  }

  return (
    <div className="bg-bg-surface border border-border rounded-card p-[28px] flex flex-col gap-[12px]">
      {/* Label */}
      <p className="text-[13px] text-text-secondary leading-[1.4]">
        What are you about to buy?
      </p>

      {/* Amount input */}
      <div className="bg-bg-muted border border-border rounded-input h-[68px] flex items-center gap-[8px] px-[20px]">
        <span className="text-[22px] text-text-muted font-normal select-none">
          ₹
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0"
          className="bg-transparent text-[26px] font-semibold text-text-primary leading-[1.4] outline-none w-full placeholder:text-text-muted"
        />
      </div>

      {/* Sub-label */}
      <p className="text-[12px] text-text-muted leading-[1.4]">
        If you spend this today...
      </p>

      {/* Consequence box */}
      <div className="bg-[#FEEFEF] border border-[rgba(229,64,64,0.3)] rounded-input px-[18px] py-[16px] flex flex-col gap-[4px]">
        <p className="text-[13px] text-text-secondary leading-[1.4]">
          Your debt-free date moves to
        </p>
        <p className="text-[15px] font-semibold text-accent-danger leading-[1.4]">
          {consequence.newDate}&nbsp;&nbsp;·&nbsp;&nbsp;+{consequence.daysAdded} days&nbsp;&nbsp;·&nbsp;&nbsp;+₹{consequence.extraInterest.toLocaleString("en-IN")} interest
        </p>
      </div>

      {/* CTA button */}
      <button className="bg-accent-freedom text-white text-[15px] font-semibold leading-[1.4] h-[50px] rounded-input flex items-center justify-center w-full hover:bg-[#029b71] transition-colors">
        Skip this — save {consequence.daysAdded} days of debt
      </button>

      {/* Secondary action */}
      <button className="text-[14px] text-text-muted leading-[1.4] text-center w-full hover:text-text-secondary transition-colors">
        I still want to buy this
      </button>
    </div>
  );
}
