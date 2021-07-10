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
            <th className='row-name'>Boxes: {totalBoxes}</th>
            {/* <!--<th>Potent Blood</th><th>Large Bone</th><th>Large Claw</th><th>Incandescent Dust</th>-->
            <!--<th>Large Fang</th><th>Large Scale</th><th>Intricate Totem</th><th>Potent Venom</th>--> */}
            {Object.keys(itemDict).map(i => <th key={i}>{i}</th>)}
            {/* <th>Blood</th><th>Bone</th><th>Claw</th><th>Dust</th>
            <th>Fang</th><th>Scale</th><th>Totem</th><th>Venom</th>
            <th>+1 Agony</th> */}
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className='row-name'>Sell price (coin)</th>
            {sellPrices ? sellPrices.map((i, index) => <td key={index}>{i}</td>) : null}
            {/* <td id="cost0"></td><td id="cost1"></td><td id="cost2"></td><td id="cost3"></td>
            <td id="cost4"></td><td id="cost5"></td><td id="cost6"></td><td id="cost7"></td>
            <td id="cost8"></td> */}
          </tr>
          <tr>
            <th className='row-name'>Count</th>
            {Object.entries(itemDict).map(([key, value]) => <td key={key}>{value.data}</td>)}
          </tr>
          {/* <tr>
            <th align="left">Product (c)</th>
            <td></td><td></td><td></td><td></td>
            <td></td><td></td><td></td><td></td>
            <td></td>
          </tr> */}
          <tr>
            <th className='row-name'>T5 sum (coin)</th>
            <td id="total">{matSum}</td>
          </tr>

          <tr>
            <th className='row-name'>Junk value (coin)</th>
            <td id="junkValue">{junkValue}</td>
          </tr>
          {/* <!--<tr><th align="left">Box avg (c)</th><td id="boxAvg">0</td></tr>--> */}
        </tbody>
      </table>
      <br/>
      <table>
        <thead>
          <tr>
            <th></th>
            <th className='row-name'>Stablizing Matrix</th>
            <th className='row-name'>Fractal Encryption</th>
            <td id="junkAvg"></td>
          </tr>

          <tr>
            
          </tr>
        </thead>
      </table>

    </div>
  );
}

