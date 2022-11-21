import React, { useRef } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Svg, { Circle, G, Text as SvgText, Line } from "react-native-svg";

import ProgressBar from "../Progress/index";

export default function Index(props) {
  const graphSection = useRef();

  const getNewPoint = (x: number, height: number) => {
    let newX = height - x;
    return newX;
  };

  const getXpoints = (object: any) => {
    const { valuesCount, width, gap } = object;
    const graphXrange = width - gap * 2;
    const distanceBetweenPoint = graphXrange / (valuesCount - 1);
    let xPointsArray = [];

    for (let i = 0; i < valuesCount; i++) {
      const xPoint = gap + distanceBetweenPoint * i;
      xPointsArray.push(xPoint);
    }

    return xPointsArray;
  };

  const getYpoints = (object: any) => {
    const { height, gap, graphData } = object;

    const graphYrange = height - gap * 2;

    let min = graphData[0];
    let max = graphData[0];

    for (let i = 1; i < graphData.length; i++) {
      if (graphData[i] > max) {
        max = graphData[i];
      }

      if (graphData[i] < min) {
        min = graphData[i];
      }
    }

    const pointsRange = max - min;

    let factor = 1;
    if (pointsRange !== 0) {
      factor = graphYrange / pointsRange;
    }

    let yPointsArray: any[] = [];

    graphData.map((data: any) => {
      const value = data;

      let yPoint = gap + (value - min) * factor;
      yPoint = height - yPoint;
      yPointsArray.push(yPoint);
    });

    return yPointsArray;
  };

  const calculateFactor = (graphRange: number, graphData: any[]) => {
    let min = graphData[0].value;
    let max = graphData[0].value;

    for (let i = 1; i < graphData.length; i++) {
      if (graphData[i].value > max) {
        max = graphData[i].value;
      }

      if (graphData[i].value < min) {
        min = graphData[i].value;
      }
    }

    const pointsRange = max - min;

    const factor = graphRange / pointsRange;

    return factor;
  };
  console.log("props.data: ", props.data);
  if (!props.progressBar) {
    return <View></View>;
  }

  if (props.progressBar.length === 0) {
    return <View>{/* <Text>Empty</Text> */}</View>;
  }

  let progressBarHTML: any = [];
  let graphData = props.graph;
  let progessBarData = props.progressBar;
  const currency = props.currency;
  if (progessBarData && progessBarData.length !== 0) {
    progessBarData.map((progessBar: any) => {
      const year = progessBar.name;
      const saving = progessBar.savings;
      const percentage = (saving / progessBar.totalSavings) * 100;

      progressBarHTML.push(
        <ProgressBar
          progress={percentage}
          text={`${currency} ${saving}`}
          headText={year}
        />
      );
    });
  }

  const graphSectionWidth = Dimensions.get("window").width - 30;
  const graphWidth = graphSectionWidth - 20;
  const graphHeight = graphSectionWidth * 0.5;
  const active: string = "test";

  const p1x = 10;
  let p1y = 50;
  let xPointsArray = [];
  let yPointsArray = [];
  let dotsHTML = [];
  let linesHTML = [];
  let textHTML = [];

  if (graphData && graphData.length > 1) {
    const xObject = {
      valuesCount: graphData.length,
      width: graphWidth,
      gap: 20,
    };

    xPointsArray = getXpoints(xObject);
    const yObject = {
      graphData: graphData,
      height: graphHeight,
      gap: 20,
    };

    yPointsArray = getYpoints(yObject);

    const pointsCount = yPointsArray.length;

    //dots  & text html
    for (let i = 0; i < pointsCount; i++) {
      dotsHTML.push(
        <G>
          <Circle
            cx={xPointsArray[i]}
            cy={yPointsArray[i]}
            r="4"
            fill="#60BDA9"
          />
        </G>
      );

      if (i + 1 === pointsCount) {
        textHTML.push(
          <G>
            <SvgText
              x={xPointsArray[i] - 50}
              y={yPointsArray[i] - 10}
              fill="black"
              font-size="10"
              transform="translate(0,0)"
            >
              {currency} {graphData[i]}
            </SvgText>
          </G>
        );
      } else
        textHTML.push(
          <G>
            <SvgText
              x={xPointsArray[i] - 10}
              y={yPointsArray[i] - 10}
              fill="black"
              font-size="10"
              transform="translate(0,0)"
            >
              {currency} {graphData[i]}
            </SvgText>
          </G>
        );
    }

    for (let i = 0; i < pointsCount - 1; i++) {
      linesHTML.push(
        <Line
          x1={xPointsArray[i]}
          y1={yPointsArray[i]}
          x2={xPointsArray[i + 1]}
          y2={yPointsArray[i + 1]}
          style={{
            stroke: "#60BDA9",
            strokeWidth: 3,
            animation: "move 3s linear",
          }}
        />
      );
    }
  }

  return (
    <View>
      <View style={styles.graphContainer}>
        <Svg height={graphHeight} width={graphWidth}>
          {dotsHTML}

          {linesHTML}

          {textHTML}
        </Svg>

        <View
          style={{
            height: 5,
            overflow: "hidden",
            backgroundColor: "#F0F0F0",
            marginBottom: 10,
            marginTop: 10,
          }}
        />

        {progressBarHTML}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  graphContainer: {
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    height: 486,
    borderRadius: 5,
  },
});
