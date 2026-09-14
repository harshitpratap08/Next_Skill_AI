import React from 'react'

const deptNames = ['Official Statistics Division', 'Economic Statistics Wing', 'Social Statistics Wing', 'Data Informatics & Innovation Division', 'Regional Office - North', 'Regional Office - South']

function cellColor(v: number) {
  if (v >= 75) return 'bg-emerald-600'
  if (v >= 55) return 'bg-emerald-500'
  if (v >= 40) return 'bg-amber-400'
  return 'bg-rose-400'
}

export function WorkforceHeatmap({ competencyLabels, matrix }: { competencyLabels: string[]; matrix: number[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr>
            <th className="text-left font-medium text-slate-500 pb-2 pr-3">Department</th>
            {competencyLabels.map((c) => (
              <th key={c} className="font-medium text-slate-500 pb-2 px-1 text-center">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {deptNames.map((dept, r) => (
            <tr key={dept}>
              <td className="pr-3 py-1 text-slate-600 whitespace-nowrap">{dept}</td>
              {matrix[r]?.map((val, c) => (
                <td key={c} className="p-1">
                  <div className={`h-9 w-full rounded-md ${cellColor(val)} flex items-center justify-center text-white font-semibold`}>
                    {val}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
