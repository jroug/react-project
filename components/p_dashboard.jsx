import React from "react";
import StatItem from "./w_StatItem.jsx";
import PanelMain from "./w_PanelMain.jsx";
 
class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = { stats: [], courses: [] };
    }

    componentDidMount() {
        fetch('http://localhost:3000/stats', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => { return response.json() })
        .then((myJson) => { this.setState({ stats: [...myJson] }) });

        fetch('http://localhost:3000/courses', {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then((response) => { return response.json() })
        .then((myJson) => { this.setState({courses: [...myJson]})});

     }

    render() {
        return (
            this.state.courses &&
            this.state.stats &&
            <div>
                <div className="row" style={{border: "1px solid red"}} >
                    {this.state.stats.map(item => (
                        <StatItem key={item.id} title={item.title} amount={item.amount} />
                    ))}
                </div>
                <PanelMain courses={this.state.courses} />
            </div>
        );
    }
}




export default Dashboard;