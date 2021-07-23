import AppContext from "../AppContext";
import { useContext } from "react";

const Entry = () => {
    const { results } = useContext(AppContext);

    return (
        <div className="resultsDisplay">
        {results != null ? (
          results.map(({id, thumbnailImageUrl, name, msrp, price}) => (
            <div className="itemRow" key={id}>
              <div className="itemImage">
                <img src={thumbnailImageUrl} alt="product" />
              </div>
              <div className="itemName">
                <p>{name}</p>
              </div>
              {msrp !== null && msrp > price ? (
                <div className="itemPrice">
                  <p id="itemPriceP">${price}</p>
                  <p
                    style={{
                      textDecorationLine: "line-through",
                      display: "inline",
                    }}
                  >
                    ${msrp}
                  </p>
                </div>
              ) : (
                <div className="itemPrice">
                  <p>${price}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>Search for something </div>
        )}
      </div>
    )
}

export default Entry