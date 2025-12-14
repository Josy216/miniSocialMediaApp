import React, { useEffect, useState } from 'react'

function menu() {
    const [menu, setMenu] = useState([]);
    //fetch menu from https://abhotel.josephteka.com
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
    const handlefetch = async () => {
        const response = await fetch('https://abhotel.josephteka.com/menu');
        const data = await response.json();
        setMenu(data);
        setLoading(false);
    }

    handlefetch();

    },[])   


  return (
    //
    <div>
        <h1>Menu</h1>   
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div>
                {menu.map(item => (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>{item.price} kr</p>
                    </div>
                    ))}
            </div>
        )}

    </div>
  )
}

export default menu