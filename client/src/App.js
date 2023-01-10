import { useState, useEffect } from 'react';
const URL_BASE = 'http://localhost:5000'

function App() {
  const [items, setItems] = useState([]);
  const [popUpActive, setPopUpActive] = useState(false);
  const [newItem, setNewItem] = useState("");
  
  const GetItems = () => {
    try {
      fetch(URL_BASE+"/todos")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log("Error", err));

    } catch (error) {
      console.log(`Something Went Wrong please check.\n ${error.message}`);
    }
  }

  const completeItem = async id => {
    const data = await fetch(URL_BASE + "/todos/update/" + id, {method: "put"}).then(res => res.json());

    setItems(items => items.map(item => {
      if (item._id === data._id) {
        console.log(data.completed);
        item.completed = data.completed;
      }

      return item;
    }))
  }

  const deleteItem = async id => {
    const data = await fetch(URL_BASE + "/todos/delete/" + id, {method: "delete"}).then(res => res.json());

    setItems(items => {
      items.filter(item => item._id !== data._id);
    });

  }

  const addItem = async() => {
    const data = await fetch(URL_BASE + "/todos/new", {
      method: "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        text: newItem
      })
    }). then(res => res.json());

    setItems([...items, data]);
    setPopUpActive(false);
    setNewItem("");
  }


  useEffect(() => {
    GetItems();
    console.log(items)
  }, [])

  return (
      <div className="App">
        <h1>Welcome Alan</h1>
        <h4>Task Items: </h4>
        <div className="items">
          {items.map(item => (
            <div className={"item " + (item.completed ? "is-completed" : "")} key={item._id}>
              <div className="checkbox"  onClick= {() => completeItem(item._id)}></div>
              <div className="text">{item.text}</div>
              <div className="delete-item" onClick={() => deleteItem(item._id)}>X</div>
            </div>
          ))}
        </div>
        <div className="popUp" onClick={() => setPopUpActive(true)}>+</div>
        
        {popUpActive ? (
          <div className='popItem'>
            <div className='closePopItem' onClick={()=> setPopUpActive(false)}></div>
            <div className="itemContent">
              <h3>Add Task</h3>
              <input 
                type="text"
                className='add-item-input'
                onChange={e => setNewItem(e.target.value)}
                value={newItem} />
              <div className='btn' onClick={addItem}>Create Task</div>
            </div>
          </div>
        ) : ''}
        

      </div>
  );
}

export default App;
