import React, { useState, useEffect } from 'react';

export default function FractalEncryption() {
  const itemDict = {
    blood: {
      id: 24294,
      data: 3400
    },
    bone: {
      id: 24341,
      data: 3280
    },
    claw: {
      id: 24350,
      data: 3440
    },
    dust: {
      id: 24276,
      data: 3230
    },
    fang: {
      id: 24356,
      data: 3555
    },
    scale: {
      id: 24288,
      data: 3260
    },
    totem: {
      id: 24299,
      data: 3480
    },
    venom: {
      id: 24282,
      data: 3605
    },
    agony: {
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

  // function main() {
    // let dataTotal = data.reduce((a, b) => a+b, 0) - data[data.length - 1];

    // let table = getElem("table");

    // populate sell value and product
    // for (let i = 0; i < IDs.length; i++) {
    //   // $.getJSON("https://api.guildwars2.com/v2/commerce/prices/" + IDs[i], function (item) {
    //   //   let sellOrder = item.sells.unit_price;
    //   //   let product = data[i] * sellOrder;

    //   //   table.rows[3].cells[i + 1].innerHTML = product;
    //   //   getElem("cost" + i).innerHTML = sellOrder;

    //   //   updateTotal(product, dataTotal);
    //   //   // getElem("boxAvg").innerHTML = getElem("boxAvg") * dataTotal + product;
    //   // });
    // }

    // count row
    // for (let i = 0; i < table.rows[0].cells.length - 1; i++) {
    //   table.rows[2].cells[i + 1].innerHTML = data[i];
    // }

    // getElem("junkAvg").innerHTML = Math.floor(junkValue / boxes);
    // getElem("boxAvg").innerHTML = junkValue;
  // }

  // const updateTotal = (product, dataTotal) => {
  //   let x = product + parseFloat(getElem("total").innerHTML);
  //   getElem("total").innerHTML = x;
  //   // getElem("boxAvg").innerHTML /= getElem("boxAvg") * dataTotal + x;
  // }

  // const getElem = (e) => {
  //   return document.getElementById(e);
  // }

  // getElem("boxAvg").innerHTML = getElem("junkValue").innerHTML + parseInt(getElem("total"));
  // console.log(getElem("total"));

  return (
    <div>
      <h1>Fractal Encryptions</h1>

      <table id="table">
        <thead>
          <tr>
            <th id="boxes">Boxes: {totalBoxes}</th>
            {/* <!--<th>Potent Blood</th><th>Large Bone</th><th>Large Claw</th><th>Incandescent Dust</th>-->
            <!--<th>Large Fang</th><th>Large Scale</th><th>Intricate Totem</th><th>Potent Venom</th>--> */}
            <th>Blood</th><th>Bone</th><th>Claw</th><th>Dust</th>
            <th>Fang</th><th>Scale</th><th>Totem</th><th>Venom</th>
            <th>+1 Agony</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th align="left">Sell price (coin)</th>
            {sellPrices ? sellPrices.map((i, index) => <td key={index}>{i}</td>) : null}
            {/* <td id="cost0"></td><td id="cost1"></td><td id="cost2"></td><td id="cost3"></td>
            <td id="cost4"></td><td id="cost5"></td><td id="cost6"></td><td id="cost7"></td>
            <td id="cost8"></td> */}
          </tr>
          <tr>
            <th align="left">Count</th>
            {Object.entries(itemDict).map(([key, value]) => <td key={key}>{value.data}</td>)}
          </tr>
          {/* <tr>
            <th align="left">Product (c)</th>
            <td></td><td></td><td></td><td></td>
            <td></td><td></td><td></td><td></td>
            <td></td>
          </tr> */}
          <tr>
            <th align="left">T5 sum (coin)</th>
            <td id="total">{matSum}</td>
          </tr>

          <tr>
            <th align="left">Junk value (coin)</th>
            <td id="junkValue">{junkValue}</td>
          </tr>
          {/* <!--<tr><th align="left">Box avg (c)</th><td id="boxAvg">0</td></tr>--> */}
        </tbody>
      </table>
      <br/>
      <table>
        <thead>
          <tr>
            <th align="left">Stablizing Matrix</th>
            <td id="junkAvg"></td>
          </tr>

          <tr>
            <th align="left">Fractal Encryption</th>
          </tr>
        </thead>
      </table>

    </div>
  );
}

