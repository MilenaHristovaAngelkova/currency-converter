const DisplayedData = (selectedOption, currencyRates) => {
    console.log(JSON.stringify(currencyRates));
    let outputConversions = {};
    for (let [key, value] of Object.entries(currencyRates)) {
        if (key !== selectedOption) {
            outputConversions[`${selectedOption.toUpperCase()}-${key.toUpperCase()}`] = Number(value);
            outputConversions[`${key.toUpperCase()}-${selectedOption.toUpperCase()}`] = 1 / Number(value);
        }
    }

    return (
        <article className="conversions">
            <table>
                <thead>
                    <tr>
                        <th>Exchange Rates under 1</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(outputConversions).sort((a, b) => {
                            return b[1] - a[1];
                        }).map(entry => {
                            return(
                               <tr id={entry[0]}>
                                    <td>{entry[0]}</td>
                                    <td>{entry[1]}</td>
                               </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Exchange Rates between 1 and 1.5</th>
                    </tr>
                </thead>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Exchange Rates more than 1.5</th>
                    </tr>
                </thead>
            </table>
        </article>
    );
}
 
export default DisplayedData;