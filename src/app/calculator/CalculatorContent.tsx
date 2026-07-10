"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Plus,
  Trash2,
  Send,
  FileSpreadsheet,
  User,
} from "lucide-react";

const PHONE = "919845378626";

const WOODS = [
  { name: "Teak Wood", rate: 4000 },
  { name: "White Teak", rate: 2800 },
  { name: "Neem Wood", rate: 1500 },
] as const;

interface Item {
  id: number;
  type: string;
  length: string;
  width: string;
  thickness: string;
  qty: string;
}

const cftOf = (it: Item) => {
  const l = parseFloat(it.length) || 0;
  const w = parseFloat(it.width) || 0;
  const t = parseFloat(it.thickness) || 0;
  const q = parseInt(it.qty) || 0;
  return (l * w * t * q) / 144;
};

const rateOf = (type: string) => WOODS.find((w) => w.name === type)?.rate ?? 0;

export default function CalculatorContent() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, type: "Teak Wood", length: "", width: "", thickness: "", qty: "1" },
  ]);
  const [nextId, setNextId] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const clean = (v: string) =>
    v.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

  const update = (id: number, key: keyof Item, v: string) =>
    setItems((arr) =>
      arr.map((it) =>
        it.id === id ? { ...it, [key]: key === "type" ? v : clean(v) } : it,
      ),
    );

  const addRow = () => {
    setItems((arr) => [
      ...arr,
      { id: nextId, type: "Teak Wood", length: "", width: "", thickness: "", qty: "1" },
    ]);
    setNextId((n) => n + 1);
  };

  const delRow = (id: number) =>
    setItems((arr) =>
      arr.length > 1
        ? arr.filter((it) => it.id !== id)
        : [{ id: Date.now(), type: "Teak Wood", length: "", width: "", thickness: "", qty: "1" }],
    );

  const totalCft = items.reduce((s, it) => s + cftOf(it), 0);
  const totalEst = items.reduce((s, it) => s + cftOf(it) * rateOf(it.type), 0);
  const hasData = items.some((it) => cftOf(it) > 0);

  const sendWhatsApp = () => {
    let msg = `🏗️ *TIMBER REQUIREMENT REQUEST*\n\n`;
    if (name) msg += `👤 Name: ${name}\n`;
    if (phone) msg += `📞 Phone: ${phone}\n`;
    if (address) msg += `📍 Delivery: ${address}\n`;
    msg += `\n📋 *REQUIREMENTS:*\n`;
    items.forEach((it, i) => {
      const cft = cftOf(it);
      if (cft <= 0) return;
      msg += `${i + 1}. ${it.type} — ${it.length}ft × ${it.width}" × ${it.thickness}" × ${parseInt(it.qty) || 1}pcs = ${cft.toFixed(2)} CFT\n`;
    });
    msg += `\n📊 *Total: ${totalCft.toFixed(2)} CFT*`;
    if (totalEst > 0)
      msg += `\n💰 Estimate: ₹${Math.round(totalEst).toLocaleString("en-IN")} (please confirm latest rates)`;
    msg += `\n\nPlease share your best price. Thank you! 🙏`;
    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-pattern">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-6">
              <Calculator size={13} />
              Free Tool
            </span>
            <h1 className="font-[family:var(--font-display)] font-bold text-5xl sm:text-6xl leading-[0.95] tracking-tight text-walnut">
              Timber Price
              <br />
              <span className="text-ochre">Calculator</span>
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-base text-ink-soft/80 leading-relaxed">
              Add your requirements below — CFT is calculated instantly. Send the
              full list to us on WhatsApp for final pricing.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Wood types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {WOODS.map((w) => (
              <div
                key={w.name}
                className="flex items-center justify-between p-4 rounded-xl bg-paper border border-walnut/5"
              >
                <div>
                  <div className="font-[family:var(--font-display)] font-bold text-walnut">
                    {w.name}
                  </div>
                  <div className="text-xs text-ink-soft/60">
                    ₹{w.rate.toLocaleString("en-IN")}/cu.ft
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-green/10 text-green text-[10px] font-bold uppercase tracking-wider">
                  Available
                </span>
              </div>
            ))}
          </motion.div>

          {/* Calculation sheet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl bg-paper border border-walnut/5 shadow-lg shadow-walnut/5 p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="font-[family:var(--font-display)] font-bold text-xl text-walnut flex items-center gap-2">
                  <FileSpreadsheet size={18} className="text-ochre" />
                  Cut-Size Calculation Sheet
                </h2>
                <p className="text-xs text-ink-soft/60 mt-1">
                  Length in feet · Width & Thickness in inches
                </p>
              </div>
              <button
                onClick={addRow}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-walnut text-paper text-xs font-semibold hover:bg-walnut-2 transition-colors"
              >
                <Plus size={14} />
                Add Row
              </button>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] text-ink-soft/60 font-semibold tracking-wider uppercase border-b border-walnut/10">
                    <th className="text-left pb-3 pr-3">Timber Type</th>
                    <th className="text-left pb-3 pr-3">Length (ft)</th>
                    <th className="text-left pb-3 pr-3">Width (in)</th>
                    <th className="text-left pb-3 pr-3">Thickness (in)</th>
                    <th className="text-left pb-3 pr-3">Qty</th>
                    <th className="text-right pb-3 pr-3">Cubic Feet</th>
                    <th className="w-10 pb-3" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} className="border-b border-walnut/5">
                      <td className="py-2.5 pr-3">
                        <select
                          value={it.type}
                          onChange={(e) => update(it.id, "type", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-panel border border-walnut/10 focus:border-ochre/40 outline-none text-sm text-ink"
                        >
                          {WOODS.map((w) => (
                            <option key={w.name}>{w.name}</option>
                          ))}
                        </select>
                      </td>
                      {(["length", "width", "thickness", "qty"] as const).map(
                        (k) => (
                          <td key={k} className="py-2.5 pr-3">
                            <input
                              type="text"
                              inputMode="decimal"
                              value={it[k]}
                              onChange={(e) => update(it.id, k, e.target.value)}
                              className="w-20 px-3 py-2 rounded-lg bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none font-mono text-sm text-ink"
                            />
                          </td>
                        ),
                      )}
                      <td className="py-2.5 pr-3 text-right font-mono font-semibold text-ochre whitespace-nowrap">
                        {cftOf(it).toFixed(2)} cft
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => delRow(it.id)}
                          className="p-2 rounded-lg text-ink-soft/30 hover:text-danger hover:bg-danger/5 transition-colors"
                          aria-label="Remove row"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="rounded-xl border border-walnut/10 p-4 bg-panel/40"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <select
                      value={it.type}
                      onChange={(e) => update(it.id, "type", e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-paper border border-walnut/10 focus:border-ochre/40 outline-none text-sm text-ink"
                    >
                      {WOODS.map((w) => (
                        <option key={w.name}>{w.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => delRow(it.id)}
                      className="p-2 rounded-lg text-ink-soft/40 hover:text-danger transition-colors"
                      aria-label="Remove row"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        ["length", "Length (ft)"],
                        ["width", "Width (in)"],
                        ["thickness", "Thickness (in)"],
                        ["qty", "Quantity"],
                      ] as const
                    ).map(([k, label]) => (
                      <div key={k}>
                        <label className="block text-[10px] font-semibold tracking-wider uppercase text-ink-soft/60 mb-1">
                          {label}
                        </label>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={it[k]}
                          onChange={(e) => update(it.id, k, e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-paper border border-walnut/10 focus:border-ochre/40 outline-none font-mono text-sm text-ink"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-center py-2 rounded-lg bg-paper">
                    <span className="text-xs text-ink-soft/60 mr-2">
                      Cubic Feet:
                    </span>
                    <span className="font-mono font-bold text-ochre">
                      {cftOf(it).toFixed(2)} cft
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-walnut/5 to-ochre/5 border border-ochre/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-[family:var(--font-display)] font-bold text-walnut">
                  Total Requirements
                </h3>
                <p className="text-xs text-ink-soft/60">
                  {items.length} item{items.length !== 1 ? "s" : ""} · final
                  price confirmed on WhatsApp
                </p>
              </div>
              <div className="text-right">
                <div className="font-[family:var(--font-display)] font-bold text-3xl text-ochre leading-none">
                  {totalCft.toFixed(2)} cft
                </div>
                {totalEst > 0 && (
                  <div className="text-sm text-ink-soft mt-1">
                    Est. ₹{Math.round(totalEst).toLocaleString("en-IN")}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Customer info + send */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl bg-paper border border-walnut/5 shadow-lg shadow-walnut/5 p-6 sm:p-8"
          >
            <h2 className="font-[family:var(--font-display)] font-bold text-xl text-walnut flex items-center gap-2 mb-5">
              <User size={18} className="text-ochre" />
              Your Details <span className="text-xs font-normal text-ink-soft/50">(optional)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none text-ink placeholder:text-ink-soft/30"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none text-ink placeholder:text-ink-soft/30"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery address / city"
                className="px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none text-ink placeholder:text-ink-soft/30"
              />
            </div>
            <button
              onClick={sendWhatsApp}
              disabled={!hasData}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-green text-paper text-sm font-semibold hover:bg-green/90 transition-all active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-green/20"
            >
              <Send size={16} />
              Send Requirements on WhatsApp
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
