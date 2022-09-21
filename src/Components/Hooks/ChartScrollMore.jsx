import {useEffect, useState, useRef} from 'react'
import VirtualScroll from "virtual-scroll";


export const useChartScroll = ( {ref , data } ) => {

    const win_start = useRef()
    const [visible_data, setVisData] = useState(data)

    const win_size = 2;

    const [ movX, setX] = useState(0);


    const handleScroll =  (e) => {
        const x = e.deltaX;
        setX(x)
      } 

    useEffect(() => {

    win_start.current = 0;

    if(ref.current)
        {
            const  vs = new VirtualScroll( {el : ref.current} )
            vs.on(  e => handleScroll(e) )
            const temp_data = data.slice(win_start.current,win_start.current+win_size)
            setVisData(temp_data)
        }
    } , [data])


    useEffect(( ) => {

        const debounce =   setTimeout(( )=> {
                if(movX != 0)
                if(movX <= 0 && win_start.current > 0 )
                {   
                    win_start.current-- ; 
                }
                    else
                if( movX > 0 && win_start.current + win_size + 1 < data.length ) {
                    win_start.current++ ; 
                }
                const temp_data = data.slice(win_start.current,win_start.current+win_size)
                console.log(visible_data)
                setVisData(temp_data)
                console.log("win_start.current  : ", win_start.current, data.length)

        } , 200)
    
        return () => {
          clearTimeout(debounce)
        }
    
      }, [movX] ) 

    return visible_data

}