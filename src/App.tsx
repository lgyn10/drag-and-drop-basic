import { useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import './App.css';

const finalSpaceCharacters = [
  { id: 'gary', name: 'Gary Goodspeed' },
  { id: 'cato', name: 'Little Cato' },
  { id: 'kvn', name: 'KVN' },
  { id: 'avocato', name: 'Avocato' },
  { id: 'quinn', name: 'Quinn Ergon' },
  { id: 'hue', name: 'H.U.E.' },
  { id: 'mooncake', name: 'Mooncake' },
];

function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters);
  // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함
  const handleEnd = (result: DropResult) => {
    // console.log(result);
    // 목적지 없을 때, 함수 종료
    if (!result.destination) return;
    // console.log('출발지 idx', result.source.index);
    // console.log('목적지 idx', result.destination.index);
    const startIdx = result.source.index;
    const endIdx = result.destination.index;
    const tempArr = [...characters]; // array.from()도 얕은 복사
    const movingElement = tempArr.splice(startIdx, 1)[0];
    const editedTempArr = [...tempArr.slice(0, endIdx), movingElement, ...tempArr.slice(endIdx)];
    setCharacters(editedTempArr);
  };

  return (
    <div className='App'>
      <h1>Fimal Space Characters</h1>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId='characters'>
          {(provided) => {
            return (
              <ul className='characters' {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map((item, idx) => (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(provided) => {
                      return (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>{item.name}</p>
                        </li>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
