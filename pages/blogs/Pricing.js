import React, {memo} from "react";

const fields=["Bene fits", "Free", "$XX Quarterly", "Collectors"];
const values=[
  ["Max Server Followed", "5", "Unlimited", "Unlimited"],
  ["Annoucement Stored", "1 Mounth", "Unlimited", "Unlimited"],
  ["Max Server Calendar Reminders", "None", "Unlimited", "Unlimited"],
];

function Pricing() {
  return (
    <div className="w-full flex items-center text-center">
      <table className="w-full m-10 border-collapse border border-slate-400 table-auto">
        <caption className="mb-5 text-[#701a75] font-bold text-[20px]">
          Pricing
        </caption>
        <thead className="">
          <tr className="">
            {fields.map((field, key)=>
                <th className="py-5 text-green-600 border border-slate-300" key={key}>
                  {field}
                </th>
            )}
          </tr>
        </thead>
        <tbody>
          {values.map((value, key)=>
              <tr key={key}>
                {value.map((item, key)=>
                    <td className="py-3 border border-slate-300"  key={key}>
                      {item}
                    </td>
                )}
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default memo(Pricing);