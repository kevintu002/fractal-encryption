import React, { useState, useEffect } from 'react';

export default function FractalEncryption() {
  // list of ids to fetch for sell price
  const outputDict = {
    24294: {
      name: 'Vial of Potent Blood',
      data: 3400
    },
    24341: {
      name: 'Large Bone',
      data: 3280
    },
    24350: {
      name: 'Large Claw',
      data: 3440
    },
    24276: {
      name: 'Pile of Incandescent Dust',
      data: 3230
    },
    24356: {
      name: 'Large Fang',
      data: 3555
    },
    24288: {
      name: 'Large Scale',
      data: 3260
    },
    24299: {
      name: 'Intricate Totem',
      data: 3480
    },
    24282: {
      name: 'Potent Venom Sac',
      data: 3605
    },
    49424: {
      name: '+1 Agony Infusion',
      data: 22523
    }
  }
  // list of ids to fetch for buy price
  const inputDict = {
    73248: {
      name: 'Stablizing Matrix',
      data: 0
    },
    75919: {
      name: 'Fractal Encryption',
      data: 0
    }
  }
  const [sellPrices, setSellPrices] = useState(null)
  const [buyPrices, setBuyPrices] = useState(null)

  const [matSum, setMatSum] = useState(0)
  const [totalOutput, setTotalOutput] = useState(0)
  const [trueValue, setTrueValue] = useState(0)
  const [cost, setCost] = useState(0)
  
  const totalBoxes = 10000
  const junkValue = 42729000

  useEffect(() => {
    const idList = Object.keys(outputDict).concat(Object.keys(inputDict))
    let url = 'https://api.guildwars2.com/v2/commerce/prices?ids=' 
    let endpoint = `${url}${idList}`

    fetch(endpoint)
      .then(response => response.json())
      .then(jsonResponse => {
        for (let i of jsonResponse) {
          // populate dicts with their buy/sell price
          const id = i.id
          if (id in outputDict) {
            outputDict[id] = {...outputDict[id], ...{sellPrice: i.sells.unit_price}}
          }
          if (id in inputDict)
            inputDict[id] = {...inputDict[id], ...{buyPrice: i.buys.unit_price}}
        }

        const newSellPrices = Object.values(outputDict).map(i => i.sellPrice)
        const newBuyPrices = Object.values(inputDict).map(i => i.buyPrice)
        const dataList = Object.values(outputDict).map(i => i.data)
        
        // calculate the material sum
        for (let i = 0; i < newSellPrices.length; i++) {
          setMatSum(prev => prev + newSellPrices[i] * dataList[i])
        }

        // update display states
        setSellPrices(newSellPrices)
        setBuyPrices(newBuyPrices)
      }, error => {
        console.log(error)
      })
  }, [])

  // calculates and update cells that depend on the fetch requests
  useEffect(() => {
    if (matSum && buyPrices) {
      const newTotal = matSum + junkValue
      const newTrueValue = newTotal / totalBoxes
      const newCost = buyPrices.reduce((a,b) => a+b, 0)
  
      setTotalOutput(newTotal)
      setTrueValue(newTrueValue)
      setCost(newCost)
    }
  }, [matSum, buyPrices])

  return (
    <div>
      <h1>Fractal Encryption</h1>

      <table>
        <thead>
          <tr>
            <th className="row-name">Boxes: {totalBoxes}</th>

            {Object.values(outputDict).map(i => 
              <th key={i.name}>{i.name}</th>
            )}
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="row-name">Sell price (coin)</th>

            {sellPrices 
              ? sellPrices.map((i, index) => 
                <td key={index}>{i}</td>) 
              : null
            }
          </tr>
          <tr>
            <th className="row-name">Count</th>

            {Object.entries(outputDict).map(([key, value]) => 
              <td key={key}>{value.data}</td>
            )}
          </tr>
          <tr>
            <th className="row-name">T5 sum (coin)</th>

            <td colSpan={sellPrices ? sellPrices.length : '0'}>{matSum}</td>
          </tr>
          <tr>
            <th className="row-name">Junk value (coin)</th>

            <td>{junkValue}</td>
          </tr>
          <tr>
            <th className="row-name">Total (coin)</th>

            <td id="totalOutput" colSpan='2'>{totalOutput}</td>
            <th>Total Cost</th><th>Stablizing Matrix</th><th>Fractal Encryption</th>
            <td colSpan='5'></td>
          </tr>
          <tr>
            <th className="row-name">Value per box (coin)</th>

            <td id="trueValue" colSpan='2'>{trueValue}</td>
            <td id="cost">{cost}</td>
            {buyPrices 
              ? buyPrices.map((i, index) => 
                <td key={index}>{i}</td>) 
              : null
            }
          </tr>
          <tr>
            <th className="row-name">Should I Buy?</th>

            <td>{trueValue - cost > 0 ? `Yes` : `No`}</td>
            <td colSpan={sellPrices ? sellPrices.length : '0'}>{Math.floor(trueValue - cost)}</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

