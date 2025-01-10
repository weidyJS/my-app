import React from "react";
import { useParams } from "react-router-dom";


interface MatchParams {
  touristRouteId: string,
  other : string
}

export const DetailPage: React.FC = () => {
  var params = useParams<keyof MatchParams>();
  return <h1>旅游路线详情页, 路线id: {params.touristRouteId} {params.other}</h1>;
};