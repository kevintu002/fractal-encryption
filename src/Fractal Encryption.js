import React, { useState } from 'react';

export default function Fractal_Encryption() {
  const [sum, setSum] = useState(0)

  function main() {
    // Blood	Bones	Claws	Dust	Fangs	Scales	Totems	Venom
    let IDs = [24294,24341,24350,24276,24356,24288,24299,24282,49424];

    let boxes = 10000;
    let junkValue = 42729000;
    let data = [3400,3280,3440,3230,3555,3260,3480,3605,22523];
    let dataTotal = data.reduce((a, b) => a+b, 0) - data[data.length - 1];

    let table = getElem("table");

    // populate sell value and product
    for (let i = 0; i < IDs.length; i++) {
      // $.getJSON("https://api.guildwars2.com/v2/commerce/prices/" + IDs[i], function (item) {
      //   let sellOrder = item.sells.unit_price;
      //   let product = data[i] * sellOrder;

      //   table.rows[3].cells[i + 1].innerHTML = product;
      //   getElem("cost" + i).innerHTML = sellOrder;

      //   updateTotal(product, dataTotal);
      //   // getElem("boxAvg").innerHTML = getElem("boxAvg") * dataTotal + product;
      // });
    }

    // count row
    for (let i = 0; i < table.rows[0].cells.length - 1; i++) {
      table.rows[2].cells[i + 1].innerHTML = data[i];
    }

    getElem("boxes").innerHTML += boxes;
    getElem("junkValue").innerHTML = junkValue;
    getElem("junkAvg").innerHTML = Math.floor(junkValue / boxes);
    // getElem("boxAvg").innerHTML = junkValue;
  }

  const updateTotal = (product, dataTotal) => {
    let x = product + parseFloat(getElem("total").innerHTML);
    getElem("total").innerHTML = x;
    // getElem("boxAvg").innerHTML /= getElem("boxAvg") * dataTotal + x;
  }

  const getElem = (e) => {
    return document.getElementById(e);
  }

  // getElem("boxAvg").innerHTML = getElem("junkValue").innerHTML + parseInt(getElem("total"));
  // console.log(getElem("total"));

  return (
    <div>
      <body>
        <h1>Fractal Encryptions</h1>

        <table id="table">
          <tr>
            <th id="boxes">Boxes: </th>
            {/* <!--<th>Potent Blood</th><th>Large Bone</th><th>Large Claw</th><th>Incandescent Dust</th>-->
            <!--<th>Large Fang</th><th>Large Scale</th><th>Intricate Totem</th><th>Potent Venom</th>--> */}
            <th>Blood</th><th>Bone</th><th>Claw</th><th>Dust</th>
            <th>Fang</th><th>Scale</th><th>Totem</th><th>Venom</th>
            <th>+1 Agony</th>
          </tr>
          <tr>
            <th align="left">Sell price (c)</th>
            <td id="cost0"></td><td id="cost1"></td><td id="cost2"></td><td id="cost3"></td>
            <td id="cost4"></td><td id="cost5"></td><td id="cost6"></td><td id="cost7"></td>
            <td id="cost8"></td>
          </tr>
          <tr>
            <th align="left">Count</th>
            <td></td><td></td><td></td><td></td>
            <td></td><td></td><td></td><td></td>
            <td></td>
          </tr>
          <tr>
            <th align="left">Product (c)</th>
            <td></td><td></td><td></td><td></td>
            <td></td><td></td><td></td><td></td>
            <td></td>
          </tr>
          <tr>
            <th align="left">T5 sum (c)</th>
            <td id="total">0</td>
          </tr>

          <tr><th align="left">Junk value (c)</th><td id="junkValue"></td></tr>

          <tr><th align="left">Junk avg (c/box)</th><td id="junkAvg"></td></tr>
          {/* <!--<tr><th align="left">Box avg (c)</th><td id="boxAvg">0</td></tr>--> */}
        </table>
      </body>
    </div>
  );
}

