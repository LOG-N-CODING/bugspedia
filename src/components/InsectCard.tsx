// components/InsectCard.tsx
import React from "react";

import { InsectCardData } from "../types/Insect";

interface Props {
  insect: InsectCardData;
}

const InsectCard: React.FC<Props> = ({ insect }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-green-200" style={{ maxWidth: "265px", border: "1px solid #4CAF50",  }}>
      <img
      src={insect.image}
      alt={insect.name}
      className="rounded h-48 object-cover" style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
      <h2 className="text-xl font-bold mt-2 text-green-700">{insect.name}</h2>
      <p className="text-gray-600 text-sm">{insect.description}</p>
      <ul className="mt-2 text-sm" style={{listStylePosition: "inside", textAlign: "left", paddingLeft: "5px"}}>
        <li>
          <strong>Habitat:</strong> {insect.habitat}
        </li>
        <li>
          <strong>Behavior:</strong> {insect.behavior}
        </li>
        {insect.rarity && (
          <li>
            <strong>Rarity:</strong> {insect.rarity}
          </li>
        )}
      </ul>
    </div>
  );
};

export default InsectCard;
