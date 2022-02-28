import { Center, Grid, SegmentedControl } from "@mantine/core";
import { Component, useState } from "react";
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
import GraphController from "./graphController";

class GraphDash extends Component{

    constructor(props) {
        super(props);

        this.state = {
            games: [],
            graphType: props.type,
        };
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.graphType !== this.props.graphType){
            this.setState({          
                graphType: this.props.graphType
            });
            this.forceUpdate();
        }
    }

    render() {
        return (
            <Grid>
                <Grid.Col span={12} justify="center" align="center">
                    <SegmentedControl
                        data={[
                            { label: 'Most Popular', value: 'Popular' },
                            { label: 'Highest Rating', value: 'Rating-High' },
                            { label: 'Most Sold', value: 'Sale-Most' },
                            ]}
                            onChange={(value) => {
                                this.setState({ graphType: value })
                        }}    
                    />
                    
                </Grid.Col>

                <Grid.Col>
                    <GraphController type = {this.state.graphType} />
                </Grid.Col>
            </Grid>
        )
    }

}

export default GraphDash;