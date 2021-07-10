import React, { useState, useEffect } from 'react';

export default function FractalEncryption() {
  const itemDict = {
    'Vial of Potent Blood': {
      id: 24294,
      data: 3400
    },
    'Large Bone': {
      id: 24341,
      data: 3280
    },
    'Large Claw': {
      id: 24350,
      data: 3440
    },
    'Pile of Incandescent Dust': {
      id: 24276,
      data: 3230
    },
    'Large Fang': {
      id: 24356,
      data: 3555
    },
    'Large Scale': {
      id: 24288,
      data: 3260
    },
    'Intricate Totem': {
      id: 24299,
      data: 3480
    },
    'Potent Venom Sac': {
      id: 24282,
      data: 3605
    },
    '+1 Agony Infusion': {
      id: 49424,
      data: 22523
    }
  }
  const [sellPrices, setSellPrices] = useState(null)
  const [matSum, setMatSum] = useState(0)
  const totalBoxes = 10000
  const junkValue = 42729000

  console.log(sellPrices)

  useEffect(() => {
    const idList = Object.entries(itemDict).map(([key, value]) => value.id)
    const url = 'https://api.guildwars2.com/v2/commerce/prices?ids=' 
    const endpoint = `${url}${idList}`

    fetch(endpoint)
      .then(response => response.json())
      .then(jsonResponse => {
        const newSellPriceArr = jsonResponse.map(i => i.sells.unit_price)
        const dataList = Object.values(itemDict).map(i => i.data)

        for (let i = 0; i < newSellPriceArr.length; i++) {
          setMatSum(prev => prev + newSellPriceArr[i] * dataList[i])
        }

        setSellPrices(newSellPriceArr)
      }, error => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <h1>Fractal Encryptions</h1>

      <table>
        <thead>
          <tr>
            <th className="row-name">Boxes: {totalBoxes}</th>
            {Object.keys(itemDict).map(i => <th key={i}>{i}</th>)}
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="row-name">Sell price (coin)</th>
            {sellPrices ? sellPrices.map((i, index) => <td key={index}>{i}</td>) : null}
          </tr>
          <tr>
            <th className="row-name">Count</th>
            {Object.entries(itemDict).map(([key, value]) => <td key={key}>{value.data}</td>)}
          </tr>
          <tr>
            <th className="row-name">T5 sum (coin)</th>
            <td colSpan={sellPrices ? sellPrices.length : '0'}>{matSum}</td>
          </tr>
          <tr>
            <th className="row-name">Junk value (coin)</th>
            <td colSpan='2'>{junkValue}</td>
            <th>Stablizing Matrix</th><th>Fractal Encryption</th>
          </tr>
          <tr>
            <th className="row-name">Total (g)</th>
            <td colSpan='2'>{matSum + junkValue}</td>
            <td>{}</td>
            <td colSpan={sellPrices ? sellPrices.length : '0'}></td>
          </tr>
        </tbody>
      </table>
      <br/>

      <table>
        <thead>
          <tr>
            <th></th>
            <th className="row-name">Stablizing Matrix</th>
            <th className="row-name">Fractal Encryption</th>
            <td id="junkAvg"></td>
          </tr>

          <tr>
            
          </tr>
        </thead>
      </table>

    </div>
  );
}

