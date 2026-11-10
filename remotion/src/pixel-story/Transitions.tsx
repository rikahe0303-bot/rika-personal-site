import React,{createContext} from 'react';
import {AbsoluteFill} from 'remotion';
import type {TransitionPresentation,TransitionPresentationComponentProps} from '@remotion/transitions';

export const SceneMotionContext=createContext({duration:150,last:false,lead:0});
export const MotionScene=({duration,last=false,lead=0,children}:{duration:number;last?:boolean;lead?:number;children:React.ReactNode})=><SceneMotionContext.Provider value={{duration,last,lead}}>{children}</SceneMotionContext.Provider>;

type FlowProps={axis:'x'|'y';distance:number;zoom:number};
const Flow=({children,presentationDirection,presentationProgress:p,passedProps}:{children:React.ReactNode}&TransitionPresentationComponentProps<FlowProps>)=>{
 const entering=presentationDirection==='entering';
 const offset=entering?1-p:-p;
 const opacity=entering?p:1-p;
 return <AbsoluteFill style={{opacity,translate:passedProps.axis==='x'?`${offset*passedProps.distance}px 0`:`0 ${offset*passedProps.distance}px`,scale:entering?1-passedProps.zoom*(1-p):1+passedProps.zoom*p,transformOrigin:'50% 45%'}}>{children}</AbsoluteFill>;
};
export const flow=(axis:FlowProps['axis']='x',distance=80,zoom=0):TransitionPresentation<FlowProps>=>({component:Flow,props:{axis,distance,zoom}});
