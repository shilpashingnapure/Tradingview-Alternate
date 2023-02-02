import { ClickCallback } from "react-financial-charts"
import React , { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleTool } from "../REDUX/action";

export function drawsLine(contextRef , element){
    contextRef.current.lineCap = 'round';
    contextRef.current.strokeStyle = '#2962ff';
    contextRef.current.fillStyle = 'green'
    contextRef.current.lineWidth = 2;

    contextRef.current.beginPath();
    // contextRef.current.arc(element.x1 , element.y1 , 5 , 0 , Math.PI * 2)
    contextRef.current.moveTo(element.x1 , element.y1)
    contextRef.current.lineTo(element.x2 , element.y2)
    contextRef.current.closePath()
    contextRef.current.stroke()
}

export const TrendLines = ({elements , setelements})=>{
    const [isDrawing , setIsdrawing] = useState(false)

    const dispatch = useDispatch()
    const {replay} = useSelector(state => state)

    function startDrawing({nativeEvent}){
        nativeEvent.preventDefault()
        const {offsetX , offsetY} = nativeEvent
        if(!replay){
          setelements(prev => [...prev , {x1:offsetX , y1:offsetY , x2:offsetX , y2:offsetY}])
        }
        setIsdrawing(true)

      }

      function draw(e){
        e.preventDefault()
        if(!isDrawing){
          return;
        }
        const {offsetX , offsetY} = e
        if(!replay){
          let index = elements.length - 1
          const {x1 , y1} = elements[index]
          const elementCopy = [...elements]
          elementCopy[index] = {x1 , y1 , x2:offsetX , y2:offsetY}
          setelements(elementCopy)
        }

      }

      function stopDrawing(e){
        e.preventDefault()
        setIsdrawing(false)
        dispatch(handleTool(null))
      }

    return <ClickCallback
    onMouseDown={startDrawing}
    onMouseMove={draw}
    onClick={stopDrawing}
    />
}