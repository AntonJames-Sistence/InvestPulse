import React from "react";
import { teamData } from "../data/teamData";
import ReusableTile from "./ReusableTile";
import Image from "next/image";

const Team = () => {
  return (
    <ReusableTile title="Team">
      <div className="text-gray-600 mb-8">
        Innovative team driving impactful solutions through collaboration and
        diversity. Together, we thrive, exceed expectations, and make a lasting
        impact.
      </div>

      {teamData.map((member, idx) => (
        <div
          className="bg-sky-100 rounded-lg flex flex-col lg:flex-row mb-6 p-4 lg:p-3"
          key={idx}
        >
          <div className="flex flex-col mx-4">
            <Image
              className="w-24 rounded-lg self-center"
              priority={false}
              height={500}
              width={500}
              src={member.img}
              alt={`${member.name} photo`}
            />
            <div className="font-semibold text-center text-sm mt-2 lg:mt-0">
              {member.name}
            </div>
            <div className="text-gray-600 text-xs text-center mb-2 lg:mb-2">
              {member.title}
            </div>
          </div>
          <div className="w-full lg:w-4/5 self-center text-sm mx-4 lg:ml-4">
            {member.description}
          </div>
        </div>
      ))}
    </ReusableTile>
  );
};

export default Team;
