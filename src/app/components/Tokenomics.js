'use client';
import React from 'react';
import { VictoryPie} from 'victory';

const Tokenomics = () => {
    const data = [
        { x: '20%', y: 20 },
        { x: '80%', y: 80 }
    ];

    const colorScale = ['#FFA500', '#1E90FF'];

    const customLabelComponent = (props) => {
        const { datum } = props;
        return (
            <VictoryLabel
                {...props}
                text={`${datum.y}`}
            />
        );
    };
    
    return (
        <div className='h-40 flex bg-white rounded-lg'>
            <div></div>
            <div></div>

            <div>
                <VictoryPie
                    innerRadius={100}
                    data={data}
                    colorScale={colorScale}
                    labelComponent={<customLabelComponent />}
                />
            </div>

            <div></div>
            
        </div>
    );
}

export default Tokenomics;