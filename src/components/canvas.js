import React, { useRef, useEffect, useCallback } from 'react'
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
const Canvas = props => {
    const minTempColor = (val) =>{
      for(let i = 9; i > 0 ; i--){
          const base =  ((i+1) * 5) -25
          if(base <= val){
            return blue[(10-i)*100]
          }
      }
      for(let i = 5; i < 9 ; i++){
          const base =  ((i+1) * 5)
          if(base <= val){
            return red[(i-1)*100]
          }
      }
      return blue[900]
    }
    const maxTempColor = (val) =>{
      for(let i = 1; i < 5 ; i++){
        const base =  (i * 5) -20
        if(base >= val){
          return blue[(i*100)]
        }
      }
      for(let i = 1; i < 10 ; i++){
          const base =  (i * 5) 
          if(base >= val){
            return red[i*100]
          }
      }
      return red[900]
    }
    const canvasRef = useRef(null)
    const girdWitdh = props.width /6
    const dataList = props.data
    const draw = useCallback((ctx, frameCount, girdWitdh) => {
      const p = Math.max(...dataList.map(val => val.max_temp)) * 1
      const Horizontal = 100 + p
      const textY =  Horizontal - 8
      const barW = girdWitdh  * .3
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      
      dataList.forEach((elment, index) => {
      
        ctx.beginPath()
        let ani = 5*Math.sin(frameCount*(0.0015 * elment.the_temp) )**2
        const l = girdWitdh * .1 + girdWitdh * index
        ctx.fillStyle = minTempColor(elment.min_temp)
        
        ctx.font =  girdWitdh < 65? "1.25rem Roboto,Helvetica,Arial,sans-serif" : "1rem Roboto,Helvetica,Arial,sans-serif";
        if(girdWitdh < 65){
           ctx.fillText(`${ Math.floor(elment.min_temp*10)/10}°`,
              l - girdWitdh * .1,
              elment.min_temp < 0?  textY + elment.the_temp *3 + ani + 24 : textY - elment.the_temp *3 + ani  );
        }
        else{
            ctx.fillText(`${ Math.floor(elment.min_temp*10)/10}°`, l,
              elment.min_temp < 0? textY + ani : textY - elment.min_temp *3 + ani);
        }
        ctx.fillRect( l,
           elment.min_temp < 0? Horizontal + ani: Horizontal,
           barW , elment.min_temp < 0? -elment.min_temp *3 - ani: -elment.min_temp *3 + ani);
        
        

        ctx.fillStyle = maxTempColor(elment.max_temp)
        if(girdWitdh < 65){
        ctx.fillText(`${ Math.floor(elment.max_temp*10)/10}°`,
          l - girdWitdh * .1 ,
          elment.max_temp < 0? textY + elment.the_temp *3 + ani : textY - elment.the_temp *3 + ani - 24 );
        }
        else{
          ctx.fillText(`${ Math.floor(elment.max_temp*10)/10}°`,
            l +girdWitdh * .4 ,
            elment.max_temp < 0? textY + ani: textY - elment.max_temp *3 + ani );
        }
        ctx.fillRect(girdWitdh * .5 + girdWitdh * index, Horizontal , barW , -elment.max_temp *3 + ani );
        ctx.closePath();

        const pieX = girdWitdh * .5 + girdWitdh * index - 8
        let pieY = Horizontal + girdWitdh * .5
        if(elment.min_temp < 0)
          pieY -= elment.min_temp *3
        const r = -Math.PI/2
        ctx.beginPath();
        ctx.fillStyle = '#7e57c2'
        ctx.moveTo( pieX, pieY );
        ctx.arc( pieX, pieY , girdWitdh / 2 -16, r, r + (Math.PI * 2 * (elment.humidity / 100)), false);
        ctx.lineTo( pieX, pieY );
       
        ctx.fill()
        ctx.closePath();

        if(girdWitdh > 65){
          const minArc = (girdWitdh / 3 - 16) > 5 ? (girdWitdh / 3 - 16)  : 32
          ctx.beginPath();
          ctx.moveTo( pieX, pieY );
          ctx.fillStyle = '#FFF'
          ctx.arc( pieX, pieY , minArc, r, r + (Math.PI * 2 * 1), false);
          ctx.lineTo( pieX, pieY );
          ctx.fill()
          ctx.closePath();
        }
        
        ctx.beginPath();
        ctx.fillStyle = '#512da8'
        ctx.font = "1.25rem Roboto,Helvetica,Arial,sans-serif";
      
        ctx.fillText(`${elment.humidity}%`, pieX - 18, girdWitdh < 65? 185: pieY +  4 );
        ctx.fill()
        ctx.closePath();
      });
     
    },[dataList])
    
    useEffect(() => {
      
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      let frameCount = 0
      let animationFrameId
      
      const render = () => {
        frameCount++
        
        draw(context, frameCount, girdWitdh)
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()
      
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }, [draw, girdWitdh])
    
    return <canvas ref={canvasRef} 
            width={girdWitdh < 65? props.width: (props.width -16) * 1.2}
            height={girdWitdh < 65? 200:props.height}/>

}

export default Canvas