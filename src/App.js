import { useEffect, useState } from 'react';
import './App.css';
import { Html5QrcodeScanner } from 'html5-qrcode';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [product, setProducts] = useState({});
  const products = [
    {id: '00123456789101112133', name: 'OEM Air Conditioner 8', sn: 'OEM9', location: 'Distributor1',orderNumber: '00039388'}
  ]
  useEffect(() => {
    const success = (result) => {
      scanner.clear();
      setScanResult(result);
    };

    const error = (err) => {
      console.warn(err, 'Barcode error');
    };

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
    });

    scanner.render(success, error);
  }, []);
useEffect(() => {
  const isProductExist = products.find((prod) => prod.id === scanResult);
  if(isProductExist){
    setProducts(isProductExist);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [scanResult]);
const createCase = () => {
  // do what you want here
}
  return (
    <div className="App">
      <h1>
        Barcode Test
      </h1>
      {scanResult ? (
         <div style={{width: '400px', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
         <div style={{width: 'full', display: 'flex', justifyContent: 'space-between'}}>
           <div style={{display: 'flex', flexDirection: 'column'}}>
           <h2>Serial Number</h2>
           <h4>{product.sn}</h4>
           </div>
           <div style={{display: 'flex', flexDirection: 'column'}}>
           <h2>Product</h2>
           <h4>{product.name}</h4>
           </div>
           </div>
           <div style={{width: 'full', display: 'flex', justifyContent: 'space-between'}}>
           <div style={{display: 'flex', flexDirection: 'column'}}>
           <h2>Location</h2>
           <h4>{product.location}</h4>
           </div>
           <div style={{display: 'flex', flexDirection: 'column'}}>
           <h2>Order Number</h2>
           <h4>{product.orderNumber}</h4>
           </div>
           </div>
           <div style={{display: 'flex', gap: '20px', height: '20px'}}>
             <select >
               <option>Received - Good</option>
               <option>Received - Damaged</option>
             </select>
             <select placeholder='Location'>
               <option>Warehouse</option>
               <option>Distributor</option>
               <option>Test</option>
   
             </select>
             <select placeholder='Floor number'>
               <option>Floor 2</option>
               <option>Floor 3</option>
               <option>Floor 1</option>
             </select>
           </div>
           <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
           <h3>Take Snap</h3>
           <div style={{width: 'full', display: 'flex', justifyContent: 'space-between'}}>
             <button onClick={createCase}>Create case</button>
             <button>
               <input type='file' />
             </button>
           </div>
           </div>
         </div>
      ) : (
        <div id='reader'></div>
      )}
     
    </div>
  );
}

export default App;
