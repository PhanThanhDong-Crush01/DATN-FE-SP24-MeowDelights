import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'

const QRCodeScanner = () => {
    const [result, setResult] = useState(null)
    const [scanning, setScanning] = useState(false)

    const handleScan = (data: any) => {
        if (data) {
            setResult(data)
            setScanning(false)
        }
    }

    const handleError = (error: any) => {
        console.error(error)
    }

    const startScanning = () => {
        setScanning(true)
    }

    return (
        <div>
            {/* {scanning ? (
                //<QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
            ) : (
                //<button onClick={startScanning}>Bắt đầu quét mã vạch</button>
            )} */}
            {result && <p>{result}</p>}
        </div>
    )
}

export default QRCodeScanner
