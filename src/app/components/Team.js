import React from "react";
import { teamData } from "../data/teamData";
import ReusableInfoBlock from "./ReusableInfoBlock";

const Team = () => {
    return (
        <ReusableInfoBlock title="Team">

            <div className="text-gray-600 mb-8">Innovative team driving impactful solutions through collaboration and diversity. Together, we thrive, exceed expectations, and make a lasting impact.</div>

            {teamData.map((member, idx) => (
                <div className="bg-sky-100 rounded-lg flex mb-6 p-3" key={idx}>
                    <div className="flex flex-col mx-4">
                        <img className="w-24 rounded-lg self-center" src="https://antonjames.dev/images/profile_pic.jpg"></img>
                        <div className="font-semibold text-center text-sm">{member.name}</div>
                        <div className="text-gray-500 text-xs text-center">{member.title}</div>
                    </div>
                    <div className="w-4/5  self-center text-sm ml-4">
                        {member.description}
                    </div>
                </div>
            ))}
        </ReusableInfoBlock>
    )
}

export default Team;