import React from 'react';
import PsnrResultsChart from './charts/psnrChart';
import FrameSkipResultsChart from './charts/frameSkipChart';

/**
 * Component for displaying the top-level dashboard
 */
class Dashboard extends React.Component {
    /**
     * @inheritdoc
     */
    render() {
        return (
            <div>
                <PsnrResultsChart />
                <FrameSkipResultsChart />
            </div>
        );
    }
}

export default Dashboard;
