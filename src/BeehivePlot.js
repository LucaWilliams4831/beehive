import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
import PropTypes from 'prop-types';
const StyledBeehivePlot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
<script src="https://d3js.org/d3-hexbin.v0.2.min.js"></script>
const BeehivePlot = ({ data }) => {
  const ref = useRef(null);
  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, radius]);
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format('.2s'));
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${radius})`)
      .call(xAxis);
    const yScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, radius]);
    const yAxis = d3
      .axisLeft(yScale)
      .tickFormat((d, i) => i + 1)
      .tickSizeOuter(0);
    svg.append('g').attr('class', 'y-axis').call(yAxis);
    const circle = d3.symbol().type(d3.symbolCircle).size(60);
    const bins = hexbin()
      .radius(radius / 15)
      .x(d => xScale(d))
      .y((d, i) => yScale(i))
      .extent([[0, 0], [width, height]])(data);
    svg
      .append('g')
      .attr('class', 'circles')
      .selectAll('path')
      .data(bins)
      .enter()
      .append('path')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .attr('d', circle)
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .append('image')
      .attr('href', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fdesitrucking.com%2Fwp-content%2Fuploads%2F2020%2F10%2FHAR8621-1-680x1024.jpg&tbnid=CF1MzT390E6oIM&vet=12ahUKEwik7pD0rqD-AhWRwCoKHTtaDYEQMygKegUIARDoAQ..i&imgrefurl=https%3A%2F%2Fdesitrucking.com%2Fdev-mangat%2F&docid=NBPDJqd6UTcAeM&w=680&h=1024&q=canada%20IT%20dev%20photo&ved=2ahUKEwik7pD0rqD-AhWRwCoKHTtaDYEQMygKegUIARDoAQ')
      .attr('width', 20)
      .attr('height', 20);
  }, [data]);
  return <StyledBeehivePlot ref={ref} />;
};
BeehivePlot.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default BeehivePlot;