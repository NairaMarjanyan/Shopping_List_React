import { useState } from 'react';
import { BsPlusLg, BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import './App.css';

function App() {
  const [items, setItems] = useState([
    { itemName: "banana", count: 2, isSelected: false },
    { itemName: "apple", count: 7, isSelected: false },
    { itemName: "orange", count: 3, isSelected: true },
    { itemName: "kiwi", count: 2, isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState("");

  const [totalItemCount, setTotalItemCount] = useState(0);

  const handleAddButtonClick = () => {
    setItems([
      ...items,
      {
        itemName: inputValue,
        count: 1,
        isSelected: false
      }
    ]);
    setInputValue("");
  }

  const handleCountIncrease = (index) => {
    const newItems = [...items];

    newItems[index].count++;

    setItems(newItems);
    calculateTotal();
  }

  const handleCountDecrease = (index) => {
    const newItems = [...items];

    newItems[index].count--;

    setItems(newItems);
    calculateTotal();
  }

  const togglecomplete = (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);
  }

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.count;
    }, 0);

    setTotalItemCount(totalItemCount);
  }

  return (
    <div className="App-background">
      <div className="main-container">
        <div className="add-item-box">
          <input value={inputValue} onChange={(evt) => (
            setInputValue(evt.target.value))
          } className="add-item-input" placeholder="Add an item..." />
          <BsPlusLg onClick={() => (handleAddButtonClick())} />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name" onClick={() => togglecomplete(index)}>
                {item.isSelected ?
                  (
                    <>
                      <BsFillCheckCircleFill />
                      <span className="completed">{item.itemName} </span>
                    </>
                  ) : (
                    <>
                      <BsCircleFill />
                      <span>{item.itemName}</span>
                    </>
                  )}
              </div>
              <div className="count">
                <button>
                  <GoChevronLeft onClick={() => handleCountDecrease(index)} />
                </button>
                <span>{item.count}</span>
                <button>
                  <GoChevronRight onClick={() => handleCountIncrease(index)} />
                </button>
              </div>
            </div>
          ))}

        </div>
        <div className="total">Total: {totalItemCount}</div>
      </div>
    </div>
  );
}

export default App;
