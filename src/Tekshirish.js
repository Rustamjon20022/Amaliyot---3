import React, { useEffect }from 'react'
import Savdo from './componenta/Savdo/savdo';
import Mahsulotlar from './componenta/Maxsulotlar';

function Tekshirish ({updateUser}) {
    const [tekshirish, setTekshirish] = React.useState('')

    useEffect(() => {
        setTekshirish(localStorage.getItem("MyUser"))
    }, [])

  return (
    <div>
       {
           tekshirish === '"admin"' ? <Mahsulotlar updateUser={updateUser} /> : <Savdo/>
       }
    </div>
  )
}

export default Tekshirish