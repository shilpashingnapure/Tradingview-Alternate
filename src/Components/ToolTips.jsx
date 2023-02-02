import React from "react";
import {
    OHLCTooltip,
    SingleValueTooltip,
} from "react-financial-charts";
export const Tooltips = ({singleValueToolTip , yEdgeIndicator})=>{


    return (
        <>
        {/* SHOWING DATA OPEN/CLOSE/HIGH/LOW  */}
        <OHLCTooltip
                origin={[400, 10]}
                fontSize={13}
                fontWeight={600}
              />
              <SingleValueTooltip
                yLabel={'Price'}
                yAccessor={yEdgeIndicator}
                displayValuesFor={singleValueToolTip}
              />
        </>
    )
}